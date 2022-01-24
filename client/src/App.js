import React from "react";
import NftItem from "./contracts/NftItem.json";
import getWeb3 from "./getWeb3";

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
    const allNfts = await nftItemContract.methods.readNfts().call();
    console.log(JSON.stringify(allNfts));
  }

  if (!web3) {
    return <div>Loading Web3, accounts, and contract...</div>;
  }
  return (
    <div>
      <div className="h-1 bg-blue-500 sticky top-0 animate-pulse">Loading Indicator</div>
      <div className="h-16 shadow-md sticky top-1 bg-white text-center pt-4">Navbar</div>
      <div className="h-44 border-b-2 text-center pt-4">
        <div>Collection Stats & Description</div>
        <div className="pt-5">
          <div className="text-2xl font-mono font-bold">Let's Roll!</div>
          <button className="p-2 bg-blue-600 rounded-lg font-mono font-bold text-white mt-5 hover:bg-cyan-500" onClick={ () => handleButtonClick() }>Mint NFT</button>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row">
        <div className="sm:w-80 shrink-0 h-20">Filter</div>
        <div className="border-l-2 ">
          <div className="h-12">Search & Sort Controls</div>
          <div className="shrink pt-10 h-screen">NFT Cards</div>
        </div>
      </div>
    </div>
  );
}
