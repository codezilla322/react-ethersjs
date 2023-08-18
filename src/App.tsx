import { ethers } from "ethers";
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [provider, setProvider] = useState<ethers.JsonRpcProvider | null>();
  const [toAddress, setToAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [signer, setSigner] = useState<ethers.JsonRpcSigner | null>(null);

  useEffect(() => {
    const initProvider = async () => {
      const rpcProvider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");
      setProvider(() => {
        const getSigner = async () => {
          const accounts = await rpcProvider.listAccounts();
          setSigner(accounts[0]);
        };
        getSigner();
        return rpcProvider;
      });
    };

    initProvider();
  }, []);

  const handleSend = async () => {
    if (signer) {
      const transactionRequest = {
        // to: "0x8bB369366F14400327b86812fb1C4fA910A62389",
        // value: "0x38D7EA4C68000",
        to: toAddress,
        value: amount,
      };
      const response = await signer?.sendTransaction(transactionRequest);
      const balance = await provider?.getBalance(signer?.address);
      console.log({ response, balance });
    }
  };

  return (
    <>
      <div className="card">
        <label>Address: </label>
        <input
          type="text"
          onChange={(e) => setToAddress(e.target.value)}
          size={50}
        />
        <br />
        <br />
        <label>Amount: </label>
        <input
          type="text"
          onChange={(e) => setAmount(e.target.value)}
          size={50}
        />
        <br />
        <br />
        <button onClick={() => handleSend()}>Send</button>
      </div>
    </>
  );
}

export default App;
