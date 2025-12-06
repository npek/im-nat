"use client";
import { useParams } from "next/navigation";
import DisplayLabel from "@/app/components/DisplayLabel";
import DisplayLink from "@/app/components/DisplayLink";
import useWiki from "../../../hooks/useWiki";
import { processSentence } from "../helpers";
import { useWindowContext } from "@/app/hooks/useWindowContext";
import { useEffect } from "react";
import { track } from "@vercel/analytics";

export default function WikipediaArticle() {
  const { setPageTitle } = useWindowContext();
  const params = useParams();
  const articleId = params.code ?? "";

  const { title, sections, suggestedPages, error, loading } =
    useWiki(articleId);

  useEffect(() => {
    if (title) {
      setPageTitle(title);
      track("Wikipedia page viewed", { title: title });
    }
  }, [title, setPageTitle]);

  return (
    <div className="flex flex-col space-y-12">
      <DisplayLabel textType="h1">{title ?? ""}</DisplayLabel>
      {loading && !error && (
        <DisplayLabel fontSize="4xl">Loading...</DisplayLabel>
      )}
      {error && <DisplayLabel fontSize="4xl">{error}</DisplayLabel>}
      {sections &&
        sections.map((sec, idx) => (
          <div key={idx} className="section flex flex-col space-y-4">
            <DisplayLabel textType="h2">{sec.title ?? ""}</DisplayLabel>

            {/* Regular content */}
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

            {/* Special sections - References, Bibliography, External Links */}
            {sec.citations && sec.citations.length > 0 && (
              <div className="flex flex-col space-y-3">
                {sec.citations.map((citation, rIdx) => (
                  <div key={rIdx} className="text-base opacity-90">
                    <span className="mr-2">{rIdx + 1}.</span>
                    {citation.authors && (
                      <span className="italic">{citation.authors}. </span>
                    )}
                    {citation.date && <span>({citation.date}). </span>}
                    {citation.title && (
                      <>
                        {citation.url ? (
                          <a
                            href={citation.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline italic glitch"
                            data-text={citation.title}
                          >
                            {citation.title}
                          </a>
                        ) : (
                          <span className="italic">{citation.title}</span>
                        )}
                        <span>. </span>
                      </>
                    )}
                    {citation.publisher && <span>{citation.publisher}. </span>}
                    {citation.isbn && <span>ISBN {citation.isbn}.</span>}
                  </div>
                ))}
              </div>
            )}

            {sec.paragraphs.length == 0 && sec.hasTables && (
              <label className="text-default/70">
                Tables are not yet supported on Nat's Wikipedia.
              </label>
            )}
          </div>
        ))}
      {suggestedPages && (
        <div className="flex flex-col space-y-8">
          <DisplayLabel textType="h3">Related pages</DisplayLabel>
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
