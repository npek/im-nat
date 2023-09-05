import { useState } from "react";

type SearchBarProps = {
  placeholderText: string;
  onSubmit: (searchTerm: string) => Promise<void>;
  disabled: boolean;
};

const SearchBar = ({ placeholderText, onSubmit, disabled }: SearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="flex flex-row w-full space-x-8">
      <div className="w-full border-default border-2">
        <input
          className="w-full p-4 sm:pl-10 pl-6 text-md bg-transparent placeholder:text-default/50"
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={placeholderText}
          disabled={disabled}
        />
      </div>
      <button
        onClick={() => onSubmit(searchTerm)}
        className="border-default border-2 sm:px-8 px-6"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
