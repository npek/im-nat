"use client";
import { useEffect, useState } from "react";
import Window from "../../../components/Window";
import wtf from "wtf_wikipedia";
import { useParams } from "next/navigation";
import DisplayLabel from "@/app/components/DisplayLabel";

interface DocSection {
  title: string | undefined;
  paragraphs: DocParagraph[];
}

interface DocParagraph {
  sentences: DocSentence[];
}

interface DocSentence {
  text: string;
  links: DocLink[];
}

interface DocLink {
  text: string;
  page: string;
  type: string;
}

export default function WikipediaArticle() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const params = useParams();
  const articleId = params.code;
  const [title, setTitle] = useState<string>();
  const [sections, setSections] = useState<DocSection[]>();

  function processSentence(sentence: DocSentence): JSX.Element {
    let processedText: JSX.Element[] = [];
    let currentText = sentence.text;

    sentence.links.forEach((link) => {
      const linkIndex = currentText.indexOf(link.text);
      if (linkIndex !== -1) {
        // Add text before the link
        processedText.push(
          <span key={processedText.length}>
            {currentText.substring(0, linkIndex)}
          </span>
        );

        // Add the link
        const href =
          link.type === "internal"
            ? `/playground/wikipedia/${link.page}`
            : link.page;
        processedText.push(
          <a
            className="underline italic"
            key={processedText.length}
            href={href}
            target={link.type === "internal" ? "_self" : "_blank"}
            rel="noopener noreferrer"
          >
            {link.text}
          </a>
        );

        currentText = currentText.substring(linkIndex + link.text.length);
      }
    });

    // Add any remaining text
    processedText.push(<span key={processedText.length}>{currentText}</span>);

    return <>{processedText}</>;
  }

  const fetchWiki = async () => {
    if (!articleId) {
      console.log("No document found");
      setError("No article ID found.");
      setLoading(false);
      return;
    }
    let result = await wtf.fetch(articleId);

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
          let tempSentences = p.sentences().map((s) => {
            return {
              text: s.text(),
              links: s.links().map((l) => {
                return {
                  text: l.text(),
                  page: l.page().replace(/ /g, "_"),
                  type: l.type(),
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
      console.log("No document found");
      setError("Your search returned no results.");
      setLoading(false);
      return;
    }
  };

  useEffect(() => {
    fetchWiki();
  }, []);

  return (
    <Window>
      <div className="flex flex-col space-y-12">
        <DisplayLabel fontSize="4xl">{title}</DisplayLabel>
        {loading && <DisplayLabel fontSize="4xl">Loading...</DisplayLabel>}
        {error && <DisplayLabel fontSize="4xl">{error}</DisplayLabel>}
        {sections &&
          sections.map((sec, idx) => (
            <div key={idx} className="section flex flex-col space-y-4">
              <DisplayLabel fontSize="2xl">{sec.title}</DisplayLabel>
              <div className="flex flex-col space-y-2">
                {sec.paragraphs.map((para, pIdx) => (
                  <div key={pIdx} className="flex flex-row">
                    <div>
                      {para.sentences.map((s, sIdx) => (
                        <span key={sIdx}>{processSentence(s)} </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
      </div>
    </Window>
  );
}
