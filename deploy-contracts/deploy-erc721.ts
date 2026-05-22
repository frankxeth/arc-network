import { initiateSmartContractPlatformClient } from "@circle-fin/smart-contract-platform";
const sdk = initiateSmartContractPlatformClient({ apiKey: process.env.CIRCLE_API_KEY, entitySecret: process.env.CIRCLE_ENTITY_SECRET });
const r = await sdk.deployContractTemplate({ id: "76b83278-50e2-4006-8b63-5b1a2a814533", blockchain: "ARC-TESTNET", name: "MyNFTContract", walletId: process.env.WALLET_ID, templateParameters: { name: "MyNFT", symbol: "MNFT", defaultAdmin: process.env.WALLET_ADDRESS, primarySaleRecipient: process.env.WALLET_ADDRESS, royaltyRecipient: process.env.WALLET_ADDRESS, royaltyPercent: 0.01 }, fee: { type: "level", config: { feeLevel: "MEDIUM" } } });
console.log(JSON.stringify(r.data, null, 2));
