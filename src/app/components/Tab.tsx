import { useRouter } from "next/navigation";

export type TabType = "home" | "resume" | "playground" | "wikipedia";

type TabProps = {
  type: TabType;
  page: string;
  isSelected?: boolean;
};

const Tab = ({ type, page, isSelected }: TabProps) => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push(page)}
      className={`text-sm py-2 px-4 border-r-2 border-nat-pink ${
        isSelected && "text-dark bg-nat-pink"
      }`}
    >
      {type}
    </button>
  );
};

export default Tab;
