# High Trust America Website

A custom, dependency-free static website for High Trust America.

## Build

Requires Node.js 20+.

```bash
npm run build
```

The generated site is written to `dist/`.

## Local development

```bash
npm run dev
```

Then visit `http://localhost:4321`.

## Cloudflare Pages

- Framework preset: None
- Build command: `npm run build`
- Build output directory: `dist`
- Root directory: `/`
- Node version: 20+ (22 recommended)

No database, server, or paid runtime is required.

## Current scope

Built now:
- Home
- Understand
- Build
- Advocate
- Research
- About
- Join
- Responsive navigation
- Accessible Coming Soon dialog
- SEO metadata, manifest, robots.txt, and 404 page

Intentional Coming Soon states:
- State Trust Profiles / index
- High Trust Scorecard
- Contributor application processing
- Donation processing
- Founding prospectus public file attachment
- Social media channels

## Design direction

High Trust America is designed as a modern American institution rather than a campaign site or generic nonprofit template:

- Deep navy, warm ivory, restrained red, muted gold
- Editorial serif display typography with clean sans-serif body copy
- Broad whitespace and thin institutional rules
- Simple custom HT seal / wordmark
- No fabricated rankings, endorsements, statistics, or social links
- Plain-language content grounded in the August 2026 founding prospectus

## Content architecture

`src/pages/*.html` contains readable page content fragments. The zero-dependency `build.mjs` extracts each page body and applies the shared site shell, metadata, navigation, footer, and scripts.
