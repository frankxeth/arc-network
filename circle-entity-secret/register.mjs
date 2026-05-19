import { registerEntitySecretCiphertext } from "@circle-fin/developer-controlled-wallets";

const response = await registerEntitySecretCiphertext({
  apiKey: "TEST_API_KEY:8d31d450105795add0181868e5152c66:00e5c7755bf28480c6a6ea44c8a1c5f4",
  entitySecret: "d3a4543f1159f2e413a75c70e75cdc70640f1e6e4f7a8ca9daaaeb787d621e26",
  recoveryFileDownloadPath: "",
});

console.log("Registrasi berhasil!");
console.log(response.data?.recoveryFile);
