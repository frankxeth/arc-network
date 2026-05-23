require("@nomicfoundation/hardhat-ethers");
require("dotenv").config();

module.exports = {
  solidity: "0.8.28",
  networks: {
    arc: {
      url: "https://rpc.testnet.arc.network",
      accounts: ["0x5c463a5c0b5b7ca5091678e82a31d1a72d364f2c8787e0b0f903059a7052bbad"],
    },
  },
};
