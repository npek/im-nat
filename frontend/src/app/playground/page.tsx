"use client";

import { useEffect, useState } from "react";
import Header from "../components/Header";
import wtf from "wtf_wikipedia";
import Link from "next/link";

export default function Playground() {
  const [title, setTitle] = useState<string>();

  const fetchWiki = async () => {
    let result = await wtf.fetch("Richard Sorge");

    let doc;
    if (Array.isArray(result)) {
      doc = result[0]; // or another item if you want
    } else if (result !== null) {
      doc = result;
    }

    if (doc) {
      setTitle(doc.title() ?? "");
      console.log(doc);
      console.log(doc.sections()[0].text({}));
    } else {
      console.log("No document found");
    }
  };

  useEffect(() => {
    fetchWiki();
  }, []);

  return (
    <Header>
      <div className="flex flex-col overflow-y-scroll p-24 pt-32 space-y-12 w-full min-h-screen justify-items-center border-nat-pink border-2">
        <Link
          href="/playground/wikipedia"
          className="font-silkscreen decoration-3 underline text-4xl text-nat-pink"
        >
          My favorite Wikipedia articles
        </Link>
      </div>
    </Header>
  );
}
