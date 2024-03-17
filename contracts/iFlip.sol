// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./library.sol";


interface IFlip {

    // function randomFlip(coin.Multiplier _multi, uint256 amount, coin.Coin _newCoin, address flipContract, uint256 requestId) external returns(bool, uint256) ; 

     function setRandomnumber(uint256[] memory _randomWords) external returns(uint256) ;

     function oneXcompute()external returns(bool, uint256);

     function fiveXcompute()external  returns(bool, uint256);
     
     function tenXcompute()external  returns(bool, uint256);
}