"use client";
import web3modal from "web3modal";
import { ethers } from "ethers";
import {
    addressFactory,
    abiFactory,
    addressCustomToken,
    abiCustomToken,
} from "./config";

async function getFlipFactoryContract(providerOrSigner) {
    // const modal = new web3modal();
    // const connection = await modal.connect();
    // const provider = new ethers.providers.Web3Provider(connection);
    const provider = new ethers.BrowserProvider(window.ethereum);

    const contract = new ethers.Contract(addressFactory, abiFactory, provider);
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

async function getTokenContract(providerOrSigner) {
    // const modal = new web3modal();
    // const connection = await modal.connect();
    // const provider = new ethers.providers.Web3Provider(connection);
    const provider = new ethers.BrowserProvider(window.ethereum);

    const contract = new ethers.Contract(
        addressCustomToken,
        abiCustomToken,
        provider
    );
    if (providerOrSigner == true) {
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(
            addressCustomToken,
            abiCustomToken,
            signer
        );
        return contract;
    }
    return contract;
}

export async function getUserAddress() {
    const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
    });
    return accounts[0];
}

export async function isExistingUser() {
    const contract = await getFlipFactoryContract();
    const address = await getUserAddress();
    const data = await contract.userAddressToContractAddress(address);

    console.log("isExisting: ", data);
    return data;
}

export async function createAccount() {
    const contract = await getFlipFactoryContract(true);
    const tx = await contract.createflips();
    await tx.wait();

    console.log("Account Created");
}

export async function approveToken(_amount) {
    const contract = await getTokenContract(true);
    const weiAmount = ethers.parseEther(_amount, 18);
    const tx = await contract.approve(addressFactory, weiAmount);
    await tx.wait();

    console.log("Spender Approved");
}

// this is called on token contract
export async function checkAllowance() {
    const contract = await getTokenContract();
    const user = await getUserAddress();
    const data = await contract.allowance(user, addressFactory);
    const formattedData = ethers.formatEther(data);

    console.log("Allowance: ", formattedData);
    return formattedData;
}

// this is called from factory contract
export async function checkGetAllowance() {
    const contract = await getFlipFactoryContract();
    const data = await contract.getAllowance();
    const formattedData = ethers.formatEther(data);

    console.log("Allowance: ", formattedData);
    return formattedData;
}

export async function flipCoin(_multiplier, _amount, _coinSide) {
    const isExisting = await isExistingUser();
    if (isExisting.toString() == "0x0000000000000000000000000000000000000000") {
        await createAccount();
    }

    const allowance = await checkAllowance()
    if (allowance < _amount) return

    const contract = await getFlipFactoryContract(true);

    // console.log("calling approve function");
    // await approveToken(_amount);
    // await getAllowance();

    console.log("calling flip function");
    console.log("inputs: ", {
        multiplier: _multiplier,
        weiAmount: _amount,
        coinSide: _coinSide,
    });

    const weiAmount = ethers.parseEther(_amount, 18);
    const tx = await contract.flipACoin(_multiplier, weiAmount, _coinSide, {
        gasLimit: 1000000,
    });
    const data = await tx.wait();
    
    console.log("tx: ", data);
}