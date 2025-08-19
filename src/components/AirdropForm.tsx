"use client";

import { useState } from "react";
import InputField from "./ui/InputField";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useAccount, useChainId, useConfig } from "wagmi";
import { chainsToTSender, erc20Abi } from "@/constants";
import { readContract } from "@wagmi/core";

export default function AirdropForm() {
  const [tokenAddress, setTokenAddress] = useState("");
  const [recipients, setRecipients] = useState("");
  const [amounts, setAmounts] = useState("");

  const { openConnectModal } = useConnectModal();
  const { isConnected, address } = useAccount();
  const chainId = useChainId();
  const config = useConfig();

  async function getApprovedAmount(
    tSenderAddress: string | null
  ): Promise<number> {
    if (!tSenderAddress) {
      alert(
        "No contract address found for this chain, please use a supported chain"
      );
      return 0;
    }
    // use readContract instead of useReadContract to avoid rerendering
    const result = await readContract(config, {
      abi: erc20Abi,
      address: tokenAddress as `0x${string}`,
      functionName: "allowance",
      args: [address, tSenderAddress as `0x${string}`],
    });
    return result as number;
  }
  async function handleSubmit() {
    if (!isConnected) {
      console.log("Wallet not connected, opening connect modal");
      openConnectModal?.();
    } else {
      // Approve our tsender contract to send our tokens
      const tSenderAddress = chainsToTSender[chainId]["tsender"];
      const approvedAmount = await getApprovedAmount(tSenderAddress);
      console.log("Approved amount for", tSenderAddress, approvedAmount);
      // Call the airdrop function on the tsender contract
      // Wait for the transaction to be mined
    }
  }
  return (
    <div>
      <InputField
        label="Token Address"
        placeholder="0x"
        value={tokenAddress}
        onChange={e => setTokenAddress(e.target.value)}
      />
      <InputField
        large
        label="Recipients"
        placeholder="0x1111....aaAA,0x2222....bbBB,0x3333....ccCC"
        value={recipients}
        onChange={e => setRecipients(e.target.value)}
      />
      <InputField
        large
        label="Amounts"
        placeholder="100,200,300"
        value={amounts}
        onChange={e => setAmounts(e.target.value)}
      />
      <button onClick={handleSubmit}>Send tokens</button>
    </div>
  );
}
