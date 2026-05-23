const hre = require("hardhat");

async function main() {
  const USDC_ARC_TESTNET = "0x3600000000000000000000000000000000000000";
  
  console.log("Deploying ArcWork contract...");
  const ArcWork = await hre.ethers.getContractFactory("ArcWork");
  const arcwork = await ArcWork.deploy(USDC_ARC_TESTNET);
  await arcwork.waitForDeployment();
  
  const address = await arcwork.getAddress();
  console.log("✅ ArcWork deployed to:", address);
  console.log("Explorer:", `https://testnet.arcscan.app/address/${address}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
