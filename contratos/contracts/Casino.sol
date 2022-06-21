// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
import "@openzeppelin/contracts/access/Ownable.sol";

contract Casino is Ownable {
  constructor (){
    
  }

  uint16 royality = 200; //Porcentaje al hacer el withdraw
  uint256 phantom_prize = 100000000000000000000;

  mapping(address => uint256) public address_Register;

  function buyTokens (uint256 tokens_Number) public payable returns(uint256) {
    //Comprovar el token number y precio del Phantom es correcto
    require((tokens_Number / phantom_prize) >= msg.value, "Error, you need to pay more for the tokens");

    address_Register[ msg.sender] = tokens_Number;
    return tokens_Number;

  }

  function withdrawAlltokens (uint256 tokens) public payable {
    require( address_Register[msg.sender] != 0 , "Error, you didn't buy tokens");
    uint256 feeAmount = (tokens * royality) / 10000;
    uint256 withdraw_value = tokens / phantom_prize;

    payable(msg.sender).transfer(withdraw_value-feeAmount);

  }




}