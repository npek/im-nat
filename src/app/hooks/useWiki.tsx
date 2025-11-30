import { useState, useEffect } from "react";
import wtf from "wtf_wikipedia";
import va from "@vercel/analytics";

export interface DocSection {
  title: string | undefined;
  paragraphs: DocParagraph[];
  hasTables: boolean;
  references?: DocReference[];
  links?: DocLink[];
  citations?: DocReference[];
  sectionType?:
    | "regular"
    | "references"
    | "external_links"
    | "see_also"
    | "notes"
    | "bibliography";
}

export interface DocReference {
  title?: string;
  authors?: string; // Combined author string
  url?: string;
  text?: string;
  publisher?: string;
  date?: string;
  isbn?: string;
}

export interface DocParagraph {
  sentences: DocSentence[];
  lists: DocList[];
}

export interface DocList {
  items: DocSentence[];
}

export interface DocSentence {
  text: string;
  links: DocLink[];
}

export interface DocLink {
  text?: string;
  page?: string;
  type: string;
  site?: string;
}

const getSectionType = (
  title: string | undefined
): DocSection["sectionType"] => {
  if (!title) return "regular";
  const lowerTitle = title.toLowerCase();

  if (lowerTitle.includes("reference")) return "references";
  if (lowerTitle.includes("bibliography")) return "bibliography";
  if (lowerTitle.includes("external link")) return "external_links";
  if (lowerTitle.includes("see also")) return "see_also";
  if (lowerTitle.includes("note")) return "notes";

  return "regular";
};

const useWiki = (articleId: string | string[]) => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState<string>();
  const [sections, setSections] = useState<DocSection[]>();
  const [suggestedPages, setSuggestedPages] = useState<string[]>();

  useEffect(() => {
    const fetchWiki = async () => {
      let result;
      if (Array.isArray(articleId)) {
        result = await wtf.fetch(articleId);
      } else {
        result = await wtf.fetch(decodeURIComponent(articleId));
      }

      let doc;
      if (Array.isArray(result)) {
        doc = result[0];
      } else if (result !== null) {
        doc = result;
        console.log("Fetched article sections:", doc.sections());
        console.log("Fetched article bibliography:", doc.citations());
        // console.log("Fetched article links:", doc.links());
      }

      if (doc) {
        setTitle(doc.title() ?? "");
        var tempSections: DocSection[] = [];

        doc.sections().forEach((sec) => {
          const internalLinks = sec.links();
          console.log("Section links:", internalLinks);
          let tablesArray = [] as any[];
          const sectionType = getSectionType(sec.title());

          if (!Array.isArray(sec.paragraphs())) return;

          // Extract references for special sections
          let references: DocReference[] = [];
          let citations: DocReference[] = [];
          let links: DocLink[] = [];
          if (
            sectionType === "references" ||
            sectionType === "bibliography" ||
            sectionType === "external_links"
          ) {
            console.log("Extracting references for section:", sec.title());
            const refs = sec.references();
            const bibs = sec.citations();
            if (refs && Array.isArray(refs)) {
              references = refs.map((ref: any) => ({
                title: ref.title,
                author: ref.author,
                url: ref.url,
                text: ref.encyclopedia || ref.title || ref.url || "",
                publisher: ref.publisher,
                date: ref.date,
              }));
            }
            if (bibs && Array.isArray(bibs)) {
              console.log("Bibliography entries:", bibs);
              citations = bibs.map((bib: any) => {
                // Extract and format authors
                const authorParts: string[] = [];
                let i = 1;
                while (bib.data[`last${i}`] || bib.data[`first${i}`]) {
                  const last = bib.data[`last${i}`] || '';
                  const first = bib.data[`first${i}`] || '';
                  if (last || first) {
                    authorParts.push(`${last}${last && first ? ', ' : ''}${first}`);
                  }
                  i++;
                }
                const authorsString = authorParts.join('; ');

                return {
                  title: bib.data.title,
                  authors: authorsString || bib.data.author,
                  url: bib.data.url,
                  publisher: bib.data.publisher,
                  date: bib.data.year || bib.data.date,
                  isbn: bib.data.isbn,
                };
              });
            }

            references = references.concat(citations);
          }

          if ((sec.paragraphs() as any[]).length == 0) {
            if (Array.isArray(sec.tables())) {
              tablesArray = sec.tables() as any[];
            }

            tempSections.push({
              title: sec.title(),
              paragraphs: [],
              hasTables: tablesArray.length > 0,
              sectionType,
              references: references.length > 0 ? references : undefined,
            });
            return;
          }

          let tempParagraphs: DocParagraph[] = [];
          let paragraphsArray = sec.paragraphs() as any[];
          paragraphsArray.forEach((p) => {
            let tempSentences = p.sentences().map((s: any) => {
              return {
                text: s.text(),
                links: s.links().map((l: any) => {
                  return {
                    text: l.text(),
                    page: l.page() ? l.page().replace(/ /g, "_") : null,
                    type: l.type(),
                    site: l.site(),
                  };
                }),
              } as DocSentence;
            });

            let tempLists = p.lists().map((li: any) => {
              console.log(li);
              let listSentences = li.data.map((lis: any) => {
                return {
                  text: lis.text(),
                  links: lis.links().map((lisl: any) => {
                    return {
                      text: lisl.text(),
                      page: lisl.page() ? lisl.page().replace(/ /g, "_") : null,
                      type: lisl.type(),
                      site: lisl.site(),
                    };
                  }),
                } as DocSentence;
              });
              return {
                items: listSentences,
              } as DocList;
            });
            tempParagraphs.push({ sentences: tempSentences, lists: tempLists });
          });

          let tempLinks: DocLink[] = [];
          if (sec.title() === "External links") {
            console.log("Extracting external links for section:", sec.title());
            if (Array.isArray(internalLinks)) {
              tempLinks = internalLinks
                .filter((l) => l.type() === "external")
                .map((l: any) => ({
                  text: l.text(),
                  page: l.page(),
                  type: l.type(),
                }));
              links = tempLinks;
            }
          }

          if (Array.isArray(sec.tables())) {
            tablesArray = sec.tables() as any[];
          }

          // we cannot render tables yet so we have to handle for edge cases
          // where there is nothing in a section besides tables
          const noText =
            tempParagraphs.length == 1 &&
            tempParagraphs[0].lists.length == 0 &&
            tempParagraphs[0].sentences.length == 0;

          tempSections.push({
            title: sec.title(),
            paragraphs: noText ? [] : tempParagraphs,
            hasTables: tablesArray.length > 0,
            sectionType,
            references: references.length > 0 ? references : undefined,
            citations: citations.length > 0 ? citations : undefined,
            links: links.length > 0 ? links : undefined,
          });
        });
        setSections(tempSections);

        setLoading(false);
      } else {
        // get article suggestions
        try {
          const response = await fetch(
            `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${articleId}&origin=*&format=json`
          );
          const data = await response.json();
          const tempSuggestions = data.query.search.map((s: any) => {
            return s.title;
          });
          if (tempSuggestions.length > 0) {
            setSuggestedPages(tempSuggestions);
          } else {
            va.track("Error: No related articles found");
            setError("No related articles found.");
          }
          setLoading(false);
        } catch (err) {
          va.track("Error: No related articles found");
          setError("No related articles found.");
          setLoading(false);
        }
        return;
      }
    };

    fetchWiki();
  }, [articleId]);

  return { title, sections, suggestedPages, error, loading };
};

export default useWiki;
