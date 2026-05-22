import { initiateDeveloperControlledWalletsClient } from "@circle-fin/developer-controlled-wallets";
const sdk = initiateDeveloperControlledWalletsClient({ apiKey: process.env.CIRCLE_API_KEY, entitySecret: process.env.CIRCLE_ENTITY_SECRET });
async function main() {
  const ERC721_ADDRESS = "0x281156899e5bd6fecf1c0831ee24894eeeaea2f8";
  const mint = await sdk.createContractExecutionTransaction({ walletId: process.env.WALLET_ID, abiFunctionSignature: "mintTo(address,string)", abiParameters: [process.env.WALLET_ADDRESS, "ipfs://bafkreibdi6623n3xpf7ymk62ckb4bo75o3qemwkpfvp5i25j66itxvsoei"], contractAddress: ERC721_ADDRESS, fee: { type: "level", config: { feeLevel: "MEDIUM" } } });
  console.log("Mint NFT:", JSON.stringify(mint.data, null, 2));
  const transfer = await sdk.createContractExecutionTransaction({ walletId: process.env.WALLET_ID, abiFunctionSignature: "safeTransferFrom(address,address,uint256)", abiParameters: [process.env.WALLET_ADDRESS, process.env.RECIPIENT_WALLET_ADDRESS, "1"], contractAddress: ERC721_ADDRESS, fee: { type: "level", config: { feeLevel: "MEDIUM" } } });
  console.log("Transfer NFT:", JSON.stringify(transfer.data, null, 2));
}
main();
