import { useState } from "react";

type TextInputProps = {
  title?: string;
  placeholderText?: string;
  name: string;
  onValueChange?: (isEmpty: boolean) => void;
};

const TextInput = ({
  title,
  placeholderText,
  name,
  onValueChange,
}: TextInputProps) => {
  const [value, setValue] = useState(""); // local state for input value

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);

    // Notify parent whether the input is empty or not
    if (onValueChange) {
      onValueChange(newValue.trim() === "");
    }
  };

  return (
    <div className="flex flex-col space-y-2">
      {title && <label>{title}</label>}
      <input
        type="text"
        name={name}
        value={value}
        onChange={handleChange}
        className="border-default rounded-none border-2 w-full p-2 pl-4 text-md bg-dark placeholder:text-default/50 autofill:text-red-100"
        placeholder={placeholderText}
      />
    </div>
  );
};

export default TextInput;
