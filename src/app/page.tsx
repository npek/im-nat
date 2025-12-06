"use client";
import dynamic from "next/dynamic";
import DisplayLabel from "./components/DisplayLabel";
import DisplayLink from "./components/DisplayLink";
import { usePopUp } from "./hooks/usePopUp";
import Image from "next/image";

const EmailForm = dynamic(() => import("./components/EmailForm"), {
  ssr: false,
});

export default function Home() {
  const { showPopUp } = usePopUp();

  return (
    <div className="flex flex-col space-y-16">
      <div className="flex md:flex-row flex-col justify-between md:space-y-0 space-y-16 md:space-x-4 space-x-0">
        <div className="flex flex-col justify-between space-y-16">
          <div className="flex flex-col space-y-8 justify-items-center">
            <DisplayLabel fontSize="4xl" textType="h1">
              Hi, I'm Natalie Pekker
            </DisplayLabel>
            <DisplayLabel fontSize="4xl">
              I’m a senior frontend / mobile engineer
            </DisplayLabel>
            <DisplayLabel fontSize="4xl">
              I was an early Coinbase employee
            </DisplayLabel>
            <DisplayLabel fontSize="4xl">I’m open to work</DisplayLabel>
            <DisplayLink fontSize="4xl" href="/resume">
              My resume
            </DisplayLink>
            <DisplayLink fontSize="4xl" href="https://github.com/npek/im-nat">
              Github project
            </DisplayLink>
          </div>
        </div>
        <div className="flex flex-col space-y-8 sm:items-end items-start">
          <button onClick={() => showPopUp(<EmailForm />, "email")}>
            <Image
              src="/icons/envelope.svg"
              width={80}
              height={80}
              alt={"envelope"}
            />
          </button>
        </div>
      </div>
      <div className="flex flex-col space-y-4">
        <label>
          I'm happy to recommend Nat for nearly any engineering role (but
          particularly ones with a UX angle). Since I've known Nat, I've seen
          her pick up everything from iOS apps, to react native, to full React /
          next.js web projects. What really makes her special in these
          environments is that she's not just a great engineer - she also has a
          natural design sense that makes everything she builds feel polished
          and super user-friendly.
        </label>
        <label>
          Beyond the technical work, she's been an absolute joy to work with.
          She brings an amazing energy to the team, is super positive and is
          genuinely hilarious. Any team would be lucky to have her.
        </label>
        <label className="font-bold">
          - Jacob Thornton, CEO of Pierre and co-creator of Bootstrap
        </label>
      </div>
    </div>
  );
}
