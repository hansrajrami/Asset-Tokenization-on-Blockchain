const { ethers, upgrades } = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();

    console.log("Upgrading contracts with the account:", deployer.address);
    console.log("Account balance:", (await deployer.getBalance()).toString());

    const irCert = await ethers.getContractFactory("IRcertificateV2");
    const newIRcert = await upgrades.upgradeProxy(BOX_ADDRESS, irCert);

    console.log("IR certificate contraxt upgraded");
    console.log("New IR Certificate address:", newIRcert.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });