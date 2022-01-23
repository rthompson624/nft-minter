import React from "react";
import NftItem from "./contracts/NftItem.json";
import getWeb3 from "./getWeb3";
import "./App.css";

export default function App() {
  const [web3, setWeb3] = React.useState(null);
  const [accounts, setAccounts] = React.useState(null);
  const [nftItemContract, setNftItemContract] = React.useState(null);

  React.useEffect(() => {
    async function initializeApp() {
      try {
        // Get network provider and web3 instance.
        const web3Local = await getWeb3();
  
        // Use web3 to get the user's accounts.
        const accountsLocal = await web3Local.eth.getAccounts();
  
        // Get the contract instance.
        const networkId = await web3Local.eth.net.getId();
        const deployedNetwork = NftItem.networks[networkId];
        const nftItemContractLocal = new web3Local.eth.Contract(
          NftItem.abi,
          deployedNetwork && deployedNetwork.address,
        );

        // Set state variables
        setWeb3(web3Local);
        setNftItemContract(nftItemContractLocal);
        setAccounts(accountsLocal);
      } catch (error) {
        // Catch any errors for any of the above operations.
        alert(
          `Failed to load web3, accounts, or contract. Check console for details.`,
        );
        console.error(error);
      }  
    }

    initializeApp();
  });

  async function handleButtonClick() {
    const nftId = await nftItemContract.methods.createItem(accounts[0], 'myurl/is/bogus').send({ from: accounts[0] });
    console.log(nftId);
  }

  if (!web3) {
    return <div>Loading Web3, accounts, and contract...</div>;
  }
  return (
    <div className="App">
      <h1>Good to Go!</h1>
      <p>Your Truffle Box is installed and ready.</p>
      <h2>Mint an NFT!</h2>
      <button onClick={ () => handleButtonClick() }>Test</button>
    </div>
  );
}
