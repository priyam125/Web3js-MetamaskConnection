import React, { useState } from "react";
import Web3 from "web3";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "./Button";

const ConnectToMetaMask = () => {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState("");
  const [balance, setBalance] = useState("");
  const [isConnected, setIsConnected] = useState(false);

  const connectToMetaMask = async () => {
    if (window.ethereum) {
      try {
        // Request account access
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const web3Instance = new Web3(window.ethereum);
        setWeb3(web3Instance);
        const accounts = await web3Instance.eth.getAccounts();
        setAccount(accounts[0]);
        const balance = await web3Instance.eth.getBalance(accounts[0]);
        // Convert balance from Wei to Ether
        const balanceInEther = web3Instance.utils.fromWei(balance, "ether");
        setBalance(balanceInEther);
        setIsConnected(true);
        toast.success("Metamask Connection Successful");
      } catch (error) {
        toast.error("User denied account access");
        console.error(error);
      }
    } else {
      toast.error("MetaMask extension not detected");
    }
  };

  const disconnectWallet = () => {
    setWeb3(null);
    setAccount("");
    setBalance("");
    setIsConnected(false);
  };

  return (
    <div className="">
      <ToastContainer />
      {!isConnected ? (
        <div className="relative">
          <Button handleClick={connectToMetaMask} label="Connect to MetaMask" />
        </div>
      ) : (
        <div className="gap-4 flex flex-col">
          <p className="font-bold text-xl">Connected account: {account}</p>
          <p className="font-bold text-xl">Balance: {balance} ETH</p>
          <Button handleClick={disconnectWallet} label="Disconnect" />
        </div>
      )}
    </div>
  );
};

export default ConnectToMetaMask;
