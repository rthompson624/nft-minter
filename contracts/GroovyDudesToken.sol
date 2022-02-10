// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract GroovyDudesToken is ERC721, ERC721Enumerable, ERC721URIStorage, Ownable {
  constructor() ERC721("GroovyDudesToken", "GVY") {}

  function mintByUser(
    uint256 tokenId,
    address recipient
  ) public payable returns (uint256) {
    require(tokenId < 1000, 'Invalid token id. Valid range is 0 to 999.');
    require(!_exists(tokenId), 'Token has already been minted.');
    require (msg.value >= 0.05 ether, 'Minimum price is 0.05 ETH');

    string memory urlPrefix = 'ipfs://QmaqsKFMfofXVTxjNq9poAvFGodaXbE3zNqXkgPAYpPNoV/';
    string memory idString = Strings.toString(tokenId);
    string memory urlSuffix = '.json';
    string memory metadataURI = string(abi.encodePacked(urlPrefix, idString, urlSuffix));
    _mint(recipient, tokenId);
    _setTokenURI(tokenId, metadataURI);

    return tokenId;
  }

  // Code below generated by OpenZeppelin wizard
  // https://docs.openzeppelin.com/contracts/4.x/wizard

  function safeMint(address to, uint256 tokenId, string memory uri)
    public
    onlyOwner
  {
    _safeMint(to, tokenId);
    _setTokenURI(tokenId, uri);
  }

  // The following functions are overrides required by Solidity.

  function _beforeTokenTransfer(address from, address to, uint256 tokenId)
    internal
    override(ERC721, ERC721Enumerable)
  {
    super._beforeTokenTransfer(from, to, tokenId);
  }

  function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
    super._burn(tokenId);
  }

  function tokenURI(uint256 tokenId)
    public
    view
    override(ERC721, ERC721URIStorage)
    returns (string memory)
  {
    return super.tokenURI(tokenId);
  }

  function supportsInterface(bytes4 interfaceId)
    public
    view
    override(ERC721, ERC721Enumerable)
    returns (bool)
  {
    return super.supportsInterface(interfaceId);
  }

}