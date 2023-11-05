import { ethers } from "ethers";
import { messageBox } from "../service/message-service"
import { configuration } from '../config'

export const connectOnce = async () => {
    debugger;
    let provider = new ethers.providers.Web3Provider(window.ethereum)
    await provider.send("eth_requestAccounts", []);
    let signer = provider.getSigner();
    let network = await provider.getNetwork();
    let address = await signer.getAddress();
    return { chainId: network.chainId, address: address, provider, signer };
}
export const trying = async () => {
    const { chainId, address, provider, signer } = await connectOnce();
    const supported = configuration().chainId.toString();
    if (chainId == supported) {
        messageBox("success", "", 'chainId: ' + chainId + "      account: " + address.substring(0, 5) + "..")

        return { success: true, provider, signer };
    }
    messageBox("warning", "", 'chainId: ' + chainId + "      account: " + address.substring(0, 5) + "..")

    return { success: false };
}

export const connect = async () => {
    let { success } = await trying();
    if (success)
        return;
    const conf = configuration()
    await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: conf.params

    });
    await trying();
}

// export const connectAddress = async () => {
//     let provider = new ethers.providers.Web3Provider(window.ethereum)
//     let network = await provider.getNetwork();
//     const supported = configuration().chainId.toString();
//     if (network && network.chainId == supported) {
//         let signer = provider.getSigner();
//         let address = await signer.getAddress();
//         return address;
//     }
//     return null;
// }

export const connectAddress = async () => {
    try {
        // 确保 window.ethereum 存在
        if (!window.ethereum) {
            console.error('Ethereum provider not found');
            return null;
        }

        let provider = new ethers.providers.Web3Provider(window.ethereum);
        let network = await provider.getNetwork();

        // 将预期的链 ID 转换为十进制数字
        const supportedChainId = configuration().chainId;

        // 使用严格等于进行比较
        if (network && network.chainId === supportedChainId) {
            let signer = provider.getSigner();
            if (signer) {
                let address = await signer.getAddress();
                return address;
            }
        }
        console.warn(`Network chainId mismatch: expected ${supportedChainId}, got ${network ? network.chainId : 'unknown'}`);
    } catch (error) {
        console.error('Error connecting to address:', error);
    }

    return null;
};


