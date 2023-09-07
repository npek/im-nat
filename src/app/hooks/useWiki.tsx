import { useState, useEffect } from "react";
import wtf from "wtf_wikipedia";

export interface DocSection {
  title: string | undefined;
  paragraphs: DocParagraph[];
  hasTables: boolean;
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
  text: string;
  page?: string;
  type: string;
  site?: string;
}

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
      }

      if (doc) {
        setTitle(doc.title() ?? "");
        var tempSections: DocSection[] = [];
        doc.sections().forEach((sec) => {
          let tablesArray = [] as any[];
          if (!Array.isArray(sec.paragraphs())) return;

          if ((sec.paragraphs() as any[]).length == 0) {
            if (Array.isArray(sec.tables())) {
              tablesArray = sec.tables() as any[];
            }

            tempSections.push({
              title: sec.title(),
              paragraphs: [],
              hasTables: tablesArray.length > 0,
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
            setError("No related articles found.");
          }
          setLoading(false);
        } catch (err) {
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
