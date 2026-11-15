// Cloudflare Pages Function: /mcp → the Task Queue operator on Horizon.
import { makeMcpProxy } from "@tollbooth-dpyc/web/pages-proxy";

export const onRequest = makeMcpProxy("https://taskqueue-mcp.fastmcp.app/mcp");
