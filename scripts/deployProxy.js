const { ethers, upgrades } = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);
    console.log("Account balance:", (await deployer.getBalance()).toString());

    const irCert = await ethers.getContractFactory("KPRIET");
    const irCertContract = await upgrades.deployProxy(irCert, ["KPRIET NFT Demo", "KPRIET", "ipfs://"]);
    await irCertContract.deployed();

    console.log("KPRIET Smart contract address:", irCertContract.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });