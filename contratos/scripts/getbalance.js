const { ethers } = require("ethers");
const Web3 = require("web3");
const Casino = artifacts.require("Casino");

var web3 = new ethers.providers.JsonRpcProvider(
  "https://rpc.testnet.fantom.network/"
);

module.exports = async function (deployer) {
  var casino = await Casino.deployed();

  console.log(casino.address);
  let balance = await web3.getBalance(casino.address);
  console.log(Web3.utils.fromWei(balance.toString(), "ether"));

  /* let tokens = await casino.address_Register("0xf1EB5b8DA4150Fb585e7Bb94a5708598e32D435c")
    console.log(Web3.utils.fromWei(tokens.toString(), "ether")); */
};
