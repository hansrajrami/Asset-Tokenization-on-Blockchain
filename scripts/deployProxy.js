const { ethers, upgrades } = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);
    console.log("Account balance:", (await deployer.provider.getBalance(deployer.address)).toString());

    const irCert = await ethers.getContractFactory("MYTOKEN");
    const irCertContract = await upgrades.deployProxy(irCert, ["MYTOKEN NFT Demo", "MYTOKEN", "ipfs://"]);
    await irCertContract.waitForDeployment();

    console.log("MYTOKEN Smart contract address:", await irCertContract.getAddress());
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });