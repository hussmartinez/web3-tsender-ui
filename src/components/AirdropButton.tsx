"use client";

import React from "react";
import { StepButton, ButtonStep } from "./ui/StepButton";
import { useConnectModal } from "@rainbow-me/rainbowkit";

interface AirdropButtonProps {
  isConnected: boolean;
  isFormValid: boolean;
  isPending: boolean;
  transactionStatus: string;
  onSendTokens: () => Promise<void>;
  className?: string;
}

export const AirdropButton: React.FC<AirdropButtonProps> = ({
  isConnected,
  isFormValid,
  isPending,
  transactionStatus,
  onSendTokens,
  className,
}) => {
  const { openConnectModal } = useConnectModal();
  const steps: ButtonStep[] = [
    {
      key: "connect",
      text: "Connect Wallet",
      variant: "secondary",
      onClick: openConnectModal,
      icon: (
        <svg
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
    },
    {
      key: "invalid",
      text: "Fill all fields",
      disabled: true,
      variant: "secondary",
    },
    {
      key: "ready",
      text: "Send Tokens",
      variant: "success",
      onClick: onSendTokens,
      icon: (
        <svg
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
          />
        </svg>
      ),
    },
    {
      key: "checking",
      text: "Checking approval...",
      loading: true,
      disabled: true,
      variant: "primary",
    },
    {
      key: "requesting",
      text: "Requesting approval...",
      loading: true,
      disabled: true,
      variant: "warning",
    },
    {
      key: "waiting",
      text: "Waiting for approval...",
      loading: true,
      disabled: true,
      variant: "warning",
    },
    {
      key: "sending",
      text: "Sending airdrop...",
      loading: true,
      disabled: true,
      variant: "primary",
    },
    {
      key: "success",
      text: "Transaction sent!",
      disabled: true,
      variant: "success",
      icon: (
        <svg
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 13l4 4L19 7"
          />
        </svg>
      ),
    },
    {
      key: "error",
      text: "Transaction failed",
      disabled: true,
      variant: "danger",
      icon: (
        <svg
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      ),
    },
  ];

  const getCurrentStep = (): string => {
    if (!isConnected) return "connect";
    if (!isFormValid) return "invalid";
    if (transactionStatus) {
      const statusMap: Record<string, string> = {
        "Checking approval...": "checking",
        "Requesting approval...": "requesting",
        "Waiting for approval...": "waiting",
        "Sending airdrop...": "sending",
        "Transaction sent!": "success",
        "Transaction failed": "error",
      };
      return statusMap[transactionStatus] || "ready";
    }
    if (isPending) return "sending";
    return "ready";
  };

  return (
    <StepButton
      steps={steps}
      currentStep={getCurrentStep()}
      className={className}
    />
  );
};
