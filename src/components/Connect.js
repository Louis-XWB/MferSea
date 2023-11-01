import { ethers } from "ethers";
import { connect, connectAddress } from '../service/connection-service'

import 'react-notifications-component/dist/theme.css'
import { useEffect, useState } from "react";

function Connect() {

  const [address, setAddress] = useState('Connect Wallet');

  const connectWallet = async () => {
    await connect();
    getAddress();
  }

  useEffect(() => {
    getAddress();
  }, [])

  const getAddress = async () => {
    const addr = await connectAddress();
    if (addr)
      setAddress(addr.substring(0, 5) + "..");
    else
      setAddress('Connect Wallet');
  }

  return (
    <div>
      <a href="javascript:void(0);" onClick={connectWallet}>
        {address}
      </a>

    </div>
  )
}

export default Connect
