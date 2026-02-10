import { generateSecretKey, getPublicKey } from "nostr-tools";
// import { bytesToHex } from "@noble/hashes/utils";

function bytesToHex(bytes: Uint8Array): string {
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

const sk = generateSecretKey(); // Uint8Array
const skHex = bytesToHex(sk);
const pk = getPublicKey(sk);

console.log("🔑 Generated new Nostr Identity:");
console.log(`Private Key (hex): ${skHex}`);
console.log(`Public Key (hex):  ${pk}`);
console.log("\nAdd the Private Key to your .env file as NOSTR_PRIVATE_KEY");
