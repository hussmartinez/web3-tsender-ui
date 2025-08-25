"use client";

import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { anvil, mainnet, sepolia, zksync, zksyncSepoliaTestnet } from "wagmi/chains";

const isDevelopment = process.env.NODE_ENV === "development";
const isProduction = process.env.NODE_ENV === "production";

export default getDefaultConfig({
  appName: "TSender",
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!, // WalletConnect
  chains: isProduction ? [mainnet, zksync] : [mainnet, zksync, anvil, sepolia, zksyncSepoliaTestnet],
  ssr: false,
});
