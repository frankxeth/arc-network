import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount, useChainId } from 'wagmi'
import { useState } from 'react'
import '@rainbow-me/rainbowkit/styles.css'

const CHAINS = [
  { id: 11155111, name: 'Ethereum Sepolia', logo: '🔷' },
  { id: 84532, name: 'Base Sepolia', logo: '🔵' },
  { id: 2911, name: 'Arc Testnet', logo: '⚡' },
]

const ArcLogo = () => (
  <svg width="36" height="36" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
    <rect width="200" height="200" rx="32" fill="#1a1f3a"/>
    <circle cx="100" cy="100" r="70" fill="#1e2548" stroke="#2a3060" strokeWidth="1"/>
    <path d="M 50 60 Q 100 20 150 60" fill="none" stroke="#3b82f6" strokeWidth="3.5" strokeLinecap="round"/>
    <path d="M 50 85 Q 100 45 150 85" fill="none" stroke="#6366f1" strokeWidth="2.5" strokeLinecap="round" opacity="0.7"/>
    <line x1="50" y1="60" x2="50" y2="130" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round"/>
    <line x1="150" y1="60" x2="150" y2="130" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round"/>
    <line x1="35" y1="130" x2="165" y2="130" stroke="#3b82f6" strokeWidth="3.5" strokeLinecap="round"/>
    <circle cx="50" cy="60" r="5" fill="#60a5fa"/>
    <circle cx="150" cy="60" r="5" fill="#60a5fa"/>
    <polygon points="100,65 88,95 97,95 85,135 112,90 103,90 115,65" fill="#a78bfa"/>
  </svg>
)

export default function App() {
  const { isConnected } = useAccount()
  const chainId = useChainId()
  const [amount, setAmount] = useState('')
  const [recipient, setRecipient] = useState('')
  const [destChain, setDestChain] = useState(2911)
  const [status, setStatus] = useState('')

  const fromChain = CHAINS.find(c => c.id === chainId)
  const toChains = CHAINS.filter(c => c.id !== chainId)

  return (
    <div style={{minHeight:'100vh',background:'linear-gradient(135deg,#0a0a0f 0%,#0d1117 50%,#0a0f1a 100%)',color:'white',fontFamily:'Inter,sans-serif'}}>
      <nav style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'20px 40px',borderBottom:'1px solid #1a2040',backdropFilter:'blur(10px)',position:'sticky',top:0,zIndex:100,background:'rgba(10,10,15,0.8)'}}>
        <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
          <ArcLogo />
          <span style={{fontWeight:700,fontSize:20,background:'linear-gradient(135deg,#3b82f6,#8b5cf6)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>ARC Bridge</span>
        </div>
        <ConnectButton />
      </nav>

      <div style={{textAlign:'center',padding:'80px 20px 40px'}}>
        <div style={{display:'inline-block',background:'rgba(59,130,246,0.1)',border:'1px solid rgba(59,130,246,0.3)',borderRadius:20,padding:'6px 16px',fontSize:12,color:'#3b82f6',marginBottom:20}}>
          Powered by Circle CCTP V2
        </div>
        <h1 style={{fontSize:'clamp(2rem,5vw,4rem)',fontWeight:800,margin:'0 0 16px',lineHeight:1.1}}>
          Bridge USDC<br/>
          <span style={{background:'linear-gradient(135deg,#3b82f6,#8b5cf6)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>Across Chains</span>
        </h1>
        <p style={{color:'#6b7280',fontSize:18,maxWidth:480,margin:'0 auto 40px'}}>
          Fast, secure cross-chain USDC transfers on ARC Testnet
        </p>

        <div style={{display:'flex',justifyContent:'center',gap:40,marginBottom:60,flexWrap:'wrap'}}>
          {[['$0 Fee','Gas sponsored'],['~20s','Transfer time'],['3 Chains','Supported']].map(([val,label])=>(
            <div key={label} style={{textAlign:'center'}}>
              <div style={{fontSize:24,fontWeight:700,color:'#3b82f6'}}>{val}</div>
              <div style={{fontSize:12,color:'#6b7280'}}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{maxWidth:480,margin:'0 auto',padding:'0 20px 80px'}}>
        <div style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:24,padding:28,backdropFilter:'blur(20px)'}}>
          {!isConnected ? (
            <div style={{textAlign:'center',padding:'40px 0'}}>
              <ArcLogo />
              <p style={{color:'#6b7280',margin:'16px 0 24px'}}>Connect wallet to start bridging</p>
              <ConnectButton />
            </div>
          ) : (
            <div style={{display:'flex',flexDirection:'column',gap:16}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <span style={{fontWeight:600,fontSize:18}}>Bridge USDC</span>
                <span style={{fontSize:12,color:'#6b7280',background:'rgba(59,130,246,0.1)',padding:'4px 10px',borderRadius:10,border:'1px solid rgba(59,130,246,0.2)'}}>Testnet</span>
              </div>

              <div style={{background:'rgba(255,255,255,0.03)',borderRadius:16,padding:16,border:'1px solid rgba(255,255,255,0.06)'}}>
                <div style={{fontSize:11,color:'#6b7280',marginBottom:8}}>FROM</div>
                <div style={{display:'flex',alignItems:'center',gap:8}}>
                  <span style={{fontSize:20}}>{fromChain?.logo || '🔗'}</span>
                  <span style={{fontWeight:500}}>{fromChain?.name || 'Unknown'}</span>
                </div>
              </div>

              <div style={{textAlign:'center',color:'#3b82f6',fontSize:20}}>↓</div>

              <div style={{background:'rgba(255,255,255,0.03)',borderRadius:16,padding:16,border:'1px solid rgba(255,255,255,0.06)'}}>
                <div style={{fontSize:11,color:'#6b7280',marginBottom:8}}>TO</div>
                <select value={destChain} onChange={e=>setDestChain(Number(e.target.value))} style={{background:'transparent',border:'none',color:'white',fontSize:16,fontWeight:500,outline:'none',width:'100%',cursor:'pointer'}}>
                  {toChains.map(c=>(
                    <option key={c.id} value={c.id} style={{background:'#1a1a2e'}}>{c.logo} {c.name}</option>
                  ))}
                </select>
              </div>

              <div style={{background:'rgba(255,255,255,0.03)',borderRadius:16,padding:16,border:'1px solid rgba(255,255,255,0.06)'}}>
                <div style={{fontSize:11,color:'#6b7280',marginBottom:8}}>AMOUNT (USDC)</div>
                <input type="number" placeholder="0.00" value={amount} onChange={e=>setAmount(e.target.value)} style={{background:'transparent',border:'none',color:'white',fontSize:24,fontWeight:600,outline:'none',width:'100%'}} />
              </div>

              <div style={{background:'rgba(255,255,255,0.03)',borderRadius:16,padding:16,border:'1px solid rgba(255,255,255,0.06)'}}>
                <div style={{fontSize:11,color:'#6b7280',marginBottom:8}}>RECIPIENT</div>
                <input type="text" placeholder="0x... (leave empty for self)" value={recipient} onChange={e=>setRecipient(e.target.value)} style={{background:'transparent',border:'none',color:'white',fontSize:14,outline:'none',width:'100%'}} />
              </div>

              {status && (
                <div style={{background:'rgba(59,130,246,0.1)',border:'1px solid rgba(59,130,246,0.3)',borderRadius:12,padding:12,fontSize:13,color:'#93c5fd'}}>
                  {status}
                </div>
              )}

              <button onClick={()=>setStatus('Bridge feature coming soon! Run via CLI: npx tsx index.ts')} style={{background:'linear-gradient(135deg,#3b82f6,#8b5cf6)',border:'none',borderRadius:16,padding:'16px',color:'white',fontWeight:700,fontSize:16,cursor:'pointer'}} onMouseOver={e=>(e.currentTarget.style.opacity='0.85')} onMouseOut={e=>(e.currentTarget.style.opacity='1')}>
                Bridge USDC →
              </button>

              <p style={{textAlign:'center',fontSize:12,color:'#4b5563'}}>
                Powered by Circle CCTP V2 • ARC Testnet
              </p>
            </div>
          )}
        </div>
      </div>

      <div style={{borderTop:'1px solid #1a2040',padding:'20px 40px',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:10}}>
        <div style={{display:'flex',alignItems:'center',gap:8}}>
          <ArcLogo />
          <span style={{color:'#4b5563',fontSize:13}}>© 2026 ARC Bridge</span>
        </div>
        <div style={{display:'flex',gap:20}}>
          {[['Explorer','https://testnet.arcscan.app'],['Faucet','https://faucet.circle.com'],['Docs','https://docs.arc.io']].map(([label,url])=>(
            <a key={label} href={url} target="_blank" rel="noreferrer" style={{color:'#6b7280',fontSize:13,textDecoration:'none'}}>{label}</a>
          ))}
        </div>
      </div>
    </div>
  )
}
