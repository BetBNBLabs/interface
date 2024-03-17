// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import "./library.sol";

interface  Ichainlink {


    function requestRandomWords(uint8 variable)
        external
        returns (uint256 requestId); 


    function getRequestStatus(
        uint256 _requestId
        ) external view returns (bool fulfilled, uint256[] memory randomWords);
    
    function randomnumber(uint256[] memory _randomWords) external returns(uint256) ;
}