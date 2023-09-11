import DisplayLabel from "../components/DisplayLabel";
import DisplayLink from "../components/DisplayLink";

export default function Playground() {
  return (
    <div className="flex flex-col space-y-8">
      <DisplayLink href="/playground/wikipedia" fontSize="4xl">
        Wikipedia
      </DisplayLink>
      <DisplayLabel className="text-default/50" fontSize="4xl">
        {"Nat GPT (coming soon)"}
      </DisplayLabel>
    </div>
  );
}
