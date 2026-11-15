# ChipIn

Chores for the household, paid in sats.

A parent posts a chore with what each grade earns.
A child claims it, does it, and marks it done.
The parent checks the work and picks a grade.
The sats go from the parent's own Lightning wallet to the child's.

ChipIn is a web page over the [Task Booth](https://github.com/lonniev/taskbooth-mcp) Operator, a Tollbooth DPYC™ service.
Task Booth keeps the chores and never holds the sats.
Everyone signs in with their own Nostr npub.

## Run locally

```
cd frontend
npm ci
npm run dev
```

The page talks to Task Booth through `/mcp`, which `vite` proxies in development and `functions/mcp.js` proxies on Cloudflare Pages.

## License

Apache-2.0. Patent Pending (US Prov. 64/045,999).
