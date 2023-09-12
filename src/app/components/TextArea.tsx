import { useState } from "react";

type TextAreaProps = {
  title?: string;
  placeholderText?: string;
  name: string;
  onValueChange?: (isEmpty: boolean) => void;
};

const TextArea = ({
  title,
  placeholderText,
  name,
  onValueChange,
}: TextAreaProps) => {
  const [value, setValue] = useState(""); // local state for input value

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
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
      <textarea
        name={name}
        className="border-default rounded-none border-2 w-full h-32 p-2 pl-6 text-md bg-transparent placeholder:text-default/50"
        placeholder={placeholderText}
        onChange={handleChange}
        value={value}
      />
    </div>
  );
};

export default TextArea;
