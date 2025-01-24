"use client";
import { useEffect, useState } from "react";
import BulletPoint from "../components/BulletPoint";
import DisplayLabel from "../components/DisplayLabel";
import DisplayLink from "../components/DisplayLink";
import Image from "next/image";

export default function Portfolio() {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const updateScreenSize = () => {
    setIsSmallScreen(window.innerWidth < 1127);
  };

  useEffect(() => {
    updateScreenSize();
    window.addEventListener("resize", updateScreenSize);

    return () => {
      window.removeEventListener("resize", updateScreenSize);
    };
  }, []);

  return (
    <div className="flex flex-col space-y-12 w-full justify-items-stretch flex-grow">
      <div className="flex flex-grow justify-center">
        <DisplayLabel fontSize="5xl" smallFontSize="4xl" center>
          Things I've Built
        </DisplayLabel>
      </div>
      <div
        className={`flex ${
          isSmallScreen
            ? "flex-col space-y-12"
            : "flex-row space-x-12 items-center"
        } justify-left`}
      >
        <div className={`flex ${isSmallScreen && "grow justify-center p-8"}`}>
          <Image
            className="min-w-full shrink-0"
            width={600}
            height={479}
            src="/images/tv.svg"
            alt="TV graphic"
            hidden={isSmallScreen}
          />
          <Image
            id="dca-gif"
            className={`${
              !isSmallScreen && "absolute ml-[34px] pt-[122px] pl-0"
            } grow max-w-xl`}
            width={425}
            height={317}
            src="/images/dca.gif"
            alt="Dollar Cost Averaging"
          />
        </div>
        <div className="flex flex-col lg:flex-1 space-y-8">
          <DisplayLink
            href={
              "https://medium.com/the-coinbase-blog/coinbase-makes-investing-easy-with-with-dollar-cost-averaging-1231b556b4bf"
            }
            fontSize={"4xl"}
          >
            Coinbase Tutorials
          </DisplayLink>
          <div className="flex flex-col space-y-4">
            <BulletPoint>
              Built the first-ever Coinbase tutorial on iOS (later became as
              Earn tutorials)
            </BulletPoint>
            <BulletPoint>
              Appeared prominently for everyone using Coinbase on iOS
            </BulletPoint>
            <BulletPoint>
              Built UX-heavy Instagram Story-like feature from scratch
            </BulletPoint>
          </div>
        </div>
      </div>
      {/* <div>
        <Image
          width={600}
          height={479}
          src="/images/tweet.png"
          alt="Tweet screenshot"
        />
      </div> */}
      <div className="flex grow justify-center">
        <DisplayLabel fontSize="lg">WIP - more coming soon</DisplayLabel>
      </div>
    </div>
  );
}
