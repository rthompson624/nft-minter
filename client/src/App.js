import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GroovyDudesToken from "./contracts/GroovyDudesToken.json";
import getWeb3 from "./getWeb3";
import LoadingIndicator from "./components/LoadingIndicator";
import { initialFilter } from "./utils";
import Navbar from "./components/Navbar";
import BrowseCollection from "./components/BrowseCollection";
import NotFound from "./components/NotFound";

export default function App() {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [nftRecords, setNftRecords] = React.useState([]);
  const [viewableNftRecords, setViewableNftRecords] = React.useState([]);
  const [accounts, setAccounts] = React.useState(null);
  const [groovyDudesTokenContract, setGroovyDudesTokenContract] = React.useState(null);
  const [searchText, setSearchText] = React.useState(null);
  const [filter, setFilter] = React.useState(initialFilter);

  // Application load event
  React.useEffect(() => {
    initializeApp();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      setViewableNftRecords(records);
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
    setViewableNftRecords(prevRecords => {
      return prevRecords.map(record => {
        if (mintedIds.includes(record.id)) {
          return { ...record, minted: true };
        } else {
          return record;
        }
      });
    });
  }

  React.useEffect(() => {
    determineViewableRecords();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, searchText]);

  React.useEffect(() => {
    if (error) {
      console.log(error);
    }
  }, [error]);

  function determineViewableRecords() {
    // Determine filtered records
    let viewableRecords = JSON.parse(JSON.stringify(nftRecords));
    switch (filter.ownership) {
      case 'all':
        // Nothing to do
        break;
      case 'minted':
        viewableRecords = viewableRecords.filter(nft => nft.minted);
        break;
      case 'available':
        viewableRecords = viewableRecords.filter(nft => !nft.minted);
        break;
      default:
        console.log(`Invalid ownership value: ${filter.ownership}`);
        break;
    }
    filter.categories.forEach(category => {
      const selectedOptions = category.options.reduce((accum, option) => {
        return option.selected ? [...accum, option.name] : accum;
      }, []);
      if (selectedOptions.length > 0) {
        viewableRecords = viewableRecords.filter(nft => {
          const trait = nft.attributes.find(iter => iter.trait_type === category.name);
          return selectedOptions.includes(trait.value);
        }); 
      }
    });
    // Apply search to filtered records
    if (searchText) {
      viewableRecords = viewableRecords.filter(nft => nft.name.toLowerCase().includes(searchText));
    }
    setViewableNftRecords(viewableRecords);
  }

  return (
    <Router>
      <LoadingIndicator loading={ loading } />
      <Navbar />
        <Routes>
          <Route exact path="/" element={
            <BrowseCollection
              filter={ filter }
              setFilter={ setFilter }
              setSearchText={ setSearchText }
              viewableNftRecords={ viewableNftRecords }
              onMint={ (id) => mintNft(id) }
            />
          } />
          <Route path="*" element={
            <NotFound />
          } />
        </Routes>
    </Router>
  );
}
