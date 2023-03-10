require("@nomicfoundation/hardhat-toolbox");
require('@openzeppelin/hardhat-upgrades');

// const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY;
const INFURA_API_KEY = process.env.INFURA_API_KEY;
const ETH_PRIVATE_KEY = process.env.ETH_PRIVATE_KEY;
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  // defaultNetwork: "mumbai",
  networks: {
    mumbai: {
      url: `https://polygon-mumbai.infura.io/v3/${INFURA_API_KEY}`,
      accounts: [ETH_PRIVATE_KEY]
    }
  },
  etherscan: {
    apiKey: {
      polygonMumbai: ETHERSCAN_API_KEY,
    }
  },
};
