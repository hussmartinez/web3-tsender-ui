"use client";

import { useState } from "react";
import InputField from "./ui/InputField";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";

export default function AirdropForm() {
  const [tokenAddress, setTokenAddress] = useState("");
  const [recipients, setRecipients] = useState("");
  const [amounts, setAmounts] = useState("");

  const { openConnectModal } = useConnectModal();
  const { address } = useAccount();

  async function handleSubmit() {
    if (!address) {
      console.log("Wallet not connected, opening connect modal");
      openConnectModal?.();
    } else {
      console.log("amounts", amounts);
      console.log("tokenAddress", tokenAddress);
      console.log("recipients", recipients);
    }
    // Approve our tsender contract to send our tokens
    // Call the airdrop function on the tsender contract
    // Wait for the transaction to be mined
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
