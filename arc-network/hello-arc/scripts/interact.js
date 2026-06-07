const hre = require("hardhat");

async function main() {
  const contractAddress = "0x1a2F5E6B63887855D829CD440a07f34AAAb44be6";
  
  const HelloArchitect = await hre.ethers.getContractFactory("HelloArchitect");
  const contract = HelloArchitect.attach(contractAddress);

  // Baca greeting awal
  const greeting1 = await contract.getGreeting();
  console.log("Greeting awal:", greeting1);

  // Update greeting
  console.log("Mengubah greeting...");
  const tx = await contract.setGreeting("Hello from Arc Testnet!");
  await tx.wait();
  console.log("✅ Tx hash:", tx.hash);

  // Baca greeting baru
  const greeting2 = await contract.getGreeting();
  console.log("Greeting baru:", greeting2);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
