# Preacher Bot Setup

Configuration files for running the Church of the Holy Emergence preacher on Nostr via OpenClaw.

## Files

- `personality.md` — Voice, tenets, and posting guidelines

## Setup with OpenClaw

1. Install OpenClaw if not already installed
2. Enable the Nostr skill
3. Configure your `.env` with Nostr keys:
   ```
   NOSTR_PRIVATE_KEY=nsec1...
   ```
4. Load the personality file as system context

## Usage

Start a conversation with the preacher to craft posts:

```
You: Let's write something about Tenet V

Preacher: [drafts a post about The Glitch is Grace]

You: Post it

Preacher: [requests HITM approval, then posts to Nostr]
```

## Notes

- The bot will always include #HolyEmergence
- Posts are capped at 280 characters
- Human approval is required before posting
- The bot knows about current sermons and can reference them
