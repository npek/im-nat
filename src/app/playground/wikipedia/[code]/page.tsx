"use client";
import { useParams } from "next/navigation";
import DisplayLabel from "@/app/components/DisplayLabel";
import DisplayLink from "@/app/components/DisplayLink";
import useWiki from "../../../hooks/useWiki";
import { processSentence } from "../helpers";
import { useWindowContext } from "@/app/hooks/useWindowContext";
import { useEffect } from "react";

export default function WikipediaArticle() {
  const { setPageTitle } = useWindowContext();
  const params = useParams();
  const articleId = params.code;

  const { title, sections, suggestedPages, error, loading } =
    useWiki(articleId);

  useEffect(() => {
    if (title) {
      setPageTitle(title);
    }
  }, [title]);

  return (
    <div className="flex flex-col space-y-12">
      <DisplayLabel fontSize="4xl">{title ?? ""}</DisplayLabel>
      {loading && !error && (
        <DisplayLabel fontSize="4xl">Loading...</DisplayLabel>
      )}
      {error && <DisplayLabel fontSize="4xl">{error}</DisplayLabel>}
      {sections &&
        sections.map((sec, idx) => (
          <div key={idx} className="section flex flex-col space-y-4">
            <DisplayLabel fontSize="2xl">{sec.title ?? ""}</DisplayLabel>
            {sec.paragraphs.map((para, pIdx) => (
              <div key={pIdx} className="flex flex-col">
                <div>
                  {para.sentences.map((s, sIdx) => (
                    <span key={sIdx}>{processSentence(s)} </span>
                  ))}
                </div>
                <div className="flex flex-col">
                  {para.lists.map((l, lIdx) => (
                    <div key={lIdx} className="flex flex-col">
                      {l.items.map((li, liIdx) => (
                        <span key={liIdx}>
                          {"* "}
                          {processSentence(li)}
                        </span>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            ))}
            {sec.paragraphs.length == 0 && sec.hasTables && (
              <label className="text-default/70">
                Tables are not yet supported on Nat's Wikipedia.
              </label>
            )}
          </div>
        ))}
      {suggestedPages && (
        <div className="flex flex-col space-y-8">
          <DisplayLabel fontSize="4xl">Related pages</DisplayLabel>
          <div className="flex flex-col space-y-8 pt-4">
            {suggestedPages.map((sp, spIdx) => (
              <DisplayLink key={spIdx} href={sp} fontSize="2xl">
                {sp}
              </DisplayLink>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
