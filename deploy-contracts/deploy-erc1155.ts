import { initiateSmartContractPlatformClient } from "@circle-fin/smart-contract-platform";
const sdk = initiateSmartContractPlatformClient({ apiKey: process.env.CIRCLE_API_KEY, entitySecret: process.env.CIRCLE_ENTITY_SECRET });
const r = await sdk.deployContractTemplate({ id: "aea21da6-0aa2-4971-9a1a-5098842b1248", blockchain: "ARC-TESTNET", name: "MyMultiTokenContract", walletId: process.env.WALLET_ID, templateParameters: { name: "MyMultiToken", symbol: "MMTK", defaultAdmin: process.env.WALLET_ADDRESS, primarySaleRecipient: process.env.WALLET_ADDRESS, royaltyRecipient: process.env.WALLET_ADDRESS, royaltyPercent: 0.01 }, fee: { type: "level", config: { feeLevel: "MEDIUM" } } });
console.log(JSON.stringify(r.data, null, 2));
