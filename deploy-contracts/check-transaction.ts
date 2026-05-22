import { initiateDeveloperControlledWalletsClient } from "@circle-fin/developer-controlled-wallets";

const client = initiateDeveloperControlledWalletsClient({
  apiKey: process.env.CIRCLE_API_KEY,
  entitySecret: process.env.CIRCLE_ENTITY_SECRET,
});

const response = await client.getTransaction({ id: process.env.TRANSACTION_ID! });
console.log("State:", response.data?.transaction?.state);
console.log("Contract:", response.data?.transaction?.contractAddress);
console.log("TxHash:", response.data?.transaction?.txHash);
