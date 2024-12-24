import { createPublicClient, http } from 'viem'
import { mainnet } from 'viem/chains'
import './App.css'


const client = createPublicClient({ 
  chain: mainnet, 
  transport: http(), 
})


function App() {

  async function getBalance() {
    const res = await client.getBalance({address: "0x469C6ea7b9F9d4F135c6ee307a067E57565d1C93"})
    console.log(res);
    
  }



  return (
    <div>
      <button onClick={getBalance}>Get Balance</button>
    </div>
  )
}

export default App