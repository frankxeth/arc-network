import { initiateDeveloperControlledWalletsClient } from "@circle-fin/developer-controlled-wallets";

const client = initiateDeveloperControlledWalletsClient({
  apiKey: process.env.CIRCLE_API_KEY,
  entitySecret: process.env.CIRCLE_ENTITY_SECRET,
});

const walletSetResponse = await client.createWalletSet({
  name: "Deploy Contracts WalletSet",
});

const walletsResponse = await client.createWallets({
  blockchains: ["ARC-TESTNET"],
  count: 1,
  walletSetId: walletSetResponse.data?.walletSet?.id ?? "",
  accountType: "SCA",
});

console.log(JSON.stringify(walletsResponse.data, null, 2));
