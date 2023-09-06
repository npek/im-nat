"use client";
import Window from "../../../components/Window";
import { useParams } from "next/navigation";
import DisplayLabel from "@/app/components/DisplayLabel";
import DisplayLink from "@/app/components/DisplayLink";
import useWiki from "../hooks/useWiki";
import { processSentence } from "../helpers";

export default function WikipediaArticle() {
  const params = useParams();
  const articleId = params.code;

  const { title, sections, suggestedPages, error, loading } =
    useWiki(articleId);

  return (
    <Window>
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
                {sec.paragraphs.length == 0 && sec.hasTables && (
                  <label className="text-default/70">
                    Tables are not yet supported on Nat's Wikipedia.
                  </label>
                )}
              </div>
            </div>
          ))}
        {suggestedPages && (
          <div className="flex flex-col space-y-8">
            <DisplayLabel fontSize="4xl">Related pages</DisplayLabel>
            <div className="flex flex-col space-y-8 pt-4">
              {suggestedPages.map((sp, spIdx) => (
                <DisplayLink
                  key={spIdx}
                  href={sp}
                  fontSize="2xl"
                  shouldGlitch={false}
                >
                  {sp}
                </DisplayLink>
              ))}
            </div>
          </div>
        )}
      </div>
    </Window>
  );
}
