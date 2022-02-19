const GroovyDudesToken = artifacts.require("./GroovyDudesToken.sol");

module.exports = async function(deployer, network, accounts) {
  await deployer.deploy(GroovyDudesToken);
};
