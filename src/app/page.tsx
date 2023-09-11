"use client";
import DisplayLabel from "./components/DisplayLabel";
import DisplayLink from "./components/DisplayLink";
import { usePopUp } from "./hooks/usePopUp";
import EmailForm from "./components/EmailForm";

export default function Home() {
  const { showPopUp } = usePopUp();

  return (
    <div className="flex md:flex-row flex-col justify-between md:space-y-0 space-y-16 md:space-x-4 space-x-0">
      <div className="flex flex-col space-y-8 justify-items-center">
        <DisplayLabel fontSize="4xl">Hi, I'm Natalie Pekker</DisplayLabel>
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
        <DisplayLink fontSize="4xl" href="/playground">
          My playground
        </DisplayLink>
        <DisplayLink fontSize="4xl" href="https://github.com/npek/im-nat">
          Github project
        </DisplayLink>
      </div>
      <div className="flex flex-col space-y-8 sm:items-end items-start">
        <button
          className="font-silkscreen text-3xl p-4 border-2 border-default"
          onClick={() => showPopUp(<EmailForm />, "email")}
        >
          <label className="glitch" data-text="Reach out">
            Reach out
          </label>
        </button>
      </div>
    </div>
  );
}
