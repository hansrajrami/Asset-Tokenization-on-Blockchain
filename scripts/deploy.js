const main = async() => {
    const [deployer] = await ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);
    console.log("Account balance:", (await deployer.getBalance()).toString());

    const irCert = await ethers.getContractFactory("KPRIET");
    const irCertContract = await irCert.deploy();

    console.log("KPRIET NFT Smart Contract address:", irCertContract.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });