import DisplayLabel from "../components/DisplayLabel";
import DisplayLink from "../components/DisplayLink";
import Window from "../components/Window";

export default function Playground() {
  return (
    <Window currentPage="playground" pageTitle="Playground">
      <div className="flex flex-col space-y-8">
        <DisplayLink href="/playground/wikipedia" fontSize="4xl">
          Wikipedia
        </DisplayLink>
        <DisplayLabel fontSize="4xl">More coming soon</DisplayLabel>
      </div>
    </Window>
  );
}
