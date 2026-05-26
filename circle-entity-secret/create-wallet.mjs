import { initiateDeveloperControlledWalletsClient } from "@circle-fin/developer-controlled-wallets";

const client = initiateDeveloperControlledWalletsClient({
  apiKey: "TEST_API_KEY:8d31d450105795add0181868e5152c66:00e5c7755bf28480c6a6ea44c8a1c5f4",
  entitySecret: "d3a4543f1159f2e413a75c70e75cdc70640f1e6e4f7a8ca9daaaeb787d621e26",
});

// Step 1: Buat Wallet Set
const walletSet = await client.createWalletSet({
  name: "Prass Arc WalletSet",
});

console.log("✅ Wallet Set dibuat!");
console.log("Wallet Set ID:", walletSet.data?.walletSet?.id);

// Step 2: Buat Wallet
const wallet = await client.createWallets({
  blockchains: ["MATIC-AMOY"],
  count: 1,
  walletSetId: walletSet.data?.walletSet?.id,
});

console.log("✅ Wallet dibuat!");
console.log("Wallet ID:", wallet.data?.wallets?.[0]?.id);
console.log("Address:", wallet.data?.wallets?.[0]?.address);
console.log("Blockchain:", wallet.data?.wallets?.[0]?.blockchain);
