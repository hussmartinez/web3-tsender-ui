"use client";

import {
  darkTheme,
  lightTheme,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { ReactNode, useEffect, useState } from "react";
import "@rainbow-me/rainbowkit/styles.css";
import { useTheme } from "next-themes";

export function CustomRainbowKitProvider(props: { children: ReactNode }) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // useEffect only runs on the client, so now we can safely show the UI
  // Fixes hydration problems in rainbowkit theme
  // Moved separatedly to not affect WagmiProvider rerenders
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <RainbowKitProvider theme={theme === "light" ? lightTheme() : darkTheme()}>
      {props.children}
    </RainbowKitProvider>
  );
}
