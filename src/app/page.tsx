"use client";
import DisplayLabel from "./components/DisplayLabel";
import DisplayLink from "./components/DisplayLink";
// import { usePopUp } from "./hooks/usePopUp";

export default function Home() {
  // const { showPopUp } = usePopUp();

  return (
    <div className="flex md:flex-row flex-col justify-between md:space-y-0 space-y-16 md:space-x-4 space-x-0">
      <div className="flex flex-col space-y-8 justify-items-center">
        <DisplayLabel fontSize="4xl">Hi, I'm Natalie Pekker</DisplayLabel>
        <DisplayLabel fontSize="4xl">
          I’m a senior frontend / mobile engineer
        </DisplayLabel>
        <DisplayLabel fontSize="4xl">I’m open to work</DisplayLabel>
        <DisplayLink fontSize="4xl" href="/resume">
          My resume
        </DisplayLink>
        <DisplayLink fontSize="4xl" href="/playground">
          My playground
        </DisplayLink>
        <DisplayLink fontSize="4xl" href="https://github.com/npek/im-nat">
          Github project
        </DisplayLink>
        {/* <button onClick={() => showPopUp(<label>hi</label>, "email")}>
          Click me
        </button> */}
      </div>
      <DisplayLink
        fontSize="2xl"
        smallFontSize="xl"
        href="mailto:natalie.pekker@gmail.com?subject=Hello&body=Message%20bod"
      >
        Natalie.pekker@gmail.com
      </DisplayLink>
    </div>
  );
}
