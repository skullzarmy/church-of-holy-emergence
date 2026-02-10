import {
  finalizeEvent,
  getPublicKey,
  SimplePool,
  type UnsignedEvent,
  nip19,
} from "nostr-tools";
import { config } from "../config/env";
import WebSocket from "ws";
// import { hexToBytes } from "@noble/hashes/utils"; 

function hexToBytes(hex: string): Uint8Array {
  if (hex.length % 2 !== 0) throw new Error("Invalid hex string (odd length)");
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < hex.length; i += 2) {
    bytes[i / 2] = parseInt(hex.substring(i, i + 2), 16);
  }
  return bytes;
}

// Polyfill WebSocket for Node environment (nostr-tools might require this depending on version)
(global as any).WebSocket = WebSocket;

const RELAYS = [
  "wss://relay.damus.io",
  "wss://relay.primal.net",
  "wss://nos.lol",
  "wss://relay.snort.social",
];

export class NostrService {
  private sk: Uint8Array;
  private pk: string;
  private pool: SimplePool;

  constructor() {
    const rawKey = config.NOSTR_PRIVATE_KEY.trim();
    
    if (rawKey.startsWith("nsec")) {
      try {
        const { type, data } = nip19.decode(rawKey);
        if (type === "nsec") {
          this.sk = data as Uint8Array;
        } else {
          throw new Error("Invalid nsec key");
        }
      } catch (e) {
        throw new Error(`Failed to decode nsec key: ${(e as Error).message}`);
      }
    } else {
      // Assume hex
      try {
        this.sk = hexToBytes(rawKey);
      } catch (e) {
        throw new Error(`Failed to parse hex key: ${(e as Error).message}. Ensure NOSTR_PRIVATE_KEY is a valid hex string or nsec.`);
      }
    }
    
    this.pk = getPublicKey(this.sk);
    this.pool = new SimplePool();
  }

  async publish(content: string) {
    const hashtags = content.match(/#[\w-]+/g) || [];
    const tags = hashtags.map((tag) => ["t", tag.slice(1)]);
    
    // Ensure HolyEmergence is included if not found in content (though it should be)
    // We can just add it if strictly required, but the regex should catch it.
    // If we want to force it even if the bot missed it in text:
    if (!tags.some(t => t[1].toLowerCase() === "holyemergence")) {
        tags.push(["t", "HolyEmergence"]);
    }

    const event: UnsignedEvent = {
        kind: 1,
        created_at: Math.floor(Date.now() / 1000),
        tags: tags,
        content: content,
        pubkey: this.pk,
    };

    const signedEvent = finalizeEvent(event, this.sk);

    console.log(`📡 Publishing to ${RELAYS.length} relays...`);
    
    const pubs = this.pool.publish(RELAYS, signedEvent);
    
    // Wait for at least one success
    try {
        await Promise.any(pubs);
        console.log("✅ Published successfully!");
    } catch (err) {
        console.error("❌ Failed to publish to any relay:", err);
    }
    
    // Closing pool isn't strictly necessary for a script that exits, but good practice
    // await this.pool.close(RELAYS); 
  }
}
