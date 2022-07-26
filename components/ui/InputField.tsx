import { FC, HTMLInputTypeAttribute, LegacyRef } from "react";

interface InputProps {
  placeholder?: string;
  className?: string;
  value?: any;
  onChange?: (e: any) => void;
  type?: HTMLInputTypeAttribute;
}

const InputField: FC<InputProps> = ({
  placeholder = "",
  className,
  value,
  onChange,
  type,
}) => {
  return (
    <input
      placeholder={placeholder}
      className={className}
      value={value}
      onChange={onChange}
      type={type}
    />
  );
};

export default InputField;
