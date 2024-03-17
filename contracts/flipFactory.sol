// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
pragma experimental ABIEncoderV2;


import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol";
import "./Flip.sol";
import "./library.sol";
import "./subscriptionManager.sol";
import "./IsubscriptionManager.sol";
import "@chainlink/contracts/src/v0.8/shared/interfaces/LinkTokenInterface.sol";
import "./Ichainlink.sol";



contract factory {
    LinkTokenInterface LINKTOKEN;


    address link_token_contract = 0x84b9B910527Ad5C03A9Ca831909E21e236EA7b06;

// 3000000000000000000
    IERC20 token;
    address public owner;
    uint256 initalBalance = 10000;
    uint64 public subscriptionId;
    subscriptionManager subscription;
    IsubscriptionManager subscriptionContract;
    address public subscriptionAddress;

    Ichainlink chainkContract;

    constructor() {
        token = IERC20(0x91E714f998B1AAe75b133E0467b5FAA2783f5D0A);
        LINKTOKEN = LinkTokenInterface(link_token_contract);
        // initalBalance = msg.value;
        owner = msg.sender;
        subscription = new subscriptionManager(factoryAddress);
        subscriptionAddress = address(subscription);
        subscriptionContract = IsubscriptionManager(address(subscription));
        subscription.createNewSubscription();
        getsubscriptionId();

    }

    modifier OnlyOwner() {
        require(msg.sender == owner);
        _;
    }

    event CoinFlipped(address indexed owner, coin.Coin newCoin);
    event CoinStreak(address indexed User, uint256 winStreak, bool value);


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

    // enum Multiplier {One, Five, Ten}

    using coin for coin.Coin;
    coin.Coin public currentCoin;

    using coin for coin.Multiplier;

    mapping(address => address) public userAddressToContractAddress;
    mapping(address => address) public userAddressToChainlinkContractAddress;

    function createflips()public {
        address chainlinkContractAddress = subscriptionContract.createflips();
        userAddressToChainlinkContractAddress[msg.sender] = chainlinkContractAddress;
        address chainlinkContractaddress = getChainlinkContractAddress();
        Flip userFlip = new Flip(address(msg.sender), chainlinkContractaddress, address(this));
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

    function flipACoin(coin.Multiplier _multi, uint256 amount, coin.Coin _newCoin ) public /*returns(bool, uint256)*/{
        require(amount > 0, "amount less than zero");
        require(currentBalance > amount, "current Balance is less than amount");
        currentCoin = _newCoin;
        address flipContract = userAddressToContractAddress[msg.sender];
        Flip flip  = Flip(flipContract);
        require(token.allowance(msg.sender, address(this)) >= amount, "Not enough allowance");
        token.transferFrom(msg.sender, address(this), amount);
        currentBalance = currentBalance + amount;
        // address chainlinkcontract = userAddressToChainlinkContractAddress[msg.sender];
        // chainkContract = Ichainlink(address(chainlinkcontract));
        // getRequestRandomWords(_multi, amount, _newCoin, flipContract);
        // chainkContract.requestRandomWords();
        if(coin.Multiplier.One == _multi){
            //call oneXwins
            /*(value, winStreak) =*/ flip.oneXwins(_newCoin, probLoseGivenWin, amount);
            // if(value){
            // require (token.balanceOf(factoryAddress)>= amount);
            // currentBalance = currentBalance - (2 * amount);
            // token.transfer(msg.sender, (2 * amount));
            // changeProb();
            // }
        }
        if(coin.Multiplier.Five == _multi){
            // call fiveXWins
           /*(value, winStreak) =*/ flip.fiveXwins(_newCoin, probLoseGivenWin, amount);
            // if(value){
            // require (token.balanceOf(factoryAddress)>= amount);
            // currentBalance = currentBalance - (5 * amount);
            // token.transfer(msg.sender, (5 * amount));
            // changeProb();
            // }
        }
        if(coin.Multiplier.Ten == _multi){
            // call tenXwins
            /*(value, winStreak) =*/ flip.tenXwins(_newCoin, probLoseGivenWin, amount);
            // if(value){
            // require (token.balanceOf(factoryAddress)>= amount);
            // currentBalance = currentBalance - (10 * amount);
            // token.transfer(msg.sender, (10 * amount));
            // changeProb();
            // }
        }
        emit CoinFlipped(msg.sender, _newCoin);
        // emit CoinStreak( msg.sender, winStreak);
        // return (value, winStreak);
    }

    function finalCompute(bool _value, uint256 _amount, uint256 winStreak, uint8 _variable, address _owner)public returns(bool, uint256){
        bool value = _value;
        uint256 amount = _amount;
        if(value == true){
        if(_variable == 1){
            require (token.balanceOf(factoryAddress)>= amount);
            currentBalance = currentBalance - (2 * amount);
            token.transfer(_owner, (2 * amount));
            changeProb();
            }

            if(_variable == 5){
            require (token.balanceOf(factoryAddress)>= amount);
            currentBalance = currentBalance - (5 * amount);
            token.transfer(msg.sender, (5 * amount));
            changeProb();
            }

            if(_variable == 10){
            require (token.balanceOf(factoryAddress)>= amount);
            currentBalance = currentBalance - (10 * amount);
            token.transfer(msg.sender, (10 * amount));
            changeProb();
            }
        }

        emit CoinStreak( msg.sender, winStreak, value);
        return (value, winStreak) ;
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
        subscriptionContract.topUpSubscription(amount);
    }

    function getsubscriptionId() public {
        subscriptionId = subscriptionContract.getsubscriptionId();
    }

    function getChainlinkContractAddress() public returns(address){
        address ContractAddress = subscriptionContract.getContractAddress();
        return ContractAddress;
    }

    // function getOwnership() public OnlyOwner{
    //     subscriptionContract.changeOwnership(msg.sender);
    // }

    function addConsumer(address consumerAddress) public  OnlyOwner{
        subscriptionContract.addConsumer(consumerAddress);
    }

    function cancelSubscription(address receivingWallet) public {
        subscriptionContract.cancelSubscription(receivingWallet);
    }

    // function getRequestRandomWords() public{
    //     // chainlinkVRF flip  = chainlinkVRF(chainlink);
    //     chainkContract.requestRandomWords();
    // }

// transfer funds (link) to subscription contract

    // function factoryAddress() public returns(address) {
    //     return (address(this));
    // }

    address public factoryAddress = address(this);
    uint256 public hievk;
    function randomnumber(uint256[] memory _randomWords) public returns(uint256) {
        hievk = _randomWords[0];
        return hievk;
    }
}   