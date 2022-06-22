const { ethers } = require("ethers");
const Web3 = require("web3");
const Casino = artifacts.require("Casino");

var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

module.exports = async function (deployer) {
    var casino = await Casino.deployed();
    
    console.log(casino.address);

    await casino.withdrawAlltokens(web3.utils.toWei("100", "ether") )
};