// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
pragma experimental ABIEncoderV2;


import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol";
import "./Flip.sol";
import "./library.sol";
import "./subscriptionManager.sol";
import "./IsubscriptionManager.sol";
import "@chainlink/contracts/src/v0.8/shared/interfaces/LinkTokenInterface.sol";



contract factory {
    LinkTokenInterface LINKTOKEN;


    address link_token_contract = 0x779877A7B0D9E8603169DdbD7836e478b4624789;


    IERC20 token;
    address public owner;
    uint256 initalBalance = 10000;
    uint64 public subscriptionId;
    subscriptionManager subscription;
    IsubscriptionManager GreeterContract;
    address public subscriptionAddress;

    constructor() {
        token = IERC20(0x7d0A0087543B8Dd1725B907bF523a5D7103adfB8);
        LINKTOKEN = LinkTokenInterface(link_token_contract);
        // initalBalance = msg.value;
        owner = msg.sender;
        subscription = new subscriptionManager();
        subscriptionAddress = address(subscription);
        GreeterContract = IsubscriptionManager(address(subscription));
        subscription.createNewSubscription();

    }

    modifier OnlyOwner() {
        require(msg.sender == owner);
        _;
    }

    event CoinFlipped(address indexed owner, coin.Coin newCoin, bool value);
    event CoinStreak(address indexed User, uint256 winStreak);


    function updateInitalBalance(uint256 amount)public OnlyOwner{
        require(token.allowance(msg.sender, address(this)) >= amount, "Not enough allowance");
        token.transferFrom(msg.sender, address(this), amount);
        initalBalance = initalBalance + amount;
        currentBalance = currentBalance + amount;
    }

    function GetUserTokenBalance(address user) public view returns(uint256){ 
       return token.balanceOf(user);
    }

    function GetAllowance() public view returns(uint256){
       return token.allowance(msg.sender, address(this));
    }

    Flip[] public UserArray;

    uint256 totalHouseFlips; 
    uint256 public currentBalance;
    uint256 public probLoseGivenWin = 20;
    // bool value;
    // uint256 public winStreak;

    enum Multiplier {One, Five, Ten}

    using coin for coin.Coin;
    coin.Coin public currentCoin;

    mapping(address => address) public userAddressToContractAddress;

    function createflips()public {
        GreeterContract.createflips();
        address contractaddress = getContractAddress();
        Flip userFlip = new Flip(address(msg.sender), contractaddress);
        UserArray.push(userFlip);
        userAddressToContractAddress[msg.sender] = address(userFlip);
    }

    function GetContractTokenBalance() public OnlyOwner returns(uint256){
        currentBalance = token.balanceOf(address(this));
        return currentBalance;
    }

    function changeProb() public {
        if(currentBalance < ((initalBalance * 60)/100)){
            probLoseGivenWin += 5;
        }
        if(currentBalance > ((initalBalance * 120)/100)){
            probLoseGivenWin = 20;
        }
    }

    function flipaCoin(Multiplier _multi, uint256 amount, coin.Coin _newCoin ) public returns(bool, uint256){
        require(amount > 0, "amount less than zero");
        require(currentBalance > amount, "current Balance is less than amount");
        currentCoin = _newCoin;
        address flipContract = userAddressToContractAddress[msg.sender];
        Flip flip  = Flip(flipContract);
        require(token.allowance(msg.sender, address(this)) >= amount, "Not enough allowance");
        token.transferFrom(msg.sender, address(this), amount);
        currentBalance = currentBalance + amount;
        bool value;
        uint256  winStreak;
        if(Multiplier.One == _multi){
            //call oneXwins
            (value, winStreak) = flip.oneXwins(currentCoin, probLoseGivenWin);
            if(value){
            require (token.balanceOf(address(this))>= amount);
            currentBalance = currentBalance - (2 * amount);
            token.transfer( msg.sender, (2 * amount));
            changeProb();
            }
        }
        if(Multiplier.Five == _multi){
            // call fiveXWins
            (value, winStreak) = flip.fiveXwins(currentCoin, probLoseGivenWin);
            if(value){
            require (token.balanceOf(address(this))>= amount);
            currentBalance = currentBalance - (5 * amount);
            token.transfer(msg.sender, (5 * amount));
            changeProb();
            }
        }
        if(Multiplier.Ten == _multi){
            // call tenXwins
            (value, winStreak) = flip.tenXwins(currentCoin, probLoseGivenWin);
            if(value){
            require (token.balanceOf(address(this))>= amount);
            currentBalance = currentBalance - (10 * amount);
            token.transfer(msg.sender, (10 * amount));
            changeProb();
            }
        }
        emit CoinFlipped(msg.sender, _newCoin, value);
        emit CoinStreak( msg.sender, winStreak);
        return (value, winStreak);
    }
    
    // call once a day
    function withdraw() external OnlyOwner {
        require(currentBalance > (initalBalance * 2), "balance is 200% of initalBalance");
        uint256 amount = ((currentBalance * 30)/100); //30% of currentBalance
        require(amount > 0);
        // (bool sent, ) = address(this).call{value: amount}("");
        token.transfer(owner, amount);
        // require(sent, "failed");
        initalBalance = initalBalance - amount;
    }  

    function withdrawAll() external OnlyOwner {
        uint256 amount = token.balanceOf(address(this));
        require(amount > 0, "balnace is 0");
        // (bool sent, ) = address(this).call{value: amount}("");
        token.transfer(owner, amount);
        // require(sent, "failed");
    }  

    // function setsubscriptionManager(address _t) public OnlyOwner {
    //     subscription = _t;
    // }

    function transferLinkTokens(uint256 amount) public {
        LINKTOKEN.transferFrom(msg.sender, subscriptionAddress, amount);
    }

    function topUpSubscription(uint256 amount) public {
        GreeterContract.topUpSubscription(amount);
    }

    function getsubscriptionId() public {
        subscriptionId = GreeterContract.getsubscriptionId();
    }

    function getContractAddress() public returns(address){
        address ContractAddress = GreeterContract.getContractAddress();
        return ContractAddress;
    }

    // function getOwnership() public OnlyOwner{
    //     GreeterContract.changeOwnership(msg.sender);
    // }

    function addConsumer(address consumerAddress) public  OnlyOwner{
        GreeterContract.addConsumer(consumerAddress);
    }

    function cancelSubscription(address receivingWallet) public {
        GreeterContract.cancelSubscription(receivingWallet);
    }

// transfer funds (link) to subscription contract
}   