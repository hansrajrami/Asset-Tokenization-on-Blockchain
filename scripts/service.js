const { ethers, BigNumber } = require("ethers");
const fs = require('fs');

const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY;
const ETH_PRIVATE_KEY = process.env.ETH_PRIVATE_KEY;
const contractAddress = '';
const ABI = require('../artifacts/contracts/ERC721.sol/IRcertificate.json').abi;

const provider = new ethers.providers.JsonRpcProvider(`https://polygon-mumbai.infura.io/v3/11c79160811d467fad09bb62ed12d7eb`);
const signer = new ethers.Wallet(ETH_PRIVATE_KEY, provider);
const erc721 = new ethers.Contract(contractAddress, ABI, signer);

const buyIRcertificate = async() => {
    const tokenId = await erc721.assignIRcertificate(signer.address, 'LICENSE');
};

const erc721Contract = async() => {
    const name = await erc721.name();
    console.log({name});

    const symbol = await erc721.symbol();
    console.log({symbol});

    const tokenURI = await erc721.tokenURI(BigNumber.from(0));
    console.log({tokenURI});

    const balance = await erc721.balanceOf(signer.address);
    console.log("balance: ", balance.toString());

    const owner = await erc721.ownerOf(BigNumber.from(0));
    console.log({owner});
};

// erc721Contract();

buyIRcertificate();

