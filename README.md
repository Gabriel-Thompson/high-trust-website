# High Trust Society Foundation Website

A custom, dependency-free static website for the **High Trust Society Foundation**, published at **hightrustamerica.org**.

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

## Brand

Organization: **High Trust Society Foundation**  
Public domain: **hightrustamerica.org**

The selected HTS seal/wordmark is stored at `public/assets/high-trust-society-foundation-logo.svg` and is used in the site header and footer.

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

The High Trust Society Foundation is designed as a modern American institution rather than a campaign site or generic nonprofit template:

- Deep navy, warm ivory, restrained red, muted gold
- Editorial serif display typography with clean sans-serif body copy
- Broad whitespace and thin institutional rules
- Selected HTS circular seal and wordmark
- No fabricated rankings, endorsements, statistics, or social links
- Plain-language content grounded in the founding prospectus

## Content architecture

`src/pages/*.html` contains readable page content fragments. The zero-dependency `build-v2.mjs` extracts each page body, applies the High Trust Society Foundation branding, and builds the shared site shell, metadata, navigation, footer, and scripts.
