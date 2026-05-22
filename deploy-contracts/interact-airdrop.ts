import { initiateDeveloperControlledWalletsClient } from "@circle-fin/developer-controlled-wallets";
const sdk = initiateDeveloperControlledWalletsClient({ apiKey: process.env.CIRCLE_API_KEY, entitySecret: process.env.CIRCLE_ENTITY_SECRET });
async function main() {
  const ERC20_ADDRESS = "0x1b8a151e64bc07de0acf967a0cb17ee16c3c8e2d";
  const AIRDROP_ADDRESS = "0x281156899e5bd6fecf1c0831ee24894eeeaea2f8";
  // Approve airdrop contract to spend tokens
  const approve = await sdk.createContractExecutionTransaction({ walletId: process.env.WALLET_ID, abiFunctionSignature: "approve(address,uint256)", abiParameters: [AIRDROP_ADDRESS, "115792089237316195423570985008687907853269984665640564039457584007913129639935"], contractAddress: ERC20_ADDRESS, fee: { type: "level", config: { feeLevel: "MEDIUM" } } });
  console.log("Approve:", JSON.stringify(approve.data, null, 2));
  // Airdrop ERC-20 to 2 recipients
  const airdrop = await sdk.createContractExecutionTransaction({ walletId: process.env.WALLET_ID, abiFunctionSignature: "airdropERC20(address,(address,uint256)[])", abiParameters: [ERC20_ADDRESS, [[process.env.RECIPIENT_WALLET_ADDRESS, "1000000000000000000"], [process.env.WALLET_ADDRESS, "2000000000000000000"]]], contractAddress: AIRDROP_ADDRESS, fee: { type: "level", config: { feeLevel: "MEDIUM" } } });
  console.log("Airdrop:", JSON.stringify(airdrop.data, null, 2));
}
main();
