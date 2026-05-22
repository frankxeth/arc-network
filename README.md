# Arc Network - Developer Tutorials

A collection of tutorials and implementations for building on Arc Testnet, a stablecoin-native Layer-1 blockchain built by Circle.

## Project Structure

- circle-entity-secret/ - Circle Dev-Controlled Wallet setup and USDC transfer
- hello-arc/ - Deploy and interact with smart contracts on Arc Testnet
- erc8004-quickstart/ - Register AI Agent with onchain identity (ERC-8004)
- monitor-events/ - Live contract event monitoring
- deploy-contracts/ - Deploy ERC-20, ERC-721, ERC-1155, Airdrop via Circle SDK
- app-kit-bridge/ - Bridge USDC across chains via App Kit (CCTP V2)

## Completed Tutorials

### 1. Circle Entity Secret and Dev-Controlled Wallet
- Generated and registered Entity Secret to Circle Console
- Created Dev-Controlled Wallets on MATIC-AMOY and Arc Testnet (SCA)
- Transferred USDC between wallets using Circle SDK

### 2. Deploy Smart Contract (HelloArchitect)
- Set up Hardhat + Solidity on Arc Testnet
- Deployed HelloArchitect.sol with greeting read/write functions
- Contract: 0x1a2F5E6B63887855D829CD440a07f34AAAb44be6
- Explorer: https://testnet.arcscan.app/address/0x1a2F5E6B63887855D829CD440a07f34AAAb44be6

### 3. Register AI Agent (ERC-8004)
- Registered AI agent with onchain identity (ERC-721 NFT)
- Recorded reputation feedback from a validator wallet
- Requested and verified KYC validation onchain (response: 100 = passed)
- Owner: 0xE1769629A3C94Cf8d5dE5FBabCAF8B18944d810C
- Explorer: https://testnet.arcscan.app/address/0xE1769629A3C94Cf8d5dE5FBabCAF8B18944d810C

### 4. Monitor Contract Events
- Built a live event monitor using Viem
- Fetched past GreetingChanged events from HelloArchitect contract
- Watched for new events in real-time via watchEvent

### 5. Deploy Contracts via Circle Contracts SDK
- Deployed 4 pre-audited contract templates on Arc Testnet:
  - ERC-20 (MyToken / MTK): 0x1b8a151e64bc07de0acf967a0cb17ee16c3c8e2d
  - ERC-721 (MyNFT / MNFT)
  - ERC-1155 (MyMultiToken / MMTK)
  - Airdrop contract
- Gas sponsored automatically by Circle Gas Station (SCA wallets)

### 6. Interact with Contracts
- Minted and transferred ERC-20 tokens
- Minted and transferred ERC-721 NFTs
- Minted and batch transferred ERC-1155 tokens
- Executed ERC-20 airdrop to multiple recipients

### 7. Bridge USDC via App Kit (CCTP V2)
- Bridged 1 USDC from Ethereum Sepolia to Arc Testnet
- Used Circle App Kit with Viem adapter
- Powered by CCTP V2 (Cross-Chain Transfer Protocol)
- Tx: https://testnet.arcscan.app/tx/0x504b30eda664c8045eee674cef1be95c7a4c7e846326cffcd9c4f815c80fe050

## Tech Stack

- Node.js / TypeScript
- Hardhat (smart contract development)
- Viem (EVM interactions)
- Circle Developer-Controlled Wallets SDK
- Circle Smart Contract Platform SDK
- Circle App Kit (bridging via CCTP V2)
- Arc Testnet

## Network Info

- Network: Arc Testnet
- RPC: https://rpc.testnet.arc.network
- Explorer: https://testnet.arcscan.app
- Faucet: https://faucet.circle.com
- Chain: EVM-compatible, USDC as gas token

## Wallet Addresses

- Owner: 0xE1769629A3C94Cf8d5dE5FBabCAF8B18944d810C (Arc Testnet / Sepolia)
- Validator: 0xefCa26C30942fA3b55ed67BE12A787a0B7AD9376 (Arc Testnet)
- Circle SCA: 0x4a35fc08e21781a0dc0b4d2609a5a27a6ef8cf34 (Arc Testnet)

## Resources

- Arc Docs: https://docs.arc.io
- Circle Developer Docs: https://developers.circle.com
- Arc Testnet Explorer: https://testnet.arcscan.app
- Stablecoins Commerce Stack Challenge: https://app.ignyte.ae/public/challenges/4B436318-C737-F111-9A49-6045BD14D400

## Author

- Twitter: https://x.com/l1luna_
- Telegram: https://t.me/agungprass33
- GitHub: https://github.com/frankxeth/arc-network
