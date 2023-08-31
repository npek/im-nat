"use client";

import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-dark">
      <div className="flex flex-row items-center px-4 space-x-2 absolute w-screen h-12 border-nat-pink border-2">
        <div className="rounded-full border-nat-pink border-2 w-5 h-5" />
        <div className="rounded-full border-nat-pink border-2 w-5 h-5" />
        <div className="rounded-full border-nat-pink border-2 w-5 h-5" />
      </div>
      <div className="flex flex-col sm:p-24 p-12 pt-32 space-y-12 w-full min-h-screen justify-items-center border-nat-pink border-2">
        <label className="font-silkscreen text-4xl text-nat-pink">
          Hi, I'm Natalie Pekker
        </label>
        <label className="font-silkscreen text-4xl text-nat-pink">
          I’m a senior frontend / mobile engineer
        </label>
        <Link
          href="/resume"
          className="font-silkscreen decoration-3 underline text-4xl text-nat-pink"
        >
          My resume
        </Link>
        <Link
          href="/playground"
          className="font-silkscreen decoration-3 underline text-4xl text-nat-pink"
        >
          My playground
        </Link>
      </div>
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex"></div>
    </main>
  );
}
