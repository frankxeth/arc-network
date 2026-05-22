import { createPublicClient, http, parseAbiItem } from "viem";
import { arcTestnet } from "viem/chains";

const CONTRACT_ADDRESS = "0x1a2F5E6B63887855D829CD440a07f34AAAb44be6";

const client = createPublicClient({
  chain: arcTestnet,
  transport: http(),
});

console.log("🔍 Fetching past GreetingChanged events...");

// Ambil block terbaru dulu
const latestBlock = await client.getBlockNumber();
const fromBlock = latestBlock - 9000n;

const logs = await client.getLogs({
  address: CONTRACT_ADDRESS,
  event: parseAbiItem("event GreetingChanged(string newGreeting)"),
  fromBlock,
  toBlock: "latest",
});

console.log(`Scanning blocks ${fromBlock} to ${latestBlock}`);
console.log(`Found ${logs.length} event(s):\n`);

for (const log of logs) {
  console.log(`Block: ${log.blockNumber}`);
  console.log(`Tx: https://testnet.arcscan.app/tx/${log.transactionHash}`);
  console.log(`Greeting: ${log.args.newGreeting}`);
  console.log("---");
}

console.log("\n👂 Watching for new events...");

client.watchEvent({
  address: CONTRACT_ADDRESS,
  event: parseAbiItem("event GreetingChanged(string newGreeting)"),
  onLogs: (logs) => {
    for (const log of logs) {
      console.log(`\n🆕 New event!`);
      console.log(`Greeting: ${log.args.newGreeting}`);
      console.log(`Tx: https://testnet.arcscan.app/tx/${log.transactionHash}`);
    }
  },
});
