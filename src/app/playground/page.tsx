"use client";

import Header from "../components/Header";
import Link from "next/link";

export default function Playground() {
  return (
    <Header>
      <div className="flex flex-col overflow-y-scroll p-24 pt-32 space-y-12 w-full min-h-screen justify-items-center border-nat-pink border-2">
        <Link
          href="/playground/wikipedia"
          className="font-silkscreen decoration-3 underline text-4xl text-nat-pink"
        >
          Wikipedia
        </Link>
      </div>
    </Header>
  );
}
