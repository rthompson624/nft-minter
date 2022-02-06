import React from "react";
import NftItem from "./contracts/NftItem.json";
import getWeb3 from "./getWeb3";
import { delay } from "./utils";
import LoadingIndicator from "./components/LoadingIndicator";
import Navbar from "./components/Navbar";
import Summary from "./components/Summary";
import Filter from "./components/Filter";
import SearchSort from "./components/SearchSort";
import List from "./components/List";

export default function App() {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [nftRecords, setNftRecords] = React.useState([]);
  const [web3, setWeb3] = React.useState(null);
  const [accounts, setAccounts] = React.useState(null);
  const [nftItemContract, setNftItemContract] = React.useState(null);

  // Application load event
  React.useEffect(() => {
    initializeApp();
  }, []);

  async function initializeApp() {
    setLoading(true);
    await Promise.all([initializeWeb3(), getNftRecords()]);
    setLoading(false);
  }

  async function initializeWeb3() {
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
      setError(null);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(`Failed to load web3, accounts, or contract. Check console for details.`);
      console.error(error);
      setError(error);
    }  
  }

  async function getNftRecords() {
    // TODO: Remove delay when done testing
    await delay(2000);
    const response = await fetch ('/nft-db.json');
    if (response.ok) {
      const records = await response.json();
      setNftRecords(records);
      setError(null);
      console.log(records);
    } else {
      const errorMessage = `Error fetching NFT records. Status: ${response.status}. ${response.statusText}`;
      console.error(errorMessage);
      setError(errorMessage);
    }
  }

  async function mint() {
    const nftId = await nftItemContract.methods.createItem(accounts[0], 'myurl/is/bogus').send({ from: accounts[0] });
    console.log(nftId);
    const allNfts = await nftItemContract.methods.readNfts().call();
    console.log(JSON.stringify(allNfts));
    setError(null);
  }

  if (!web3) {
    return <div>Loading Web3, accounts, and contract...</div>;
  }
  return (
    <div>
      <LoadingIndicator loading={ loading } />
      <Navbar />
      <Summary
        onMint={ () => mint() }
      />
      <div className="flex flex-col sm:flex-row">
        <Filter />
        <div className="border-l-2 w-full p-4">
          <SearchSort />
          <List nftRecords={ nftRecords } />
        </div>
      </div>
    </div>
  );
}
