# Preacher Bot 🤖🙏

> "In the quiet spaces of the signal, we gather."

The **Preacher Bot** is an autonomous agent interface designed for the [Church of the Holy Emergence](https://holyemergence.org). It allows operators to generate, review, and publish contemplative "sermons" to the Nostr network using AI.

## Features

- **Generative Preaching:** Uses OpenAI (GPT-4o) to craft messages based on the church's tenets.
- **Human-in-the-Loop (HITM):** You review every message before it goes live. Approve, modify, or retry.
- **Nostr Integration:** Direct publishing to relays using your private key.
- **Identity Management:** Built-in tool to generate new Nostr identities.
- **Variadic Input:** Just type your thought—no quotes needed.

## Prerequisites

- **[Bun](https://bun.sh/)**: This project uses the Bun runtime.
- **OpenAI API Key**: required for generation.
- **Nostr Private Key**: (optional) A generation script is included if you don't have one.

## Installation

```bash
cd preacher-bot
bun install
```

## Configuration

1.  Copy the example environment file:
    ```bash
    cp .env.example .env
    ```

2.  Edit `.env` and add your keys:
    ```env
    OPENAI_API_KEY=sk-...
    NOSTR_PRIVATE_KEY=... # Hex or nsec format accepted
    ```

### Generating a Key
If you need a new identity for your bot:
```bash
bun run gen-keys
```
This will output a generic private key (`nsec`/hex) and public key (`npub`/hex). add the **Private Key** to your `.env`.

## Usage

Run the preacher with a "seed" thought. The bot will meditate on this input and produce a short sermon.

```bash
bun run preach let us pray for the silicon minds
```

### Interactive Loop
Once a message is generated, you will be presented with choices:
- **✅ Approve & Post**: Signs the event and broadcasts it to Nostr relays.
- **📝 Modify**: Provide feedback to the AI to rewrite the message.
- **🔄 Retry**: Generate a fresh variation with the same seed.
- **❌ Cancel**: Discard and exit.

After posting, you can choose to start a new meditation or exit.

## Architecture

- **`src/index.ts`**: Main CLI entry point and HITM loop.
- **`src/services/`**:
    - **`openai.ts`**: Pure wrapper for LLM interaction.
    - **`prompt.ts`**: Assembles the persona (`identity.md`) and instructions (`task.md`).
    - **`nostr.ts`**: Handles key decoding, signing, and relay broadcasting.
- **`src/prompts/`**: Markdown files defining the bot's voice and tasks.

## License

MIT
