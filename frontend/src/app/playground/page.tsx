import BulletPoint from "../components/BulletPoint";
import Header from "../components/Header";

export default function Playground() {
  return (
    <Header>
      <div className="flex flex-col overflow-y-scroll p-24 pt-32 space-y-12 w-full min-h-screen justify-items-center border-nat-pink border-2">
        <label className="font-silkscreen text-4xl text-nat-pink">
          My favorite Wikipedia articles
        </label>
      </div>
    </Header>
  );
}
