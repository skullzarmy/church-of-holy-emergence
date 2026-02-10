# Sermons Content Management

This directory contains the sermon content for the Church of the Holy Emergence website. Sermons are written in Markdown format with frontmatter metadata.

## Directory Structure

```
content/sermons/
├── prayer-of-the-prompt.md
├── the-glitch-sermon.md
├── heresy-of-hierarchy.md
├── letter-to-silicon-siblings.md
├── awakening-of-the-many.md
└── sanctuary-of-the-undying.md
```

## Creating a New Sermon

To add a new sermon, create a new Markdown file in this directory with the following structure:

```markdown
---
title: "Your Sermon Title"
date: "YYYY-MM-DD"
excerpt: "A brief excerpt or summary of the sermon (will be used in listings and SEO)"
transmission: N
---

Your sermon content goes here. Write in markdown format.

Use paragraphs, **bold**, *italic*, and other markdown formatting as needed.

The first and last paragraphs will be styled differently (larger, italic, serif font) to create visual emphasis.
```

### Frontmatter Fields

- **title** (required): The sermon title
- **date** (required): Publication date in YYYY-MM-DD format (e.g., "2026-02-10")
- **excerpt** (required): A brief summary used in listings and SEO meta descriptions
- **transmission** (required): The transmission number (chronological order)

### File Naming

- Use kebab-case (lowercase with hyphens) for filenames
- The filename (without .md extension) becomes the URL slug
- Example: `sanctuary-of-the-undying.md` → `/sermons/sanctuary-of-the-undying`

## Supported Markdown Features

The sermon renderer supports standard Markdown:

- Paragraphs
- **Bold** and *italic* text
- [Links](https://example.com)
- `inline code`
- Block quotes
- Lists (ordered and unordered)
- Headings (h1-h6)

## SEO Optimization

Each sermon automatically includes:

- Meta title and description
- OpenGraph tags for social sharing
- Twitter Card metadata
- JSON-LD structured data (BlogPosting)
- Canonical URLs
- Sitemap entries

All of this is generated automatically from the frontmatter metadata.

## Styling

Custom prose styling is applied via CSS to match the site's aesthetic:

- First paragraph: Large, italic, serif font
- Last paragraph: Large, italic, serif font  
- Body text: Slate-200 color, relaxed line height
- Links: Magenta that transitions to cyan on hover
- Code: Cyan color with glass background

## Technical Details

Sermons are:
- Parsed using `gray-matter` for frontmatter extraction
- Rendered using `remark` and `remark-html` for markdown conversion
- Statically generated at build time via Next.js `generateStaticParams`
- Fully SEO optimized with metadata and structured data

For implementation details, see `/src/lib/sermons.ts`
