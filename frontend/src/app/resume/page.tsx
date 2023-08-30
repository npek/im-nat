import BulletPoint from "../components/BulletPoint";
import Header from "../components/Header";

export default function Resume() {
  return (
    // <main className="flex min-h-screen max-h-screen flex-col items-center justify-between bg-dark font-mono">
    <Header>
      <div className="flex flex-col overflow-y-scroll p-24 pt-32 space-y-12 w-full min-h-screen justify-items-center border-nat-pink border-2">
        <label className="font-silkscreen text-4xl text-nat-pink">
          Natalie Pekker
        </label>
        <div className="flex flex-row space-x-20">
          <div className="flex flex-col min-w-fit space-y-12">
            <div className="flex flex-col">
              <label className="font-silkscreen text-3xl text-nat-pink pb-6">
                Education
              </label>
              <label className="font-bold text-xl text-nat-pink">
                University of Southern California
              </label>
              <label className="text-xl text-nat-pink">
                2015-2019
                <br />
                Computer Science
              </label>
            </div>
            <div className="flex flex-col">
              <label className="font-silkscreen text-3xl text-nat-pink pb-6">
                Languages
              </label>
              <BulletPoint>React</BulletPoint>
              <BulletPoint>React Native</BulletPoint>
              <BulletPoint>Typescript/Javascript</BulletPoint>
              <BulletPoint>Swift</BulletPoint>
              <BulletPoint>HTML/CSS</BulletPoint>
              <BulletPoint>Python</BulletPoint>
              <BulletPoint>Objective-C</BulletPoint>
              <BulletPoint>C++</BulletPoint>
              <BulletPoint>Java</BulletPoint>
            </div>
            <div className="flex flex-col">
              <label className="font-silkscreen text-3xl text-nat-pink pb-6">
                Technologies
              </label>
              <BulletPoint>Tailwind CSS</BulletPoint>
              <BulletPoint>Next.js</BulletPoint>
              <BulletPoint>REST</BulletPoint>
              <BulletPoint>GraphQL</BulletPoint>
              <BulletPoint>Git</BulletPoint>
              <BulletPoint>SnowflakeDB</BulletPoint>
            </div>
          </div>
          <div className="flex flex-col space-y-6">
            <label className="font-silkscreen text-3xl text-nat-pink pb-2">
              Work Experience
            </label>
            <div className="flex flex-col">
              <label className="font-bold text-xl text-nat-pink">
                Senior Founding Software Engineer
              </label>
              <label className="text-xl text-nat-pink pb-2">
                Coherent, October 2022 - July 2023
              </label>
              <BulletPoint>
                {
                  "As a Founding Engineer and sole frontend engineer, built a              developer portal in React Typescript with Next.js and Tailwind CSS, as well as a "
                }
                <a className="bg-nat-pink">
                  <span className="text-dark bg-clip-text">
                    Postman-like application
                  </span>
                </a>
                {" to query our API."}
              </BulletPoint>
              <BulletPoint>
                Transitioned to backend/data engineering for a quarter, using
                Python and DBT to query and build extensive tables of decoded
                blockchain data for Snowflake.
              </BulletPoint>
              <BulletPoint>
                Designed a DAO portal with a retro-futuristic design system.
              </BulletPoint>
              <BulletPoint>
                Rapidly built iterations of frontend demos for different ML
                models to showcase the capabilities of our datasets to
                investors.
              </BulletPoint>
            </div>
            <div className="flex flex-col">
              <label className="font-bold text-xl text-nat-pink">
                Frontend Software Engineer
              </label>
              <label className="text-xl text-nat-pink pb-2">
                Innerwell, May 2022 - August 2023
              </label>
              <BulletPoint>
                As the only engineer, planned and built a mobile application
                from scratch with features such as Zoom integration, scheduling,
                Electronic Health Record integration, HIPAA-compliant chat,
                support chat, and music streaming.
              </BulletPoint>
            </div>
            <div className="flex flex-col">
              <label className="font-bold text-xl text-nat-pink">
                Frontend/Mobile Software Engineer
              </label>
              <label className="text-xl text-nat-pink pb-2">
                Coinbase, August 2019 - May 2022
              </label>
              <BulletPoint>
                Initially worked on core iOS development in Swift on the main
                Coinbase mobile application.
              </BulletPoint>
              <BulletPoint>
                Transitioned to the Coinbase Card team and started working with
                React and React Native with a 50/50 time split between the two.
              </BulletPoint>
              <BulletPoint>
                {"Built "}
                <a className="bg-nat-pink">
                  <span className="text-dark bg-clip-text">
                    Coinbase Tutorials
                  </span>
                </a>
                {
                  " (later known as Earn tutorials) in their very first iteration."
                }
              </BulletPoint>
              <BulletPoint>
                Served as a lead for the mental health employee resource group.
              </BulletPoint>
            </div>
          </div>
        </div>
      </div>
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex"></div>
    </Header>
    // </main>
  );
}
