import logo from './logo.svg';
import './App.css';
import { ethers } from 'ethers';

import Lock from "./artifacts/contracts/Lock.sol/Lock.json"

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

  const readMessage = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    await provider.send("eth_requestAccounts", [])
    const lock = new ethers.Contract("0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",Lock.abi,provider)
    const message = await lock.message()
    alert(message)
  }

  const setMessage = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    await provider.send("eth_requestAccounts", [])
    const signer = provider.getSigner()
    const lock = new ethers.Contract("0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",Lock.abi,signer)
    const transaction = await lock.connect(signer).setMessage("New Hello World")
    const tx = await transaction.wait(1)
    debugger
    const event = tx.events[0]
    const value = event.args[0]

    let message = value.toString()
    alert(message)
  }

  return (
    <div className="App">
      <button onClick={connect}>Connect wallet</button>
      <button onClick={readMessage}>readMessage</button>
      <button onClick={setMessage}>setMessage</button>

    </div>
  );
}

export default App;
