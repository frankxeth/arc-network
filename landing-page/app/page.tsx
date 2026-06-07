"use client";
import { useState, useEffect } from "react";
import { ConnectKitButton } from "connectkit";
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt, useBalance, useSwitchChain } from "wagmi";
import { parseUnits, formatUnits } from "viem";
import { MTK_ADDRESS, MTK_ABI, RECIPIENT_ADDRESS, arcTestnet } from "./providers";

export default function Home() {
  const [tab, setTab] = useState<"transfer" | "mint" | "bridge">("transfer");
  const [amount, setAmount] = useState("");
  const [toAddress, setToAddress] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const { address, isConnected, chainId } = useAccount();
  const { switchChain } = useSwitchChain();
  const { data: ethBalance } = useBalance({ address });

  const { data: mtkBalance } = useReadContract({
    address: MTK_ADDRESS,
    abi: MTK_ABI,
    functionName: "balanceOf",
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  });

  const { writeContract, data: txHash, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash: txHash });

  const isWrongNetwork = isConnected && chainId !== arcTestnet.id;
  const mtkFormatted = mtkBalance ? parseFloat(formatUnits(mtkBalance as bigint, 18)).toFixed(4) : "0.0000";

  function handleTransfer() {
    if (!amount || !toAddress) return;
    writeContract({ address: MTK_ADDRESS, abi: MTK_ABI, functionName: "transfer", args: [toAddress as `0x${string}`, parseUnits(amount, 18)] });
  }

  function handleMint() {
    if (!amount || !address) return;
    writeContract({ address: MTK_ADDRESS, abi: MTK_ABI, functionName: "mint", args: [address, parseUnits(amount, 18)] });
  }

  return (
    <div className="min-h-screen bg-black flex flex-col text-white">
      <nav className="w-full px-6 py-4 flex justify-between items-center border-b border-white/10">
        <span className="font-bold text-white text-xl">⬡ ArrowDEX</span>
        <div className="hidden md:flex gap-6 text-sm text-gray-500">
          <a href="https://testnet.arcscan.app/address/0x1b8a151e64bc07de0acf967a0cb17ee16c3c8e2d" target="_blank" className="hover:text-white">Contract ↗</a>
          <a href="https://testnet.arcscan.app" target="_blank" className="hover:text-white">Explorer ↗</a>
          <a href="https://faucet.circle.com" target="_blank" className="hover:text-white">Faucet ↗</a>
        </div>
        {mounted && <ConnectKitButton />}
      </nav>

      {mounted && isWrongNetwork && (
        <div className="bg-yellow-500/10 border-b border-yellow-500/20 px-6 py-2 flex items-center justify-between text-sm">
          <span className="text-yellow-400">⚠ Wrong network — switch to Arc Testnet</span>
          <button onClick={() => switchChain({ chainId: arcTestnet.id })} className="bg-yellow-500 text-black px-3 py-1 rounded-lg text-xs font-semibold hover:bg-yellow-400">Switch Network</button>
        </div>
      )}

      {mounted && isConnected && (
        <div className="w-full px-6 py-2 bg-white/[0.03] border-b border-white/10 text-xs text-gray-400 flex gap-6 flex-wrap">
          <span>Wallet: <span className="text-white font-mono">{address?.slice(0,6)}...{address?.slice(-4)}</span></span>
          <span>Balance: <span className="text-white">{parseFloat(ethBalance?.formatted || "0").toFixed(4)} {ethBalance?.symbol}</span></span>
          <span>MTK: <span className="text-green-400 font-semibold">{mtkFormatted}</span></span>
          <span>Network: <span className={chainId === arcTestnet.id ? "text-green-400" : "text-red-400"}>{chainId === arcTestnet.id ? "Arc Testnet ✓" : "Wrong Network ✗"}</span></span>
        </div>
      )}

      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <h1 className="text-4xl font-bold mb-1">ArrowDEX</h1>
        <p className="text-gray-500 text-sm mb-2">MTK Token on Arc Testnet</p>
        <p className="text-gray-600 text-xs font-mono mb-8">{MTK_ADDRESS}</p>

        <div className="bg-[#111] rounded-2xl border border-white/10 w-full max-w-sm p-6">
          <div className="flex bg-white/5 rounded-xl p-1 mb-6">
            {(["transfer", "mint", "bridge"] as const).map((t) => (
              <button key={t} onClick={() => setTab(t)} className={`flex-1 py-2 rounded-lg text-xs font-medium transition-all capitalize ${tab === t ? "bg-white text-black" : "text-gray-500 hover:text-gray-300"}`}>{t}</button>
            ))}
          </div>

          {tab === "transfer" && (
            <>
              <div className="mb-4">
                <label className="text-xs text-gray-500 mb-1 block">To Address</label>
                <input type="text" placeholder={RECIPIENT_ADDRESS} value={toAddress} onChange={e => setToAddress(e.target.value)}
                  className="w-full border border-white/10 rounded-xl px-4 py-3 text-xs bg-white/5 text-white placeholder-gray-700 focus:outline-none focus:border-white/30 font-mono" />
              </div>
              <div className="mb-5">
                <label className="text-xs text-gray-500 mb-1 block">MTK Amount</label>
                <div className="flex items-center border border-white/10 rounded-xl bg-white/5 px-4 py-3">
                  <input type="number" placeholder="0.00" value={amount} onChange={e => setAmount(e.target.value)} className="flex-1 bg-transparent text-sm focus:outline-none text-white placeholder-gray-600" />
                  <span className="text-xs text-gray-400">MTK</span>
                </div>
              </div>
              <div className="bg-white/5 rounded-xl px-4 py-3 mb-5 space-y-1.5 text-xs">
                <div className="flex justify-between text-gray-500"><span>Contract</span><span className="text-gray-300 font-mono">{MTK_ADDRESS.slice(0,10)}...</span></div>
                <div className="flex justify-between text-gray-500"><span>Network</span><span className="text-gray-300">Arc Testnet</span></div>
                <div className="flex justify-between text-gray-500"><span>Your Balance</span><span className="text-green-400">{mtkFormatted} MTK</span></div>
              </div>
              <button onClick={handleTransfer} disabled={!isConnected || !amount || !toAddress || isPending || isConfirming || isWrongNetwork}
                className="w-full bg-white text-black py-3.5 rounded-xl font-semibold hover:bg-gray-100 transition-colors text-sm disabled:opacity-40 disabled:cursor-not-allowed">
                {isPending ? "Confirm in Wallet..." : isConfirming ? "Processing..." : "Transfer MTK"}
              </button>
            </>
          )}

          {tab === "mint" && (
            <>
              <div className="mb-5">
                <label className="text-xs text-gray-500 mb-1 block">Amount to Mint</label>
                <div className="flex items-center border border-white/10 rounded-xl bg-white/5 px-4 py-3">
                  <input type="number" placeholder="100" value={amount} onChange={e => setAmount(e.target.value)} className="flex-1 bg-transparent text-sm focus:outline-none text-white placeholder-gray-600" />
                  <span className="text-xs text-gray-400">MTK</span>
                </div>
              </div>
              <div className="bg-white/5 rounded-xl px-4 py-3 mb-5 space-y-1.5 text-xs">
                <div className="flex justify-between text-gray-500"><span>Mint to</span><span className="text-gray-300 font-mono">{address?.slice(0,6)}...{address?.slice(-4)}</span></div>
                <div className="flex justify-between text-gray-500"><span>Current Balance</span><span className="text-green-400">{mtkFormatted} MTK</span></div>
                <div className="flex justify-between text-gray-500"><span>Note</span><span className="text-yellow-400">Owner only</span></div>
              </div>
              <button onClick={handleMint} disabled={!isConnected || !amount || isPending || isConfirming || isWrongNetwork}
                className="w-full bg-white text-black py-3.5 rounded-xl font-semibold hover:bg-gray-100 transition-colors text-sm disabled:opacity-40 disabled:cursor-not-allowed">
                {isPending ? "Confirm in Wallet..." : isConfirming ? "Processing..." : "Mint MTK"}
              </button>
            </>
          )}

          {tab === "bridge" && (
            <>
              <div className="bg-white/5 rounded-xl px-4 py-4 mb-5 space-y-2 text-xs">
                <div className="flex justify-between text-gray-500"><span>Protocol</span><span className="text-gray-300">Circle CCTP v2</span></div>
                <div className="flex justify-between text-gray-500"><span>Route</span><span className="text-gray-300">Sepolia → Arc</span></div>
                <div className="flex justify-between text-gray-500"><span>Est. Time</span><span className="text-gray-300">~2-5 min</span></div>
                <div className="flex justify-between text-gray-500"><span>Fee</span><span className="text-gray-300">Gas only</span></div>
              </div>
              <a href="https://app.circle.com/bridge" target="_blank"
                className="block w-full bg-white text-black py-3.5 rounded-xl font-semibold hover:bg-gray-100 transition-colors text-sm text-center">
                Bridge via Circle ↗
              </a>
            </>
          )}

          {isPending && <p className="text-center text-yellow-400 text-xs mt-3">⏳ Confirm in wallet...</p>}
          {isConfirming && <p className="text-center text-yellow-400 text-xs mt-3">⏳ Waiting for confirmation...</p>}
          {isSuccess && txHash && (
            <p className="text-center text-green-400 text-xs mt-3">✅ Success! <a href={`https://testnet.arcscan.app/tx/${txHash}`} target="_blank" className="underline">View on ArcScan ↗</a></p>
          )}
        </div>
      </main>

      <footer className="text-center py-6 border-t border-white/10">
        <p className="text-xs text-gray-600 mb-2">ArrowDEX — MTK Token on Arc Testnet (Chain ID: 5042002)</p>
        <p className="text-xs text-gray-700">Testnet only. No real assets involved.</p>
      </footer>
    </div>
  );
}
