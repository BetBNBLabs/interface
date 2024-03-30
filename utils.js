"use client";
import web3modal from "web3modal";
import { ethers } from "ethers";
import {
    addressFactory,
    abiFactory,
    addressCustomToken,
    abiApproveFunction,
} from "./config";

export async function getUserAddress() {
    const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
    });
    return accounts[0];
}

async function getFlipFactoryContract(providerOrSigner) {
    // const modal = new web3modal();
    // const connection = await modal.connect();
    // const provider = new ethers.providers.Web3Provider(connection);
    // It will prompt user for account connections if it isnt connected
    const provider = new ethers.BrowserProvider(window.ethereum);
    
    const contract = new ethers.Contract(
        addressFactory,
        abiFactory,
        provider
    );
    if (providerOrSigner == true) {
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(
            addressFactory,
            abiFactory,
            signer
        );
        return contract;
    }
    return contract;
}

export async function isExistingUser() {
    const contract = await getFlipFactoryContract()
    const address = await getUserAddress()
    const data = await contract.userAddressToContractAddress(address)

    console.log("isExisting: ", data)
    return data
}

export async function createAccount() {
    const contract = await getFlipFactoryContract(true)
    const tx = await contract.createflips()
    await tx.wait();
    console.log("Account Created");
}

export async function approveToken(_spender, _amount) {
    // const modal = new web3modal();
    // const connection = await modal.connect();
    // const provider = new ethers.providers.Web3Provider(connection);
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer =  await provider.getSigner();
    const contract = new ethers.Contract(
        addressCustomToken,
        abiApproveFunction,
        signer
    );
    const tx = await contract.approve(_spender, _amount)
    await tx.wait()
    console.log("Spender Approved")
}

export async function flipACoin(_multiplier, _amount, _coinSide) {
    const contract = await getFlipFactoryContract(true)
    console.log("ethers amount: ", _amount.toString())
    const weiAmount = ethers.parseEther(_amount, 18);
    console.log("wei amount: ", weiAmount)

    // console.log("create account")
    // await createAccount()

    console.log("calling approve function")
    await approveToken(addressFactory, weiAmount)

    const d = await contract.GetAllowance()
    const d2 = ethers.formatEther(d);
    console.log("allowance ", d2)

    console.log("flipping")
    console.log("inputs: ", _multiplier.toString(), weiAmount, _coinSide.toString())
    const tx = await contract.flipACoin(_multiplier.toString(), weiAmount.toString(), _coinSide.toString()
    , { gasLimit: 1000000, }
    )
    const data = await tx.wait();
    // const data2 = await data.events[1]
    // const data3 = await data2.decode;

    // console.log("Coin flipped", data);
    console.log("Coin data2: ", data);
    // console.log("Coin data3: ", data3);
    // console.log("results info:", tx.value.toString())
}

