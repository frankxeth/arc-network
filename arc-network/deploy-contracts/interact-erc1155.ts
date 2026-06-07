import { initiateDeveloperControlledWalletsClient } from "@circle-fin/developer-controlled-wallets";
const sdk = initiateDeveloperControlledWalletsClient({ apiKey: process.env.CIRCLE_API_KEY, entitySecret: process.env.CIRCLE_ENTITY_SECRET });
async function main() {
  const ERC1155_ADDRESS = "0x281156899e5bd6fecf1c0831ee24894eeeaea2f8";
  const mint = await sdk.createContractExecutionTransaction({ walletId: process.env.WALLET_ID, abiFunctionSignature: "mintTo(address,uint256,string,uint256)", abiParameters: [process.env.WALLET_ADDRESS, "115792089237316195423570985008687907853269984665640564039457584007913129639935", "ipfs://bafkreibdi6623n3xpf7ymk62ckb4bo75o3qemwkpfvp5i25j66itxvsoei", "1"], contractAddress: ERC1155_ADDRESS, fee: { type: "level", config: { feeLevel: "MEDIUM" } } });
  console.log("Mint ERC1155:", JSON.stringify(mint.data, null, 2));
  const transfer = await sdk.createContractExecutionTransaction({ walletId: process.env.WALLET_ID, abiFunctionSignature: "safeBatchTransferFrom(address,address,uint256[],uint256[],bytes)", abiParameters: [process.env.WALLET_ADDRESS, process.env.RECIPIENT_WALLET_ADDRESS, ["0"], ["1"], "0x"], contractAddress: ERC1155_ADDRESS, fee: { type: "level", config: { feeLevel: "MEDIUM" } } });
  console.log("Transfer ERC1155:", JSON.stringify(transfer.data, null, 2));
}
main();
