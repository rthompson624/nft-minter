import React from "react";
import NftItem from "./contracts/NftItem.json";
import getWeb3 from "./getWeb3";
import LoadingIndicator from "./components/LoadingIndicator";
import Navbar from "./components/Navbar";
import Summary from "./components/Summary";
import Filter from "./components/Filter";
import SearchSort from "./components/SearchSort";
import List from "./components/List";

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

  async function mint() {
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
      <LoadingIndicator />
      <Navbar />
      <Summary
        onMint={ () => mint() }
      />
      <div className="flex flex-col sm:flex-row">
        <Filter />
        <div className="border-l-2 w-full p-4">
          <SearchSort />
          <List />
        </div>
      </div>
    </div>
  );
}
