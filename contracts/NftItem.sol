// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract NftItem is ERC721URIStorage {
  using Counters for Counters.Counter;

  struct MintedNft {
    uint256 tokenId;
    address creator;
    string tokenURI;
  }

  MintedNft[] private mintedNfts;
  Counters.Counter private _tokenIds;

  constructor() ERC721("NftItem", "NFT") {}

  function createItem(address creator, string memory tokenURI) public returns (uint256) {
    _tokenIds.increment();
    uint256 newItemId = _tokenIds.current();
    _mint(creator, newItemId);
    _setTokenURI(newItemId, tokenURI);
    mintedNfts.push(MintedNft({
      tokenId: newItemId,
      creator: creator,
      tokenURI: tokenURI
    }));
    return newItemId;
  }

  function readNfts() public view returns (MintedNft[] memory) {
    return mintedNfts;
  }

}
