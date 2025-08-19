import { ChangeEvent, useId } from "react";

interface InputFieldProps {
  label?: string;
  placeholder: string;
  value: string;
  type?: string;
  large?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const baseInputClasses =
  "w-full px-4 text-base bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all duration-200 hover:border-gray-400 dark:hover:border-gray-500";

export default function InputField({
  label,
  placeholder,
  value,
  type = "text",
  large = false,
  onChange,
}: InputFieldProps) {
  const id = useId();

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className={
            "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          }>
          {label}
        </label>
      )}
      {large ? (
        <textarea
          id={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`${baseInputClasses} py-3 min-h-[100px] resize-vertical`}
          rows={4}
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`${baseInputClasses} py-3`}
        />
      )}
    </div>
  );
}
