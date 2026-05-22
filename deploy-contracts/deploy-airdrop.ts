import { initiateSmartContractPlatformClient } from "@circle-fin/smart-contract-platform";
const sdk = initiateSmartContractPlatformClient({ apiKey: process.env.CIRCLE_API_KEY, entitySecret: process.env.CIRCLE_ENTITY_SECRET });
const r = await sdk.deployContractTemplate({ id: "13e322f2-18dc-4f57-8eed-4bddfc50f85e", blockchain: "ARC-TESTNET", name: "MyAirdropContract", walletId: process.env.WALLET_ID, templateParameters: { defaultAdmin: process.env.WALLET_ADDRESS }, fee: { type: "level", config: { feeLevel: "MEDIUM" } } });
console.log(JSON.stringify(r.data, null, 2));
