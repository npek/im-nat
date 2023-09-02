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
        <DisplayLabel fontSize="4xl">{title}</DisplayLabel>
        {loading && !error && (
          <DisplayLabel fontSize="4xl">Loading...</DisplayLabel>
        )}
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
        {suggestedPages && (
          <div className="flex flex-col space-y-2">
            <DisplayLabel fontSize="4xl">
              Your query had no exact matches.
            </DisplayLabel>
            <DisplayLabel fontSize="2xl">
              Here are some suggested pages.
            </DisplayLabel>
            <div className="flex flex-col space-y-8 pt-4">
              {suggestedPages.map((sp, spIdx) => (
                <DisplayLink
                  key={spIdx}
                  href={sp}
                  fontSize="3xl"
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
