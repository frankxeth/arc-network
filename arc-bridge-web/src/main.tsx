import React from 'react'
import ReactDOM from 'react-dom/client'
import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RainbowKitProvider, getDefaultConfig } from '@rainbow-me/rainbowkit'
import { sepolia, baseSepolia } from 'wagmi/chains'
import { http } from 'wagmi'
import { defineChain } from 'viem'
import App from './App'
import './index.css'

const arcTestnet = defineChain({
  id: 2911,
  name: 'Arc Testnet',
  nativeCurrency: { name: 'USDC', symbol: 'USDC', decimals: 6 },
  rpcUrls: { default: { http: ['https://rpc.testnet.arc.network'] } },
  blockExplorers: { default: { name: 'ArcScan', url: 'https://testnet.arcscan.app' } },
})

const config = getDefaultConfig({
  appName: 'ARC Bridge',
  projectId: 'YOUR_WALLETCONNECT_PROJECT_ID',
  chains: [sepolia, baseSepolia, arcTestnet],
  transports: {
    [sepolia.id]: http(),
    [baseSepolia.id]: http(),
    [arcTestnet.id]: http(),
  },
})

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <App />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>,
)
