import logo from './logo.svg';
import './App.css';
import { ethers } from 'ethers';

function App() {
  const connect = async () => {
    // A Web3Provider wraps a standard Web3 provider, which is
    // what MetaMask injects as window.ethereum into each page
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    console.log(provider)

    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner()
    console.log(provider)

    const address = await signer.getAddress()
  }
  return (
    <div className="App">
      <button onClick={connect}>Connect wallet</button>
    </div>
  );
}

export default App;
