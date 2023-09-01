import DisplayLink from "../components/DisplayLink";
import Window from "../components/Window";

export default function Playground() {
  return (
    <Window>
      <DisplayLink href="/playground/wikipedia" fontSize="4xl">
        Wikipedia
      </DisplayLink>
    </Window>
  );
}
