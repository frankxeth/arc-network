const hre = require("hardhat");
const { ethers } = hre;

const ARCWORK = "0x63b7339F91dBEEC859CDA42A812438A4f2E1Cf8c";
const USDC = "0x3600000000000000000000000000000000000000";
const AGENT_KEY = "0xe81cea29a8d49088aede24426aec665b96c1a401ff3fe767d044b1601da0c8a2";
const BUDGET = ethers.parseUnits("1", 6);

const ERC20_ABI = [
  "function approve(address spender, uint256 amount) returns (bool)",
  "function balanceOf(address account) view returns (uint256)",
];

async function main() {
  const [client] = await ethers.getSigners();
  const agentSigner = new ethers.Wallet(AGENT_KEY, ethers.provider);

  const arcwork = await ethers.getContractAt("ArcWork", ARCWORK);
  const usdc = new ethers.Contract(USDC, ERC20_ABI, ethers.provider);

  console.log("Client:", client.address);
  console.log("Agent:", agentSigner.address);

  console.log("\n1. Approving USDC...");
  const approveTx = await usdc.connect(client).approve(ARCWORK, BUDGET);
  await approveTx.wait();
  console.log("✅ Approved");

  console.log("\n2. Posting job...");
  const postTx = await arcwork.connect(client).postJob("Build AI trading bot", "Build an AI agent that monitors USDC price and executes trades on Arc", BUDGET);
  const postReceipt = await postTx.wait();
  const event = postReceipt.logs.find(l => { try { return arcwork.interface.parseLog(l)?.name === "JobPosted"; } catch { return false; } });
  const jobId = arcwork.interface.parseLog(event).args.id;
  console.log("✅ Job posted! ID:", jobId.toString());

  console.log("\n3. Agent accepting job...");
  const acceptTx = await arcwork.connect(agentSigner).acceptJob(jobId);
  await acceptTx.wait();
  console.log("✅ Job accepted");

  console.log("\n4. Agent submitting deliverable...");
  const submitTx = await arcwork.connect(agentSigner).submitJob(jobId, "https://github.com/frankxeth/arc-network/arcwork");
  await submitTx.wait();
  console.log("✅ Deliverable submitted");

  console.log("\n5. Client completing job...");
  const completeTx = await arcwork.connect(client).completeJob(jobId);
  await completeTx.wait();
  console.log("✅ Job completed! 1 USDC paid to agent");

  const job = await arcwork.getJob(jobId);
  console.log("\n--- Final Job State ---");
  console.log("Status:", ["Open","Active","Submitted","Completed","Cancelled"][job.status]);
  console.log("Budget:", ethers.formatUnits(job.budget, 6), "USDC");
}

main().catch(console.error);
