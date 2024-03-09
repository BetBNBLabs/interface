"use client";
import web3modal from "web3modal";
import { ethers } from "ethers";
import {
    addressFactory,
    abiFactory,
} from "./config";

export async function getUserAddress() {
    const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
    });
    return accounts[0];
}

async function getFlipFactoryContract() {
    const modal = new web3modal();
    const connection = await modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const contract = new ethers.Contract(
        addressFactory,
        abiFactory,
        provider
    );
    if (providerOrSigner == true) {
        const signer = provider.getSigner();
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
    const contract = await getFlipFactoryContract()
    const tx = await contract.createflips()
    await tx.wait();
    console.log("Account Created");
}

export async function flipCoin(_multiplier, _amount, _coinSide) {
    const contract = await getFlipFactoryContract()
    const weiAmount = ethers.utils.parseUnits(_amount.toString(), "ether");
    const tx = await contract.flipaCoin(_multiplier, weiAmount, _coinSide)
    await tx.wait();
    console.log("Account Created");
}