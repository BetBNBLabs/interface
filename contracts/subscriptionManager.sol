// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@chainlink/contracts/src/v0.8/shared/interfaces/LinkTokenInterface.sol";
import "@chainlink/contracts/src/v0.8/interfaces/VRFCoordinatorV2Interface.sol";
import "@chainlink/contracts/src/v0.8/vrf/VRFConsumerBaseV2.sol";
import "./chainlinkVRF.sol";


contract subscriptionManager is VRFConsumerBaseV2 {
    VRFCoordinatorV2Interface COORDINATOR;
    LinkTokenInterface LINKTOKEN;

    address vrfCoordinator = 0x6A2AAd07396B36Fe02a22b33cf443582f682c82f;

    address link_token_contract = 0x84b9B910527Ad5C03A9Ca831909E21e236EA7b06;

    bytes32 keyHash = 0xd4bb89654db74673a187bd804519e65e3f71a52bc55f11da7601a13dcf505314;

    uint32 callbackGasLimit = 2500000;

    uint16 requestConfirmations = 3;

    uint32 numWords = 1;

    // Storage parameters
    uint256[] public s_randomWords;
    uint256 public s_requestId;
    uint64 public s_subscriptionId;
    address public s_owner;
    address public latestContract;
    address public factoryAddress;

    chainlinkVRF[] public UserArray;

    // mapping(address => address) public userAddressToContractAddress;

    constructor(address _factoryAddress) VRFConsumerBaseV2(vrfCoordinator) {
        COORDINATOR = VRFCoordinatorV2Interface(vrfCoordinator);
        LINKTOKEN = LinkTokenInterface(link_token_contract);
        s_owner = msg.sender;
        //Create a new subscription when you deploy the contract.
        createNewSubscription();
        factoryAddress = _factoryAddress;
    }

    function createflips()public returns (address){
        chainlinkVRF userRoll = new chainlinkVRF(s_subscriptionId, factoryAddress);
        UserArray.push(userRoll);
        latestContract = address(userRoll);
        // userAddressToContractAddress[msg.sender] = address(userRoll);
        addConsumer(address(userRoll));

        return address(userRoll);
    }

    // Assumes the subscription is funded sufficiently.
    function requestRandomWords() external {
        // Will revert if subscription is not set and funded.
        s_requestId = COORDINATOR.requestRandomWords(
            keyHash,
            s_subscriptionId,
            requestConfirmations,
            callbackGasLimit,
            numWords
        );
    }

    function fulfillRandomWords(
        uint256 /* requestId */,
        uint256[] memory randomWords
    ) internal override {
        s_randomWords = randomWords;
    }

    // Create a new subscription when the contract is initially deployed.
    function createNewSubscription() public onlyOwner {
        s_subscriptionId = COORDINATOR.createSubscription();
        // Add this contract as a consumer of its own subscription.
        COORDINATOR.addConsumer(s_subscriptionId, address(this));
    }

    // Assumes this contract owns link.
    // 1000000000000000000 = 1 LINK
    function topUpSubscription(uint256 amount) external onlyOwner {
        LINKTOKEN.transferAndCall(
            address(COORDINATOR),
            amount,
            abi.encode(s_subscriptionId)
        );
    }


    function addConsumer(address consumerAddress) public onlyOwner {
        // Add a consumer contract to the subscription.
        COORDINATOR.addConsumer(s_subscriptionId, consumerAddress);
    }

    function removeConsumer(address consumerAddress) external onlyOwner {
        // Remove a consumer contract from the subscription.
        COORDINATOR.removeConsumer(s_subscriptionId, consumerAddress);
    }

    function cancelSubscription(address receivingWallet) external onlyOwner {
        // Cancel the subscription and send the remaining LINK to a wallet address.
        COORDINATOR.cancelSubscription(s_subscriptionId, receivingWallet);
        s_subscriptionId = 0;
    }

    // Transfer this contract's funds to an address.
    // 1000000000000000000 = 1 LINK
    function withdraw(uint256 amount, address to) external onlyOwner {
        LINKTOKEN.transfer(to, amount);
    }

    modifier onlyOwner() {
        require(msg.sender == s_owner);
        _;
    }

    function getsubscriptionId() public view returns(uint64){
       return s_subscriptionId;
    }

    function getContractAddress() public view returns(address){
            return latestContract;
    }

    function changeOwnership(address owner) public {
        s_owner = owner;
    }
    
}


// Assumes this contract owns link
// You must estimate LINK cost yourself based on the gas lane and limits.
// 1_000_000_000_000_000_000 = 1 LINK
// function fundAndRequestRandomWords(uint256 amount) external onlyOwner {
//     LINKTOKEN.transferAndCall(
//         address(COORDINATOR),
//         amount,
//         abi.encode(s_subscriptionId)
//     );
//     // Will revert if subscription is not set and funded.
//     s_requestId = COORDINATOR.requestRandomWords(
//         keyHash,
//         s_subscriptionId,
//         requestConfirmations,
//         callbackGasLimit,
//         numWords
//     );
// }
//0x2539D6b4114548583EBc9e1CEF882298c47DCf7d
//0x127205Ee19222D6675200D075bD7FE3AA512cA46
//0xbf0470dd00d764418c0aadb6a42049d3ec5e2afa
// 0xe75667f3a8a65c909f24277f8dc38a2d069ca53e
