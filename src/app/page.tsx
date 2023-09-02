import DisplayLabel from "./components/DisplayLabel";
import DisplayLink from "./components/DisplayLink";
import Window from "./components/Window";

export default function Home() {
  return (
    <Window hideNavigation={true}>
      <div className="flex sm:flex-row flex-col justify-between sm:space-y-0 space-y-16">
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
        </div>
        <DisplayLink
          fontSize="2xl"
          smallFontSize="xl"
          href="mailto:natalie.pekker@gmail.com?subject=Hello&body=Message%20bod"
        >
          Natalie.pekker@gmail.com
        </DisplayLink>
      </div>
    </Window>
  );
}
