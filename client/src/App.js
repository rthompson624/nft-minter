import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GroovyDudesToken from "./contracts/GroovyDudesToken.json";
import getWeb3 from "./getWeb3";
import LoadingIndicator from "./components/LoadingIndicator";
import { initialFilter } from "./utils";
import Navbar from "./components/Navbar";
import CollectionBrowser from "./components/CollectionBrowser";
import NotFound from "./components/NotFound";
import NftViewer from "./components/NftViewer";
import Admin from "./components/Admin";
import AdminGaurd from "./components/AdminGuard";
import Toast from "./components/Toast";
import ModalSpinner from "./components/ModalSpinner";

export default function App() {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [nftRecords, setNftRecords] = React.useState([]);
  const [viewableNftRecords, setViewableNftRecords] = React.useState([]);
  const [account, setAccount] = React.useState(null);
  const [groovyDudesTokenContract, setGroovyDudesTokenContract] = React.useState(null);
  const [searchText, setSearchText] = React.useState(null);
  const [filter, setFilter] = React.useState(initialFilter);
  const [isOwner, setIsOwner] = React.useState(false);
  const [toastMessage, setToastMessage] = React.useState({ type: null, message: null });
  const [spinnerConfig, setSpinnerConfig] = React.useState({ show: false, message: null });

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
      const accountLocal = accountsLocal ? accountsLocal[0] : null;

      // Get the contract instance.
      const networkId = await web3Local.eth.net.getId();
      const deployedNetwork = GroovyDudesToken.networks[networkId];
      const groovyDudesTokenContractInstance = new web3Local.eth.Contract(
        GroovyDudesToken.abi,
        deployedNetwork && deployedNetwork.address,
      );

      // Set state variables
      const owner = await groovyDudesTokenContractInstance.methods.owner().call();
      setIsOwner(accountLocal === owner);
      setGroovyDudesTokenContract(groovyDudesTokenContractInstance);
      setAccount(accountLocal);
      markMintedNfts(groovyDudesTokenContractInstance);
    } catch (error) {
      console.error(error);
      setError('Could not connect to the blockchain. Check that MetaMask is installed on your browser, and that it is connected to the Rinkeby Test Network.');
    }  
  }

  async function getNftRecords() {
    const response = await fetch ('/nft-db.json');
    if (response.ok) {
      const records = await response.json();
      setNftRecords(records);
      setViewableNftRecords(records);
    } else {
      const errorMessage = `Error fetching NFT records. Status: ${response.status}. ${response.statusText}`;
      setError(errorMessage);
    }
  }

  async function mintNft(id) {
    setSpinnerConfig({ show: true, message: 'Minting your dude' });
    try {
      await groovyDudesTokenContract.methods.mintByUser(id, account).send({ from: account, value: 50000000000000000 });
      await markMintedNfts(groovyDudesTokenContract);
      setSpinnerConfig({ show: false, message: null });
      const nft = nftRecords.find(iter => iter.id === id);
      setToastMessage({ type: 'success', message: `${nft.name} is now yours!`});
    } catch (error) {
      setSpinnerConfig({ show: false, message: null });
      console.error(error);
      setError('Failed to mint your dude. Please check console for details.');
    }
  }

  async function markMintedNfts(contract) {
    const mintedIds = [];
    const tokenOwnerMap = {};
    const count = await contract.methods.totalSupply().call();
    for (let i = 0; i < count; i++) {
      const tokenId = await contract.methods.tokenByIndex(i).call();
      const ownerAddress = await contract.methods.ownerOf(tokenId).call();
      tokenOwnerMap[tokenId.toString()] = ownerAddress;
      mintedIds.push(parseInt(tokenId, 10));
    }
    setNftRecords(prevRecords => {
      return prevRecords.map(record => setOwnershipFields(record, mintedIds, tokenOwnerMap));
    });
    setViewableNftRecords(prevRecords => {
      return prevRecords.map(record => setOwnershipFields(record, mintedIds, tokenOwnerMap));
    });
  }

  function setOwnershipFields(record, mintedIds, tokenOwnerMap) {
    const updatedRecord = { ...record };
    updatedRecord.minted = mintedIds.includes(record.id);
    updatedRecord.owner = updatedRecord.minted ? tokenOwnerMap[record.id.toString()] : null;
    return updatedRecord;
  }

  React.useEffect(() => {
    determineViewableRecords();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, searchText]);

  React.useEffect(() => {
    if (error) {
      setToastMessage({ type: 'error', message: error });
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
      case 'user':
        viewableRecords = viewableRecords.filter(nft => nft.owner === account);
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
      <Navbar isOwner={ isOwner } />
      <Routes>
        <Route exact path="/" element={
          <CollectionBrowser
            filter={ filter }
            setFilter={ setFilter }
            setSearchText={ setSearchText }
            viewableNftRecords={ viewableNftRecords }
            onMint={ (id) => mintNft(id) }
          />
        } />
        <Route exact path="/nft/:id" element={
          <NftViewer
            nftRecords={ nftRecords }
            onMint={ (id) => mintNft(id) }
          />
        } />
        <Route exact path="/admin" element={
          <AdminGaurd isOwner={ isOwner }>
            <Admin
              groovyDudesTokenContract={ groovyDudesTokenContract }
              account={ account }
              setToastMessage={ setToastMessage }
              setSpinnerConfig={ setSpinnerConfig }
              setError={ setError }
            />
          </AdminGaurd>
        } />
        <Route path="*" element={ <NotFound /> } />
      </Routes>
      <Toast
        toastMessage = { toastMessage }
        setToastMessage={ setToastMessage }
      />
      <ModalSpinner
        spinnerConfig={ spinnerConfig }
      />
    </Router>
  );
}
