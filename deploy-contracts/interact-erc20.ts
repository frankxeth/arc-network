import { initiateDeveloperControlledWalletsClient } from "@circle-fin/developer-controlled-wallets";

const sdk = initiateDeveloperControlledWalletsClient({
  apiKey: process.env.CIRCLE_API_KEY!,
  entitySecret: process.env.CIRCLE_ENTITY_SECRET!,
});

async function main() {
  const mint = await sdk.createContractExecutionTransaction({
    walletId: process.env.WALLET_ID!,
    abiFunctionSignature: "mintTo(address,uint256)",
    abiParameters: [process.env.WALLET_ADDRESS!, "100000000000000000000"],
    contractAddress: process.env.CONTRACT_ADDRESS!,
    fee: { type: "level", config: { feeLevel: "MEDIUM" } },
  });
  console.log("Mint:", JSON.stringify(mint.data, null, 2));

  const transfer = await sdk.createContractExecutionTransaction({
    walletId: process.env.WALLET_ID!,
    abiFunctionSignature: "transfer(address,uint256)",
    abiParameters: [process.env.RECIPIENT_WALLET_ADDRESS!, "100000000000000000000"],
    contractAddress: process.env.CONTRACT_ADDRESS!,
    fee: { type: "level", config: { feeLevel: "MEDIUM" } },
  });
  console.log("Transfer:", JSON.stringify(transfer.data, null, 2));
}

main();
