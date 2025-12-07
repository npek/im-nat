"use client";

import dynamic from "next/dynamic";
import { usePopUp } from "../hooks/usePopUp";
import Image from "next/image";

const EmailForm = dynamic(() => import("./EmailForm"), {
  ssr: false,
});

export default function EmailButton() {
  const { showPopUp } = usePopUp();

  return (
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
  );
}
