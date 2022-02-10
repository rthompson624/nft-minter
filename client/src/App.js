import React from "react";
import GroovyDudesToken from "./contracts/GroovyDudesToken.json";
import getWeb3 from "./getWeb3";
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
  const [groovyDudesTokenContract, setGroovyDudesTokenContract] = React.useState(null);

  // Application load event
  React.useEffect(() => {
    initializeApp();
  }, []);

  async function initializeApp() {
    setLoading(true);
    await getNftRecords();
    await initializeWeb3();
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
      const deployedNetwork = GroovyDudesToken.networks[networkId];
      const groovyDudesTokenContractInstance = new web3Local.eth.Contract(
        GroovyDudesToken.abi,
        deployedNetwork && deployedNetwork.address,
      );

      // Set state variables
      setWeb3(web3Local);
      setGroovyDudesTokenContract(groovyDudesTokenContractInstance);
      setAccounts(accountsLocal);
      setError(null);
      markMintedNfts(groovyDudesTokenContractInstance);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(`Failed to load web3, accounts, or contract. Check console for details.`);
      console.error(error);
      setError(error);
    }  
  }

  async function getNftRecords() {
    const response = await fetch ('/nft-db.json');
    if (response.ok) {
      const records = await response.json();
      setNftRecords(records);
      setError(null);
    } else {
      const errorMessage = `Error fetching NFT records. Status: ${response.status}. ${response.statusText}`;
      console.error(errorMessage);
      setError(errorMessage);
    }
  }

  async function mintNft(id) {
    await groovyDudesTokenContract.methods.mintByUser(id, accounts[0]).send({ from: accounts[0], value: 50000000000000000 });
    setError(null);
    await markMintedNfts(groovyDudesTokenContract);
  }

  async function markMintedNfts(contract) {
    const mintedIds = [];
    const count = await contract.methods.totalSupply().call();
    for (let i = 0; i < count; i++) {
      const tokenId = await contract.methods.tokenByIndex(i).call();
      mintedIds.push(parseInt(tokenId), 10);
    }
    setNftRecords(prevRecords => {
      return prevRecords.map(record => {
        if (mintedIds.includes(record.id)) {
          return { ...record, minted: true };
        } else {
          return record;
        }
      });
    });
  }

  return (
    <div>
      <LoadingIndicator loading={ loading } />
      <Navbar />
      <Summary />
      <div className="flex flex-col sm:flex-row">
        <Filter />
        <div className="border-l-2 w-full p-4">
          <SearchSort />
          <List nftRecords={ nftRecords } onMint={ (id) => mintNft(id) } />
        </div>
      </div>
    </div>
  );
}
