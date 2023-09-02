import { useState, useEffect } from "react";
import wtf from "wtf_wikipedia";

export interface DocSection {
  title: string | undefined;
  paragraphs: DocParagraph[];
}

export interface DocParagraph {
  sentences: DocSentence[];
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
          if (!Array.isArray(sec.paragraphs())) return;

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
            tempParagraphs.push({ sentences: tempSentences });
          });

          tempSections.push({
            title: sec.title(),
            paragraphs: tempParagraphs,
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
          setSuggestedPages(tempSuggestions);
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
