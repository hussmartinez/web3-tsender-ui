"use client";

import { useMemo, useState } from "react";
import InputField from "./ui/InputField";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useAccount, useChainId, useConfig, useWriteContract } from "wagmi";
import { chainsToTSender, erc20Abi, tsenderAbi } from "@/constants";
import { readContract, waitForTransactionReceipt } from "@wagmi/core";
import { calculateTotal } from "@/utils";

export default function AirdropForm() {
  const [tokenAddress, setTokenAddress] = useState("");
  const [recipients, setRecipients] = useState("");
  const [amounts, setAmounts] = useState("");

  const { openConnectModal } = useConnectModal();
  const { isConnected, address } = useAccount();
  const chainId = useChainId();
  const config = useConfig();
  const { data: hash, isPending, writeContractAsync } = useWriteContract();

  const total: number = useMemo(() => calculateTotal(amounts), [amounts]);

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
      const tSenderAddress = chainsToTSender[chainId]["tsender"];
      const approvedAmount = await getApprovedAmount(tSenderAddress); // Check how much is already approved

      if (approvedAmount < total) {
        // if the approved amount is not enough
        // request approval of total amount
        const approvalHash = await writeContractAsync({
          abi: erc20Abi,
          address: tokenAddress as `0x${string}`,
          functionName: "approve",
          args: [tSenderAddress as `0x${string}`, BigInt(total)],
        });
        // wait for transaction to be mined (hook vs no hook)
        const approvalReceipt = await waitForTransactionReceipt(config, {
          hash: approvalHash,
        });
        console.log("Approval confirmed", approvalReceipt);
      }
      // After having the right amount approved, let's airdrop!
      await writeContractAsync({
        abi: tsenderAbi,
        address: tSenderAddress as `0x${string}`,
        functionName: "airdropERC20",
        args: [
          tokenAddress,
          recipients
            .split(/[\n,]+/)
            .map(addr => addr.trim())
            .filter(addr => addr !== ""),
          amounts
            .split(/[\n,]+/)
            .map(val => parseFloat(val.trim()))
            .filter(num => !isNaN(num)),
          BigInt(total),
        ],
      });
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
