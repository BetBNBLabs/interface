// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./library.sol";

interface IflipFactory {


    function finalCompute(bool _value, uint256 _amount, uint256 winStreak, uint8 variable, address owner )external  returns(bool, uint256) ;
}
