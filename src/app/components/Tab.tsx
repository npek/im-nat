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
      className={`text-sm py-2 px-5 ${
        type == "home"
          ? "rounded-t-md border-x-2"
          : "rounded-tr-md -ml-2 border-r-2"
      }  border-t-2 border-default ${
        isSelected && " text-dark bg-default rounded-tl-md"
      }`}
    >
      {type}
    </button>
  );
};

export default Tab;
