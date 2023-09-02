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
      className={`text-sm py-2 px-5 rounded-tr-md -ml-2 border-r-2 border-t-2 border-nat-pink ${
        isSelected && "text-dark bg-nat-pink rounded-tl-md"
      }`}
    >
      {type}
    </button>
  );
};

export default Tab;
