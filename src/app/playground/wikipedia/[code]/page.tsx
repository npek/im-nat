"use client";
import { useEffect, useState } from "react";
import Window from "../../../components/Window";
import wtf from "wtf_wikipedia";
import { useParams } from "next/navigation";
import DisplayLabel from "@/app/components/DisplayLabel";

interface DocSection {
  title: string | undefined;
  paragraphs: string[];
}

export default function WikipediaArticle() {
  const params = useParams();
  const articleId = params.code;

  const [title, setTitle] = useState<string>();
  const [sections, setSections] = useState<DocSection[]>();

  const fetchWiki = async () => {
    if (!articleId) {
      console.log("No document found");
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
      console.log(doc.citations());
      setTitle(doc.title() ?? "");
      var tempSections: DocSection[] = [];
      doc.sections().forEach((sec) => {
        let paragraphsArray = sec.paragraphs() as any[];
        let tempParagraphs = paragraphsArray.map((p) => {
          return p.text();
        });

        tempSections.push({
          title: sec.title(),
          paragraphs: tempParagraphs,
        });
      });
      setSections(tempSections);
    } else {
      console.log("No document found");
    }
  };

  useEffect(() => {
    fetchWiki();
  }, []);

  return (
    <Window>
      <div className="flex flex-col space-y-12">
        <DisplayLabel fontSize="4xl">{title}</DisplayLabel>
        {sections &&
          sections.map((sec, idx) => (
            <div key={idx} className="section flex flex-col space-y-4">
              <DisplayLabel fontSize="2xl">{sec.title}</DisplayLabel>
              <div className="flex flex-col space-y-2">
                {sec.paragraphs.map((para, pIdx) => (
                  <div key={pIdx} className="flex flex-row">
                    <p className="paragraph">{para}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
      </div>
    </Window>
  );
}
