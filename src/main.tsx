import React from "react";
import ReactDOM from "react-dom/client";
import { createWeb3Modal } from "@web3modal/wagmi/react";
import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";
import { WagmiProvider } from "wagmi";
import {   sepolia } from "wagmi/chains";
import App from "./App.tsx";
import "./index.css";
const projectId = "eb79a9946b4e4b2ae10c8531e04aac3f";
const metadata = {
  name: "Web3Modal",
  description: "Web3Modal Example",
  url: "https://web3modal.com", // origin must match your domain & subdomain
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

const chains = [sepolia] as const;
const config = defaultWagmiConfig({
  chains, // required
  projectId, // required
  metadata, // required
});
createWeb3Modal({
  wagmiConfig: config,
  projectId,
  themeMode: "dark",
  themeVariables: {
    "--w3m-accent": '#1e1e1e',
    '--w3m-color-mix-strength': 60,
    "--w3m-border-radius-master": "1px",
  }
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <WagmiProvider config={config}>
      <App />
    </WagmiProvider>
  </React.StrictMode>
);
