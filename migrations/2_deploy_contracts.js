const SimpleStorage = artifacts.require("./SimpleStorage.sol");
const NftItem = artifacts.require("./NftItem.sol");

module.exports = async function(deployer, network, accounts) {
  await deployer.deploy(SimpleStorage);
  await deployer.deploy(NftItem);
};
