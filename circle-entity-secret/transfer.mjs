import { initiateDeveloperControlledWalletsClient } from "@circle-fin/developer-controlled-wallets";

const client = initiateDeveloperControlledWalletsClient({
  apiKey: "TEST_API_KEY:8d31d450105795add0181868e5152c66:00e5c7755bf28480c6a6ea44c8a1c5f4",
  entitySecret: "d3a4543f1159f2e413a75c70e75cdc70640f1e6e4f7a8ca9daaaeb787d621e26",
});

const WALLET_A_ID = "a3aa475b-dbaf-5a57-9279-ecf5d96965a3";
const WALLET_B_ADDRESS = "0xefCa26C30942fA3b55ed67BE12A787a0B7AD9376";
const USDC_TOKEN_ID = "36b6931a-873a-56a8-8a27-b706b17104ee";

// Kirim 1 USDC dari Wallet A ke Wallet B
const tx = await client.createTransaction({
  walletId: WALLET_A_ID,
  tokenId: USDC_TOKEN_ID,
  destinationAddress: WALLET_B_ADDRESS,
  amounts: ["1"],
  fee: { type: "level", config: { feeLevel: "MEDIUM" } },
});

console.log("✅ Transfer submitted!");
console.log("Transaction ID:", tx.data?.id);
console.log("State:", tx.data?.state);

// Polling status
const txId = tx.data?.id;
for (let i = 0; i < 30; i++) {
  await new Promise(r => setTimeout(r, 3000));
  const status = await client.getTransaction({ id: txId });
  const state = status.data?.transaction?.state;
  console.log(`Status: ${state}`);
  if (state === "COMPLETE") {
    console.log("🎉 Transfer berhasil!");
    console.log("Tx Hash:", status.data?.transaction?.txHash);
    break;
  }
  if (state === "FAILED") {
    console.log("❌ Transfer gagal!");
    break;
  }
}
