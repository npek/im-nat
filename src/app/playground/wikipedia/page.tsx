"use client";

import DisplayLink from "@/app/components/DisplayLink";
import Window from "../../components/Window";
import DisplayLabel from "@/app/components/DisplayLabel";
import SearchBar from "@/app/components/SearchBar";
import { useRouter } from "next/navigation";

export default function Wikipedia() {
  const router = useRouter();
  const handleSearch = async (searchTerm: string) => {
    let consolidatedTerm = searchTerm.replace(/ /g, "_");
    router.push(`/playground/wikipedia/${consolidatedTerm}`);
  };

  return (
    <Window>
      <div className="flex flex-col space-y-16">
        <div className="flex flex-col space-y-6">
          <DisplayLabel fontSize="4xl" smallFontSize="2xl">
            My favorite Wikipedia articles
          </DisplayLabel>
          <DisplayLabel fontSize="2xl" smallFontSize="xl">
            {"(watch me play around with Wikipedia APIs)"}
          </DisplayLabel>
        </div>
        <div className="flex flex-col sm:space-y-12 space-y-8">
          <DisplayLink
            href="/playground/wikipedia/Dancing_mania"
            fontSize="3xl"
            smallFontSize="2xl"
          >
            Dancing Mania
          </DisplayLink>
          <DisplayLink
            href="/playground/wikipedia/DB_Cooper"
            fontSize="3xl"
            smallFontSize="2xl"
          >
            DB Cooper
          </DisplayLink>
          <DisplayLink
            href="/playground/wikipedia/Dark_Matter"
            fontSize="3xl"
            smallFontSize="2xl"
          >
            Dark Matter
          </DisplayLink>
        </div>
        <div className="flex flex-col space-y-8">
          <DisplayLabel fontSize="4xl" smallFontSize="3xl">
            Want to search something?
          </DisplayLabel>
          <SearchBar
            placeholderText={"Enter query"}
            onSubmit={handleSearch}
            disabled={false}
          />
        </div>
      </div>
    </Window>
  );
}
