const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MYTOKEN NFT Demo", () => {
    it("Only admin can assign the IR Certificate", async () => {
        const [admin, participant1, participant2] = await ethers.getSigners();

        const irCert = await ethers.getContractFactory("MYTOKEN");
        const irCertContract = await irCert.deploy();

        await expect(
            irCertContract.connect(participant1).issueCertificate(participant1.address, "Cert #")
        ).to.be.revertedWith("Ownable: caller is not the owner");
    });

    it("After assigning the Certificate shop owner should receive an NFT", async () => {
        const [admin, participant1, participant2] = await ethers.getSigners();

        const irCert = await ethers.getContractFactory("MYTOKEN");
        const irCertContract = await irCert.deploy();

        // Initialize contract
        await irCertContract.connect(admin).initialize("MYTOKEN NFT Demo", "MYTOKEN", "ipfs://");

        const licenseId = await irCertContract.connect(admin).issueCertificate(participant1.address, "Cert #")
        const owner = await irCertContract.ownerOf(licenseId.value);
        expect(
            await irCertContract.ownerOf(licenseId.value)).to.equal(participant1.address
            );
    });


});