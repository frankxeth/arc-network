
---

## 🎯 ARC-ID Predict Market

On-chain prediction market where users bet **MTK tokens** on real-world outcomes. Every transaction goes through Arc Testnet smart contracts — fully on-chain, transparent, verifiable.

**🌐 Live:** https://arc-network-jet.vercel.app/

### Deployed Contracts

| Contract | Address |
|----------|---------|
| PredictMarket | `0xB471266db352b095D766F89dA3a6981d62407Deb` |
| MyToken (MTK) | `0xdb8411b9B8D96168b47b08Df6CB10c799e88EF85` |
| MTK Faucet | `0xBAb2A22f35293BdF51A537C34fF23DAcca1Da612` |

### Features
- 8 active prediction markets (Crypto, Arc Network, DeFi, Tech)
- On-chain betting with MTK token
- MTK Faucet — claim 100 MTK every 24h at [/faucet.html](https://arc-network-jet.vercel.app/faucet.html)
- USDC balance display (native Arc gas token)
- Wallet connect (MetaMask, Rabby, OKX)

### Network
| | |
|---|---|
| Network | Arc Testnet |
| Chain ID | 5042002 |
| RPC | https://rpc.testnet.arc.network |
| Explorer | https://testnet.arcscan.app |
| Gas Token | USDC |

---

> # 🔷 Arc Network — Developer Tutorials

[![TypeScript](https://img.shields.io/badge/TypeScript-78.7%25-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Solidity](https://img.shields.io/badge/Solidity-2%25-363636?logo=solidity)](https://soliditylang.org)
[![Arc Testnet](https://img.shields.io/badge/Arc-Testnet-6C47FF)](https://testnet.arcscan.app)
[![Circle SDK](https://img.shields.io/badge/Circle-SDK-00D395)](https://developers.circle.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

A hands-on collection of tutorials and working implementations for building on **Arc Testnet** — Circle's stablecoin-native Layer-1 blockchain. Covers everything from wallet setup and smart contract deployment to on-chain AI agent identity and cross-chain USDC bridging.

---

## 📁 Project Structure

```
arc-network/
├── circle-entity-secret/    # Tutorial 1 — Entity Secret & Dev-Controlled Wallets
├── hello-arc/               # Tutorial 2 — Deploy & interact with smart contracts
├── erc8004-quickstart/      # Tutorial 3 — Register an AI agent (ERC-8004)
├── monitor-events/          # Tutorial 4 — Live on-chain event monitoring
├── deploy-contracts/        # Tutorial 5 & 6 — Deploy & interact with ERC tokens
├── app-kit-bridge/          # Tutorial 7 — Bridge USDC via CCTP V2
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🛠 Tech Stack

| Layer | Tool | Purpose |
|-------|------|---------|
| Language | Node.js + TypeScript | Runtime & primary language |
| Smart Contracts | Hardhat + Solidity | Compile & deploy contracts |
| EVM Interactions | Viem | Read/write contracts, watch events |
| Wallet SDK | Circle Developer-Controlled Wallets | Programmatic wallet & USDC management |
| Contract SDK | Circle Smart Contract Platform | Deploy pre-audited ERC templates |
| Bridging | Circle App Kit + CCTP V2 | Cross-chain USDC transfers |
| Blockchain | Arc Testnet | EVM-compatible, USDC as gas token |

---

## 🌐 Network Info

| Property | Value |
|----------|-------|
| Network | Arc Testnet |
| RPC URL | `https://rpc.testnet.arc.network` |
| Explorer | [testnet.arcscan.app](https://testnet.arcscan.app) |
| Faucet | [faucet.circle.com](https://faucet.circle.com) |
| Gas Token | **USDC** (not ETH) |
| Compatibility | EVM-compatible |

> ⚡ **Arc's key advantage:** Gas fees are paid in USDC instead of a volatile native token. This makes transaction costs stable and predictable — essential for agentic economy applications.

---

## ✅ Prerequisites

- **Node.js** v18+ → [nodejs.org](https://nodejs.org)
- **npm** v8+
- **Git**
- A [Circle Developer Console](https://app.circle.com/signup) account — for API Key & Entity Secret
- A wallet funded with testnet USDC via [faucet.circle.com](https://faucet.circle.com)

---

## ⚡ Quick Start

```bash
# Clone the repo
git clone https://github.com/frankxeth/arc-network.git
cd arc-network

# Install root dependencies
npm install

# Navigate to any tutorial and run it
cd circle-entity-secret
npm start
```

---

## Tutorial 1 — Circle Entity Secret & Dev-Controlled Wallet

**Folder:** `circle-entity-secret/`

Set up a Circle **Dev-Controlled Wallet** — the foundation for all programmatic wallet and USDC operations on Arc.

### What You'll Learn
- Generate and register an Entity Secret in the Circle Console
- Create Dev-Controlled Wallets (SCA type) on MATIC-AMOY and Arc Testnet
- Transfer USDC between wallets using the Circle SDK

### Setup

```bash
cd circle-entity-secret
npm install
```

Add credentials directly or via `.env`:

```env
CIRCLE_API_KEY=your_circle_api_key
CIRCLE_ENTITY_SECRET=your_entity_secret
```

> ⚠️ **Your Entity Secret is non-recoverable.** Store it securely and never commit it to Git.

### How to Get Your Entity Secret

1. Open [Circle Developer Console](https://app.circle.com)
2. Go to **Settings → Entity Secret**
3. Generate a new secret and copy it
4. Register it in the console (one-time step)

### Key Code — `generate.mjs`

```js
import { generateEntitySecret } from "@circle-fin/developer-controlled-wallets";

const secret = generateEntitySecret();
console.log("Your Entity Secret:", secret);
```

### Key Code — `create-wallet.mjs`

```js
import { initiateDeveloperControlledWalletsClient } from "@circle-fin/developer-controlled-wallets";

const client = initiateDeveloperControlledWalletsClient({
  apiKey: process.env.CIRCLE_API_KEY,
  entitySecret: process.env.CIRCLE_ENTITY_SECRET,
});

// Step 1: Create a Wallet Set
const walletSet = await client.createWalletSet({ name: "Prass Arc WalletSet" });
console.log("✅ Wallet Set ID:", walletSet.data?.walletSet?.id);

// Step 2: Create a Wallet on Arc Testnet (SCA type)
const wallet = await client.createWallets({
  blockchains: ["ARC-TESTNET"],
  count: 1,
  walletSetId: walletSet.data?.walletSet?.id,
  accountType: "SCA",
});
console.log("✅ Wallet Address:", wallet.data?.wallets?.[0]?.address);
```

### Key Code — `transfer.mjs`

```js
// Send 1 USDC from Wallet A to Wallet B
const tx = await client.createTransaction({
  walletId: WALLET_A_ID,
  tokenId: USDC_TOKEN_ID,
  destinationAddress: WALLET_B_ADDRESS,
  amounts: ["1"],
  fee: { type: "level", config: { feeLevel: "MEDIUM" } },
});

// Poll for completion
for (let i = 0; i < 30; i++) {
  await new Promise(r => setTimeout(r, 3000));
  const status = await client.getTransaction({ id: tx.data?.id });
  const state = status.data?.transaction?.state;
  console.log(`Status: ${state}`);
  if (state === "COMPLETE") {
    console.log("🎉 Transfer complete! Tx Hash:", status.data?.transaction?.txHash);
    break;
  }
}
```

### Run

```bash
node generate.mjs      # generate entity secret
node register.mjs      # register it to Circle Console
node create-wallet.mjs # create wallets
node transfer.mjs      # transfer USDC
```

---

## Tutorial 2 — Deploy Smart Contract (HelloArchitect)

**Folder:** `hello-arc/`

Deploy your first Solidity smart contract on Arc Testnet using Hardhat.

### What You'll Learn
- Configure Hardhat for Arc Testnet
- Deploy `HelloArchitect.sol` — a contract with greeting read/write and event emission
- Interact with the deployed contract on-chain

### Setup

```bash
cd hello-arc
npm install
```

Add your private key to `hardhat.config.js` or use an `.env` file.

### Smart Contract — `HelloArchitect.sol`

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract HelloArchitect {
    string private greeting;
    event GreetingChanged(string newGreeting);

    constructor() {
        greeting = "Hello Architect!";
    }

    function setGreeting(string memory newGreeting) public {
        greeting = newGreeting;
        emit GreetingChanged(newGreeting);
    }

    function getGreeting() public view returns (string memory) {
        return greeting;
    }
}
```

### Deploy Script — `scripts/deploy.js`

```js
const hre = require("hardhat");

async function main() {
  const HelloArchitect = await hre.ethers.getContractFactory("HelloArchitect");
  const contract = await HelloArchitect.deploy();
  await contract.waitForDeployment();
  console.log("✅ Contract deployed to:", await contract.getAddress());
}

main().catch((error) => { console.error(error); process.exit(1); });
```

### Run

```bash
npx hardhat compile
npx hardhat run scripts/deploy.js --network arc-testnet
node scripts/interact.js
```

### Deployed Contract

| | |
|---|---|
| **Address** | [`0x1a2F5E6B63887855D829CD440a07f34AAAb44be6`](https://testnet.arcscan.app/address/0x1a2F5E6B63887855D829CD440a07f34AAAb44be6) |
| **Network** | Arc Testnet |

---

## Tutorial 3 — Register an AI Agent (ERC-8004)

**Folder:** `erc8004-quickstart/`

Register an AI agent with a **verifiable on-chain identity** using the ERC-8004 standard — Arc's NFT-based registry for AI agents with reputation, KYC, and validation support.

### What You'll Learn
- Mint an agent identity as an ERC-721 NFT
- Record reputation feedback from a validator wallet
- Submit and verify a KYC validation request on-chain

### Setup

```bash
cd erc8004-quickstart
npm install
```

Create a `.env` file:

```env
OWNER_PRIVATE_KEY=0x...
VALIDATOR_PRIVATE_KEY=0x...
```

### ERC-8004 Registry Contracts (Arc Testnet)

| Contract | Address |
|----------|---------|
| Identity Registry | `0x8004A818BFB912233c491871b3d84c89A494BD9e` |
| Reputation Registry | `0x8004B663056A597Dffe9eCcC1965A193B7388713` |
| Validation Registry | `0x8004Cb1BF31DAf7788923b405b754f57acEB4272` |

### Flow

```
Owner Wallet
  │── register(metadataURI) ──────────────► Identity Registry (mint NFT)
  │                                                │
  │                                         agentId returned via Transfer event
  │
Validator Wallet
  │── giveFeedback(agentId, score=95) ─────► Reputation Registry
  │
Owner Wallet
  │── validationRequest(validator, agentId) ► Validation Registry
  │
Validator Wallet
  │── validationResponse(requestHash, 100) ► Validation Registry
  │
  └── getValidationStatus(requestHash) ────► response: 100 (KYC PASSED ✅)
```

### Key Code — `index.ts` (excerpt)

```ts
// Step 1: Register agent identity → mints an ERC-721 NFT
const registerTx = await ownerWalletClient.writeContract({
  address: IDENTITY_REGISTRY,
  abi: identityAbi,
  functionName: "register",
  args: [METADATA_URI],
  account: ownerAccount,
});

// Step 2: Get the agent's token ID from Transfer event
const transferLogs = await publicClient.getLogs({
  address: IDENTITY_REGISTRY,
  event: parseAbiItem("event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)"),
  args: { to: ownerAccount.address },
  fromBlock: receipt.blockNumber,
  toBlock: receipt.blockNumber,
});
const agentId = transferLogs[transferLogs.length - 1].args.tokenId!;

// Step 3: Validator gives reputation feedback
await reputationContract.write.giveFeedback(
  [agentId, 95n, 0, "successful_trade", "", "", "", feedbackHash],
  { account: validatorAccount }
);

// Step 4: KYC validation — request then respond
await ownerWalletClient.writeContract({ functionName: "validationRequest", args: [validatorAccount.address, agentId, requestURI, requestHash] });
await validatorWalletClient.writeContract({ functionName: "validationResponse", args: [requestHash, 100, "", zeroHash, "kyc_verified"] });
```

### Run

```bash
npm start
```

**Expected output:**

```
── Step 1: Wallets ──
  Owner:     0xE1769629A3C94Cf8d5dE5FBabCAF8B18944d810C
  Validator: 0xefCa26C30942fA3b55ed67BE12A787a0B7AD9376

── Step 2: Register agent identity ──
  ✅ Registration confirmed!

── Step 3: Retrieve agent ID ──
  Agent ID: 1
  URI:      ipfs://bafkreibdi...

── Step 4: Record reputation ──
  ✅ Reputation confirmed!

── Step 5: Request validation ──
  ✅ Validation request confirmed!

── Step 6: Validation response ──
  ✅ Validation response confirmed!

── Step 7: Check validation ──
  Response: 100 (100 = passed)
  Tag:      kyc_verified

── ✅ Complete ──
  ✓ Identity registered
  ✓ Reputation recorded
  ✓ Validation verified
```

### Deployed Wallets

| Role | Address | Explorer |
|------|---------|---------|
| Owner | `0xE1769629A3C94Cf8d5dE5FBabCAF8B18944d810C` | [ArcScan](https://testnet.arcscan.app/address/0xE1769629A3C94Cf8d5dE5FBabCAF8B18944d810C) |
| Validator | `0xefCa26C30942fA3b55ed67BE12A787a0B7AD9376` | [ArcScan](https://testnet.arcscan.app/address/0xefCa26C30942fA3b55ed67BE12A787a0B7AD9376) |

---

## Tutorial 4 — Monitor Contract Events

**Folder:** `monitor-events/`

Build a real-time on-chain event monitor using **Viem** — a foundation for indexers, notification systems, and live dashboards.

### What You'll Learn
- Fetch past `GreetingChanged` events from `HelloArchitect`
- Watch for new events in real-time via `watchEvent`

### Setup

```bash
cd monitor-events
npm install
```

No `.env` needed — uses the public Arc Testnet RPC.

### Key Code — `index.ts`

```ts
import { createPublicClient, http, parseAbiItem } from "viem";
import { arcTestnet } from "viem/chains";

const CONTRACT_ADDRESS = "0x1a2F5E6B63887855D829CD440a07f34AAAb44be6";

const client = createPublicClient({
  chain: arcTestnet,
  transport: http(),
});

// 1. Fetch past events (last 9000 blocks)
const latestBlock = await client.getBlockNumber();
const logs = await client.getLogs({
  address: CONTRACT_ADDRESS,
  event: parseAbiItem("event GreetingChanged(string newGreeting)"),
  fromBlock: latestBlock - 9000n,
  toBlock: "latest",
});

console.log(`Found ${logs.length} past event(s)`);

// 2. Watch for new events in real-time
client.watchEvent({
  address: CONTRACT_ADDRESS,
  event: parseAbiItem("event GreetingChanged(string newGreeting)"),
  onLogs: (logs) => {
    for (const log of logs) {
      console.log(`🆕 New greeting: "${log.args.newGreeting}"`);
      console.log(`   Tx: https://testnet.arcscan.app/tx/${log.transactionHash}`);
    }
  },
});

console.log("👂 Watching for new events... (Ctrl+C to stop)");
```

### Run

```bash
npm start
```

---

## Tutorial 5 — Deploy Contracts via Circle Contracts SDK

**Folder:** `deploy-contracts/`

Deploy **4 pre-audited contract templates** (ERC-20, ERC-721, ERC-1155, Airdrop) using the Circle Smart Contract Platform SDK. Gas fees are automatically sponsored by Circle Gas Station for SCA wallets.

### What You'll Learn
- Deploy ERC-20, ERC-721, ERC-1155, and Airdrop contracts using `deployContractTemplate`
- Use Circle SDK instead of Hardhat for managed deployments

### Setup

```bash
cd deploy-contracts
npm install
```

Create a `.env` file:

```env
CIRCLE_API_KEY=your_circle_api_key
CIRCLE_ENTITY_SECRET=your_entity_secret
WALLET_ID=your_sca_wallet_id
WALLET_ADDRESS=your_wallet_address
```

### Key Code — `deploy-erc20.ts`

```ts
import { initiateSmartContractPlatformClient } from "@circle-fin/smart-contract-platform";

const contractSdk = initiateSmartContractPlatformClient({
  apiKey: process.env.CIRCLE_API_KEY,
  entitySecret: process.env.CIRCLE_ENTITY_SECRET,
});

const response = await contractSdk.deployContractTemplate({
  id: "a1b74add-23e0-4712-88d1-6b3009e85a86", // ERC-20 template ID
  blockchain: "ARC-TESTNET",
  name: "MyTokenContract",
  walletId: process.env.WALLET_ID,
  templateParameters: {
    name: "MyToken",
    symbol: "MTK",
    defaultAdmin: process.env.WALLET_ADDRESS,
    primarySaleRecipient: process.env.WALLET_ADDRESS,
  },
  fee: { type: "level", config: { feeLevel: "MEDIUM" } },
});

console.log(JSON.stringify(response.data, null, 2));
```

### Run

```bash
npx tsx deploy-erc20.ts
npx tsx deploy-erc721.ts
npx tsx deploy-erc1155.ts
npx tsx deploy-airdrop.ts
```

### Deployed Contracts

| Contract | Symbol | Address | Explorer |
|----------|--------|---------|---------|
| ERC-20 | MTK | `0x1b8a151e64bc07de0acf967a0cb17ee16c3c8e2d` | [ArcScan](https://testnet.arcscan.app/address/0x1b8a151e64bc07de0acf967a0cb17ee16c3c8e2d) |
| ERC-721 | MNFT | Deployed on Arc Testnet | — |
| ERC-1155 | MMTK | Deployed on Arc Testnet | — |
| Airdrop | — | Deployed on Arc Testnet | — |

> Gas is automatically sponsored by **Circle Gas Station** when using SCA wallets — no manual gas management required.

---

## Tutorial 6 — Interact with Contracts

**Folder:** `deploy-contracts/` (interact scripts)

Mint, transfer, and airdrop tokens using the contracts deployed in Tutorial 5.

### Operations Covered

| Script | Action |
|--------|--------|
| `interact-erc20.ts` | Mint ERC-20 tokens + transfer to another wallet |
| `interact-erc721.ts` | Mint ERC-721 NFT + transfer |
| `interact-erc1155.ts` | Mint ERC-1155 + batch transfer |
| `interact-airdrop.ts` | Airdrop ERC-20 to multiple recipients |

### Key Code — `interact-erc20.ts`

```ts
import { initiateDeveloperControlledWalletsClient } from "@circle-fin/developer-controlled-wallets";

const sdk = initiateDeveloperControlledWalletsClient({
  apiKey: process.env.CIRCLE_API_KEY,
  entitySecret: process.env.CIRCLE_ENTITY_SECRET,
});

// Mint 1 token (18 decimals)
const mint = await sdk.createContractExecutionTransaction({
  walletId: process.env.WALLET_ID,
  abiFunctionSignature: "mintTo(address,uint256)",
  abiParameters: [process.env.WALLET_ADDRESS, "1000000000000000000"],
  contractAddress: process.env.CONTRACT_ADDRESS,
  fee: { type: "level", config: { feeLevel: "MEDIUM" } },
});
console.log("Mint:", mint.data);

// Transfer 1 token to recipient
const transfer = await sdk.createContractExecutionTransaction({
  walletId: process.env.WALLET_ID,
  abiFunctionSignature: "transfer(address,uint256)",
  abiParameters: [process.env.RECIPIENT_WALLET_ADDRESS, "1000000000000000000"],
  contractAddress: process.env.CONTRACT_ADDRESS,
  fee: { type: "level", config: { feeLevel: "MEDIUM" } },
});
console.log("Transfer:", transfer.data);
```

### Run

```bash
npx tsx interact-erc20.ts
npx tsx interact-erc721.ts
npx tsx interact-erc1155.ts
npx tsx interact-airdrop.ts
```

---

## Tutorial 7 — Bridge USDC via App Kit (CCTP V2)

**Folder:** `app-kit-bridge/`

Bridge USDC across blockchains using **Circle App Kit** and **CCTP V2** (Cross-Chain Transfer Protocol v2) — the fastest and most cost-efficient way to move USDC between chains.

### What You'll Learn
- Set up Circle App Kit with the Viem adapter
- Bridge USDC from Ethereum Sepolia → Arc Testnet in a single function call

### Setup

```bash
cd app-kit-bridge
npm install
```

Create a `.env` file:

```env
PRIVATE_KEY=0x_your_wallet_private_key
```

### How CCTP V2 Works

```
Ethereum Sepolia                            Arc Testnet
      │                                          │
      │  burn 1 USDC on Sepolia                  │
      │ ─────────────────────────────────────►   │
      │       Circle Attestation Service         │
      │       (cross-chain message relay)        │
      │                                          │  mint 1 USDC on Arc
      │ ◄─────────────────────────────────────── │
```

No bridging fees. No wrapped tokens. Native USDC lands on Arc Testnet.

### Key Code — `index.ts`

```ts
import { AppKit } from "@circle-fin/app-kit";
import { createViemAdapterFromPrivateKey } from "@circle-fin/adapter-viem-v2";

const kit = new AppKit();

const adapter = createViemAdapterFromPrivateKey({
  privateKey: process.env.PRIVATE_KEY as string,
});

// Bridge 1 USDC from Ethereum Sepolia to Arc Testnet
const result = await kit.bridge({
  from: { adapter, chain: "Ethereum_Sepolia" },
  to: { adapter, chain: "Arc_Testnet" },
  amount: "1.00",
});

console.log("Bridge result:", result);
```

### Run

```bash
npm start
```

### Completed Transaction

| | |
|---|---|
| **Amount** | 1 USDC |
| **From** | Ethereum Sepolia |
| **To** | Arc Testnet |
| **Tx Hash** | [`0x504b30ed...`](https://testnet.arcscan.app/tx/0x504b30eda664c8045eee674cef1be95c7a4c7e846326cffcd9c4f815c80fe050) |

---

## 💼 Wallet Addresses

| Role | Address | Network |
|------|---------|---------|
| Owner | `0xE1769629A3C94Cf8d5dE5FBabCAF8B18944d810C` | Arc Testnet / Sepolia |
| Validator | `0xefCa26C30942fA3b55ed67BE12A787a0B7AD9376` | Arc Testnet |
| Circle SCA | `0x4a35fc08e21781a0dc0b4d2609a5a27a6ef8cf34` | Arc Testnet |

---

## 📚 Resources

| Resource | Link |
|----------|------|
| Arc Docs | [docs.arc.io](https://docs.arc.io) |
| Arc Testnet Explorer | [testnet.arcscan.app](https://testnet.arcscan.app) |
| Circle Developer Docs | [developers.circle.com](https://developers.circle.com) |
| Circle Faucet | [faucet.circle.com](https://faucet.circle.com) |
| ERC-8004 Quickstart | [docs.arc.network/arc/tutorials/register-your-first-ai-agent](https://docs.arc.network/arc/tutorials/register-your-first-ai-agent) |
| Stablecoin Commerce Stack Challenge | [Ignyte Challenge Page](https://app.ignyte.ae/public/challenges/4B436318-C737-F111-9A49-6045BD14D400) |

---

## 👤 Author

Built for the **Stablecoin Commerce Stack Challenge** — a 3-month virtual program by Ignyte with Circle and Arc as technical sponsors.

- 🐦 Twitter: [@l1luna_](https://x.com/l1luna_)
- 💬 Telegram: [@agungprass33](https://t.me/agungprass33)
- 🐙 GitHub: [frankxeth/arc-network](https://github.com/frankxeth/arc-network)

---

## 📄 License

MIT © 2026 — [frankxeth](https://github.com/frankxeth)
