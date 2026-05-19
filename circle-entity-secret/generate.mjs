import { generateEntitySecret } from "@circle-fin/developer-controlled-wallets";

const secret = generateEntitySecret();
console.log("Entity Secret kamu:");
console.log(secret);
