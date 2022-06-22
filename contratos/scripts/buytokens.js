const { ethers } = require("ethers");
const web3 = require("web3");
const Casino = artifacts.require("Casino");

module.exports = async function (deployer) {
    var casino = await Casino.deployed();
    console.log(casino.address);
    await casino.buyTokens(web3.utils.toWei("1000", "ether"), {value: web3.utils.toWei("10", "ether")})

};
