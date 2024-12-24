import { http, createConfig, WagmiProvider, useConnect } from 'wagmi'
import { mainnet, base } from 'wagmi/chains'
import { injected, walletConnect, metaMask, safe } from 'wagmi/connectors'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'



const queryClient = new QueryClient()

export const config = createConfig({
  chains: [mainnet, base],
  connectors: [
    injected(),
    metaMask(),
    safe(),
  ],
  transports: {
    [mainnet.id]: http(),
  },
})

function App() {
  

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <WalletConnector />
        <EthSend />
      </QueryClientProvider>
    </WagmiProvider>
  )
}

function WalletConnector() {
  const { connectors, connect } = useConnect()

  //connectors is an array of all the connectors that are available to connect to the app
  //[{name: "MetaMask", uid: "metamask"}, {name: "Coinbase", uid: "coinbase"}]
  return connectors.map((connector) => (
    <button key={connector.uid} onClick={() => connect({ connector })}>
      {connector.name}
    </button>
  ))
}

function EthSend() {
  return <div>
    <input type="text" placeholder="Address"></input>
    <button>Send 0.1 ETH</button> 
  </div>

}

export default App
