// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IsubscriptionManager {

    function createflips() external ;

    function createNewSubscription() external ;

    function addConsumer(address consumerAddress) external ;

    function removeConsumer(address consumerAddress) external ;
    
    function cancelSubscription(address receivingWallet) external ;      

    function topUpSubscription(uint256 amount) external ;     

    function getsubscriptionId() external returns(uint64) ;       

    function getContractAddress() external returns (address)  ; 

    function changeOwnership(address owner) external ;          
    
}