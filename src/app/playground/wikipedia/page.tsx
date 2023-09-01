import DisplayLink from "@/app/components/DisplayLink";
import Window from "../../components/Window";
import DisplayLabel from "@/app/components/DisplayLabel";

export default function Wikipedia() {
  return (
    <Window>
      <div className="flex flex-col space-y-12">
        <DisplayLabel className="-mb-6" fontSize="4xl">
          My favorite Wikipedia articles
        </DisplayLabel>
        <DisplayLabel fontSize="2xl">
          {"(watch me play around with Wikipedia APIs)"}
        </DisplayLabel>
        <DisplayLink href="/playground/wikipedia/DB_Cooper" fontSize="4xl">
          DB Cooper
        </DisplayLink>
        <DisplayLink href="/playground/wikipedia/Dark_Matter" fontSize="4xl">
          Dark Matter
        </DisplayLink>
      </div>
    </Window>
  );
}
