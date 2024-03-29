// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "./library.sol";
import "./Ichainlink.sol";
import "./IflipFactory.sol";

contract Flip {

    address owner;
    address public chainlink;
    Ichainlink GreeterContract; 

    address public factoryContractAddress;
    IflipFactory FlipFactory;

    // 0xC83BF0315121E03544Fc71589EfA2BAc1334A6d1
    // 0x97d3fDf05741AaF69A49A819E21A0eEfc5B95A01

    constructor(address user,
     address _chainlinkContractAddress,
     address _factoryContractAddress
    ){
        owner = user;

        chainlink = _chainlinkContractAddress;
        GreeterContract = Ichainlink(address(chainlink));

        factoryContractAddress = _factoryContractAddress;
        FlipFactory = IflipFactory(address(factoryContractAddress));
    }



    uint256 public probWin = 500;
    uint256 public probLose = 1000 - probWin;
    uint256 public probLoseGivenWin; // Initial conditional probability factor
    uint256 public looseCount = 0;
    uint256 public winCount = 0;
    bool[] public streakArray;
    uint256 public requestId;
    
    // State variable to store the current coin value
    // Event emitted when the coin value is updated
    // event CoinFlipped(address indexed owner, coin.Coin newCoin, coin.Coin currentCoin);
    // event CoinLanded(address indexed User, uint256 winStreak);

    using coin for coin.Coin;
    coin.Coin public currentCoin;

    mapping(address => uint256) public usertoWinCount;
    mapping(address => uint256) public usertoLooseCount;

    function currentWinStreak() public view returns (uint256) {
        uint256 winStreak = 0; // Start with no win streak

        for (uint256 i = streakArray.length - 1; i >= 0; i--) { // Iterate backwards through flips
            if (streakArray[i]) { // If it's a win (heads), increment streak
                winStreak++;
            } else { // If it's a loss (tails), break and return current streak
                break;
            }
        }
        return winStreak;
    }

    function sudoProbability() public view returns (uint256) {
        // bytes32 hash = keccak256(abi.encodePacked(block.number, block.timestamp, 
        // blockhash(block.number - 1),probWin, probLose, looseCount, winCount, owner));
        // bool value;
        // uint256[] memory resultt;
        // (value, resultt) = getGetRequestStatus();
        // uint256 hash = resultt[0];
        // Convert the hash to a uint8 value (0 or 1)
        uint256 hash= updateHash();
        uint8 result = uint8(uint256(hash)) % 2;
        uint256 prob_Win = probWin;
        uint256 prob_Lose = 1000 - prob_Win;
        if (result == uint256(currentCoin)) {
                // Player wins
                prob_Lose = prob_Lose + (prob_Win * probLoseGivenWin)/100;
                prob_Win = 1000 - prob_Lose;
        } else {
                // Player loses
                prob_Win = prob_Win + (prob_Lose * probLoseGivenWin)/100;
                prob_Lose = 1000 - prob_Win;
            }

        // emit CoinFlipped(owner, currentCoin);
        return prob_Win;
    }

    // Function to get the current coin value
    function getCurrentCoin() external view returns (coin.Coin) {
        return currentCoin;
    }

    // Function to generate a pseudo-random floating-point number between 0 to 100
    function generateRandomFloat() public view returns (uint256) {
        // bytes32 hash = keccak256(abi.encodePacked(block.number, block.timestamp, 
        // blockhash(block.number - 1),probWin, probLose, looseCount, winCount, owner));
        //  bool value;
        // uint256[] memory resultt;
        // (value, resultt) = getGetRequestStatus();
        // uint256 hash = resultt[0];
        // Convert the hash to a uint256 value and normalize it to be between 0 and 1
        uint256 hash= updateHash();
        uint256 randomNumber = uint256(hash) % 1000000;
        uint256 randomFloat = uint256(randomNumber) / 1000;
        return randomFloat;
    }
    uint256 public amount;
    uint8 public variable;
    function oneXwins(coin.Coin _newCoin, uint256 prob_LoseGivenWin, uint256 _amount) public {
        currentCoin = _newCoin;
        probLoseGivenWin = prob_LoseGivenWin;
        amount =  _amount;
        variable = 1;
        oneXcompute();
        getRequestRandomWords(variable);
    }

    function oneXcompute()public returns(bool, uint256){
        uint256 psudoWinProb = sudoProbability();
        uint256 actualProb = generateRandomFloat();
        bool results = actualProb < psudoWinProb;
        streakArray.push(results);
        uint256 winStreak = currentWinStreak();
        if(results == true){
            // Player wins
            probLose = probLose + (probWin * probLoseGivenWin)/100;
            probWin = 1000 - probLose;
            usertoWinCount[owner] = winCount++;
            // uint256 winAmount = amount + amount;
            // payable(msg.sender).transfer(winAmount);

            // Adjust conditional probability factor for winning
            // prob_LoseGivenWin += 5; // You can adjust this value based on your desired dynamics
        } else {
            // Player loses
            probWin = probWin + (probLose * probLoseGivenWin)/100;
            probLose = 1000 - probWin;
            // Reset conditional probability factor for losing
            // prob_LoseGivenWin = 20;
            usertoWinCount[owner] = looseCount++;
        }
        // currentWinStreak();
        FlipFactory.finalCompute(results, amount, winStreak, variable, owner);
        return (results,winStreak) ;
    }
    
    function fiveXwins(coin.Coin _newCoin, uint256 prob_LoseGivenWin, uint256 _amount) public {
        currentCoin = _newCoin;
        probLoseGivenWin = prob_LoseGivenWin;
        amount =  _amount;
        variable = 5;
        fiveXcompute();
        getRequestRandomWords(variable);
    }

    function fiveXcompute()public returns(bool, uint256){
        uint256 psudoWinProb = (sudoProbability()/5);
        uint256 actualProb = generateRandomFloat();
        bool results = actualProb < psudoWinProb;
        streakArray.push(results);
        uint256 winStreak = currentWinStreak();
        if(results){
            // Player wins
            probLose = probLose + (probWin * probLoseGivenWin)/100;
            probWin = 1000 - probLose;
            usertoWinCount[owner] = winCount++;
            // uint256 winAmount = amount + amount;
            // payable(msg.sender).transfer(winAmount);

            // Adjust conditional probability factor for winning
            // prob_LoseGivenWin += 5; // You can adjust this value based on your desired dynamics
        } else {
            // Player loses
            probWin = probWin + (probLose * probLoseGivenWin)/100;
            probLose = 1000 - probWin;
            // Reset conditional probability factor for losing
            // prob_LoseGivenWin = 20;
            usertoWinCount[owner] = looseCount++;

        }
        FlipFactory.finalCompute(results, amount, winStreak, variable, owner);
        return (results,winStreak);
    }

    function tenXwins(coin.Coin _newCoin, uint256 prob_LoseGivenWin, uint256 _amount) public {
        currentCoin = _newCoin;
        probLoseGivenWin = prob_LoseGivenWin;
        amount =  _amount;
        variable = 10;
        tenXcompute();
        getRequestRandomWords(variable);
    }

    function tenXcompute()public returns(bool, uint256){
        uint256 psudoWinProb = (sudoProbability()/10);
        uint256 actualProb = generateRandomFloat();
        bool results = actualProb < psudoWinProb;
        streakArray.push(results);
        uint256 winStreak = currentWinStreak();
        if(results){
            // Player wins
            probLose = probLose + (probWin * probLoseGivenWin)/100;
            probWin = 1000 - probLose;
            usertoWinCount[owner] = winCount++;
            // uint256 winAmount = amount + amount;
            // payable(msg.sender).transfer(winAmount);

            // Adjust conditional probability factor for winning
            // prob_LoseGivenWin += 5; // You can adjust this value based on your desired dynamics
        } else {
            // Player loses
            probWin = probWin + (probLose * probLoseGivenWin)/100;
            probLose = 1000 - probWin;
            // Reset conditional probability factor for losing
            // prob_LoseGivenWin = 20;
            usertoWinCount[owner] = looseCount++;

        }
        FlipFactory.finalCompute(results, amount, winStreak, variable, owner);
        return (results,winStreak);
    }

    function updateChainlink(address _chainlinkAddress) public {
        chainlink = _chainlinkAddress;
    }

    function getRequestRandomWords(uint8) public returns(uint256){
        // chainlinkVRF flip  = chainlinkVRF(chainlink);
        requestId = GreeterContract.requestRandomWords(variable);
        return requestId;
    }
    

    function getGetRequestStatus() public view returns(bool fulfilled, uint256[] memory randomWords){
    bool value ;
    uint256[] memory result;
        (value, result) = GreeterContract.getRequestStatus(requestId);
        // hello = result[0];
        return(value, result);
    }
    
    // uint256 public hash;
    // function setRandomnumber(uint256[] memory _randomWords) public returns(uint256) {
    //     uint256 hash = _randomWords[0];
    //     return hash;
    // }

    function updateHash() public view returns(uint256) {
        (bytes32 xyz) = keccak256(abi.encodePacked(block.number, block.timestamp, 
        blockhash(block.number - 1),probWin, probLose, looseCount, winCount, owner));
        uint256 hash = uint256(xyz);
        return hash;
    }


}