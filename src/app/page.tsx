"use client";

import AirdropForm from "@/components/AirdropForm";
import { useAccount } from "wagmi";

export default function Home() {
  const { isConnected } = useAccount();
  return isConnected ? (
    <div>
      <AirdropForm />
    </div>
  ) : (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center text-gray-600 dark:text-gray-400">
        Please connect your wallet to use the airdrop feature.
      </div>
    </div>
  );
}
