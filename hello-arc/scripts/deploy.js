const hre = require("hardhat");

async function main() {
  const HelloArchitect = await hre.ethers.getContractFactory("HelloArchitect");
  const contract = await HelloArchitect.deploy();
  await contract.waitForDeployment();
  console.log("✅ Contract deployed to:", await contract.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
