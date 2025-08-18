"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";
import { WagmiProvider } from "wagmi";
import config from "@/rainbowKitConfig";
import "@rainbow-me/rainbowkit/styles.css";
import { CustomRainbowKitProvider } from "@/providers/CustomRainbowKitProvider";
import { ThemeProvider } from "next-themes";

export function Providers(props: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <CustomRainbowKitProvider>{props.children}</CustomRainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </ThemeProvider>
  );
}
