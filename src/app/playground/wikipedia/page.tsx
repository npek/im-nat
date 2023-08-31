"use client";

import Header from "../../components/Header";
import wtf from "wtf_wikipedia";
import Link from "next/link";

export default function Wikipedia() {
  return (
    <Header>
      <div className="flex flex-col overflow-y-scroll sm:p-24 p-12 pt-32 space-y-12 w-full min-h-screen justify-items-center border-nat-pink border-2">
        <label className="font-silkscreen text-4xl text-nat-pink -mb-6">
          My favorite Wikipedia articles
        </label>
        <label className="font-silkscreen text-2xl text-nat-pink">
          {"(watch me play around with Wikipedia APIs)"}
        </label>
        <Link
          href="/playground/wikipedia/Richard_Sorge"
          className="font-silkscreen decoration-3 underline text-4xl text-nat-pink"
        >
          Richard Sorge
        </Link>
        <Link
          href="/playground/wikipedia/DB_Cooper"
          className="font-silkscreen decoration-3 underline text-4xl text-nat-pink"
        >
          DB Cooper
        </Link>
        <Link
          href="/playground/wikipedia/Dark_Matter"
          className="font-silkscreen decoration-3 underline text-4xl text-nat-pink"
        >
          Dark Matter
        </Link>
      </div>
    </Header>
  );
}
