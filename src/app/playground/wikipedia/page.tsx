"use client";

import DisplayLink from "@/app/components/DisplayLink";
import Window from "../../components/Window";
import DisplayLabel from "@/app/components/DisplayLabel";
import SearchBar from "@/app/components/SearchBar";
import { useRouter } from "next/navigation";

export default function Wikipedia() {
  const router = useRouter();
  const handleSearch = async (searchTerm: string) => {
    let consolidatedTerm = /[^a-zA-Z0-9-_ ]/.test(searchTerm)
      ? searchTerm.replace(/ /g, "_")
      : searchTerm;
    router.push(`/playground/wikipedia/${consolidatedTerm}`);
  };

  return (
    <Window currentPage="wikipedia" pageTitle="Nat's Wikipedia">
      <div className="flex flex-col space-y-16">
        <div className="flex flex-col space-y-6">
          <DisplayLabel fontSize="5xl" smallFontSize="4xl">
            Nat's Wikipedia
          </DisplayLabel>
          <DisplayLabel fontSize="2xl">
            {"(watch me play around with Tailwind CSS and Wikipedia APIs)"}
          </DisplayLabel>
        </div>
        <div className="flex flex-col space-y-8">
          <DisplayLabel fontSize="4xl" smallFontSize="3xl">
            Try searching Wikipedia
          </DisplayLabel>
          <SearchBar
            placeholderText={"Enter query"}
            onSubmit={handleSearch}
            disabled={false}
          />
        </div>
        <div className="flex flex-col sm:space-y-12 space-y-8">
          <DisplayLabel fontSize="4xl" smallFontSize="3xl">
            My favorite Wikipedia articles
          </DisplayLabel>
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
          <DisplayLink
            href="/playground/wikipedia/List_of_generic_and_genericized_trademarks"
            fontSize="3xl"
            smallFontSize="2xl"
          >
            List of genericized trademarks
          </DisplayLink>
          <DisplayLink
            href="/playground/wikipedia/Grigori_Rasputin"
            fontSize="3xl"
            smallFontSize="2xl"
          >
            Rasputin
          </DisplayLink>
          <DisplayLink
            href="/playground/wikipedia/Year_2000_problem"
            fontSize="3xl"
            smallFontSize="2xl"
          >
            {"Year 2000 problem (Y2K bug)"}
          </DisplayLink>
        </div>
      </div>
    </Window>
  );
}
