import BulletPoint from "../components/BulletPoint";
import DisplayLabel from "../components/DisplayLabel";
import DisplayLink from "../components/DisplayLink";
import { ExperienceItem } from "../components/ExperienceItem";

export default function Resume() {
  return (
    <div className="flex flex-col space-y-12 w-full justify-items-center">
      <DisplayLabel fontSize="4xl">Natalie Pekker</DisplayLabel>
      <div className="flex sm:flex-row flex-col sm:space-x-20 space-x-0 sm:space-y-0 space-y-12">
        <div className="flex flex-col min-w-fit space-y-12">
          <div className="flex flex-col space-y-8 font-header sm:text-2xl text-xl underline">
            <a href="mailto:natalie.pekker@gmail.com?subject=Hello&body=Message%20body">
              <label
                className="underline glitch"
                data-text="natalie.pekker@gmail.com"
              >
                natalie.pekker@gmail.com
              </label>
            </a>
            <DisplayLink
              href="https://www.linkedin.com/in/natalie-pekker/"
              fontSize="2xl"
              smallFontSize="xl"
            >
              LinkedIn
            </DisplayLink>
          </div>
          <div className="flex flex-col text-xl">
            <DisplayLabel className="pb-6" fontSize="3xl">
              Education
            </DisplayLabel>
            <label className="font-bold">
              University of Southern California
            </label>
            <label>
              2015-2019
              <br />
              Computer Science
            </label>
          </div>
          <div className="flex flex-col">
            <DisplayLabel className="pb-6" fontSize="3xl">
              Languages
            </DisplayLabel>
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
            <DisplayLabel className="pb-6" fontSize="3xl">
              Technologies
            </DisplayLabel>
            <BulletPoint>Tailwind CSS</BulletPoint>
            <BulletPoint>Next.js</BulletPoint>
            <BulletPoint>REST</BulletPoint>
            <BulletPoint>GraphQL</BulletPoint>
            <BulletPoint>CocoaPods</BulletPoint>
            <BulletPoint>Vercel</BulletPoint>
            <BulletPoint>Git</BulletPoint>
            <BulletPoint>SnowflakeDB</BulletPoint>
          </div>
        </div>
        <div className="flex flex-col space-y-6 text-xl">
          <DisplayLabel className="pb-6" fontSize="3xl">
            Work Experience
          </DisplayLabel>
          <ExperienceItem
            jobTitle={"Software Engineer"}
            company={"Pierre"}
            startDate={"November 2023"}
            endDate={"May 2024"}
            bulletPoints={[
              `Worked on a team of 5 that included the two inventors of Bootstrap`,
              `Worked closely with Jacob Thornton to build Pierre's frontend product going into raising Series A`,
              `Built realtime integration with Github Actions to stream all GH and non-GH jobs on a repository in one view`,
              `Built @mentions integration for code reviews and comments`,
              `Built status UI to show which team members are online and what they are currently working on or reviewing`,
              `Built Vercel CLI`,
            ]}
          />
          <ExperienceItem
            jobTitle={"Senior Founding Software Engineer"}
            company={"Coherent"}
            startDate={"October 2022"}
            endDate={"July 2023"}
            bulletPoints={[
              `As a Founding Engineer and sole frontend engineer, built a
            developer portal in React Typescript with Next.js and Tailwind
            CSS, as well as a Postman-like application to query our API."`,
              `Transitioned to backend/data engineering for a quarter, using
            Python and DBT to query and build extensive tables of decoded
            blockchain data for Snowflake.`,
              `Designed a DAO portal with a retro-futuristic design system.`,
              `Rapidly built iterations of frontend demos for different ML models
            to showcase the capabilities of our datasets to investors.`,
            ]}
          />
          <ExperienceItem
            jobTitle={"Frontend Software Engineer"}
            company={"Innerwell"}
            startDate={"May 2022"}
            endDate={"August 2022"}
            bulletPoints={[
              `As the only engineer, planned and built a mobile application from
              scratch with features such as Zoom integration, scheduling,
              Electronic Health Record integration, HIPAA-compliant chat,
              support chat, and music streaming.`,
            ]}
          />
          <ExperienceItem
            jobTitle={"Frontend/Mobile Software Engineer"}
            company={"Coinbase"}
            startDate={"August 2019"}
            endDate={"May 2022"}
            bulletPoints={[
              `Initially worked on core iOS development in Swift on the main Coinbase mobile application.`,
              `Transitioned to the Coinbase Card team and started working with
              React and React Native with a 50/50 time split between the two.`,
              `Built Coinbase Tutorials (later known as Earn tutorials) in their very first iteration.`,
              `Served as a lead for the mental health employee resource group.`,
            ]}
          />
          <ExperienceItem
            jobTitle={"iOS Software Engineering Intern"}
            company={"Coinbase"}
            startDate={"June 2018"}
            endDate={"August 2018"}
            bulletPoints={[
              `3rd iOS engineer on the Coinbase product team.`,
              `Built an identity verification flow for European users.`,
            ]}
          />
          <ExperienceItem
            jobTitle={"iOS Software Engineering Intern"}
            company={"OpenTable"}
            startDate={"June 2017"}
            endDate={"August 2017"}
            bulletPoints={[
              `Worked on iOS/Swift + Objective-C for the Guest Center application.`,
            ]}
          />
        </div>
      </div>
    </div>
  );
}
