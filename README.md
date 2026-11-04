# Ferrn concept websites

Client website concepts by Ferrn Agency. Each concept is served at
`https://ferrnagency.com/<client-slug>/`.

| Client | Live link | Source |
| --- | --- | --- |
| Splendid Freight | https://ferrnagency.com/splendid-freight/ | `src/splendid-freight/` |

## How it works

- `public/` is deployed as static assets by a Cloudflare Worker named
  `ferrn-concept-website` (Workers Builds, connected to this repo; every push to
  `main` deploys).
- `wrangler.jsonc` holds one pair of routes per client
  (`ferrnagency.com/<slug>*` and `www.ferrnagency.com/<slug>*`). Routes win over
  the main `ferrn` Worker only for those paths, so the agency site is untouched.

## Add a new client concept

1. Create `src/<slug>/index.src.html` (and optional `partials.mjs`).
2. Put images, video and fonts in `public/<slug>/assets/` and use relative paths
   (`assets/img/...`).
3. Build: `cd tools && npm install && cd .. && node tools/build.mjs <slug>`
   (inlines Lucide icons `{{icon:name}}` and Simple Icons `{{si:name}}`).
4. Add the two routes for `<slug>` to `wrangler.jsonc`.
5. Commit and push. Share `https://ferrnagency.com/<slug>/`.

Icons: [Lucide](https://lucide.dev) (ISC) and [Simple Icons](https://simpleicons.org) (CC0).
