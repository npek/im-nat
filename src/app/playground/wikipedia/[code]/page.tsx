"use client";

import { useEffect, useState } from "react";
import Header from "../../../components/Header";
import wtf from "wtf_wikipedia";
import { useParams } from "next/navigation";

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
      doc = result[0]; // or another item if you want
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
    <Header>
      <div className="flex flex-col overflow-y-scroll sm:p-24 p-12 pt-32 space-y-12 w-full min-h-screen justify-items-center border-nat-pink border-2">
        <label className="font-silkscreen text-4xl text-nat-pink">
          {title}
        </label>
        {sections &&
          sections.map((sec, idx) => (
            <div key={idx} className="section flex flex-col space-y-2">
              <label className="section-title text-2xl font-silkscreen pb-2">
                {sec.title}
              </label>
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
    </Header>
  );
}
