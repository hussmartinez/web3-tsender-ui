"use client";

import { Spinner } from "./Spinner";
import { Size } from "./types";

type Variant = "primary" | "secondary" | "success" | "warning" | "danger";

export interface ButtonStep {
  key: string;
  text: string;
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void | Promise<void>;
  variant?: Variant;
  size?: Size;
  icon?: React.ReactNode;
  className?: string;
}

interface StepButtonProps {
  steps: ButtonStep[];
  currentStep: string;
  onClick?: () => void | Promise<void>;
  className?: string;
}

const variantStyles: Record<Variant, string> = {
  primary: "bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white",
  secondary: "bg-gray-600 hover:bg-gray-700 active:bg-gray-800 text-white",
  success: "bg-green-600 hover:bg-green-700 active:bg-green-800 text-white",
  warning: "bg-yellow-600 hover:bg-yellow-700 active:bg-yellow-800 text-white",
  danger: "bg-red-600 hover:bg-red-700 active:bg-red-800 text-white",
};

const sizeStyles: Record<Size, string> = {
  sm: "py-2 px-4 text-sm",
  md: "py-3 px-6 text-base",
  lg: "py-4 px-8 text-lg",
};

const disabledStyles =
  "bg-gray-400 cursor-not-allowed opacity-60 hover:bg-gray-400 hover:transform-none hover:shadow-none";

export const StepButton: React.FC<StepButtonProps> = ({
  steps,
  currentStep,
  onClick,
  className = "",
}) => {
  const step = steps.find(step => step.key === currentStep);

  if (!step) {
    console.warn(
      `StepButton: Step "${currentStep}" not found in steps configuration`
    );
    return null;
  }

  const {
    text,
    disabled = false,
    loading = false,
    variant = "primary",
    size = "md",
    icon,
    className: stepClassName = "",
  } = step;

  const handleClick = async () => {
    if (disabled || loading) return;

    const clickHandler = step.onClick || onClick;
    if (clickHandler) {
      await clickHandler();
    }
  };

  const baseClasses = `
    w-full font-semibold rounded-lg transition-all duration-200 flex items-center justify-center gap-2
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
    ${
      disabled || loading
        ? ""
        : "hover:shadow-lg transform hover:-translate-y-0.5"
    }
    ${loading ? "animate-pulse" : ""}
  `;

  const variantClass = disabled ? disabledStyles : variantStyles[variant];
  const sizeClass = sizeStyles[size];

  return (
    <button
      onClick={handleClick}
      disabled={disabled || loading}
      className={`${baseClasses} ${variantClass} ${sizeClass} ${className} ${stepClassName}`}>
      {loading && <Spinner size={size} />}
      {!loading && icon}
      {text}
    </button>
  );
};
