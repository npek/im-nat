import DisplayLabel from "./components/DisplayLabel";
import DisplayLink from "./components/DisplayLink";
import Window from "./components/Window";

export default function Home() {
  return (
    <Window hideNavigation={true}>
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
    </Window>
  );
}
