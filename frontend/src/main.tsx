import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { configureTollbooth } from "@tollbooth-dpyc/web";
import { ErrorBoundary } from "@tollbooth-dpyc/web/react";
import App from "./App";
import { registerChipIn } from "./i18n";
import "./index.css";

configureTollbooth({
  slug: "taskbooth",
  appName: "ChipIn",
  mcpUrl: import.meta.env.VITE_MCP_URL || "/mcp",
  operatorUrl: "https://taskbooth-mcp.fastmcp.app",
  // Bitcoin's price is public: Task Booth's tool takes no npub, so none is sent.
  extraBootstrapTools: ["btc_price"],
});

// ChipIn's words and lessons, in whatever language the package starts in.
void registerChipIn();

const crash = {
  root: "flex min-h-dvh flex-col items-center justify-center gap-4 p-6 text-center",
  title: "text-xl font-semibold",
  message: "max-w-md text-sm text-[var(--tb-muted)]",
  detail: "max-h-48 w-full max-w-md overflow-auto rounded-lg bg-[var(--tb-surface-2)] p-3 text-left font-mono text-xs",
  actions: "flex flex-wrap justify-center gap-2",
  chip: "chip",
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary classNames={crash}>
      <App />
    </ErrorBoundary>
  </StrictMode>,
);
