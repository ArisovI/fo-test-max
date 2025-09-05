import { createRoot } from "react-dom/client";
import App from "./App.tsx";

import "./global.scss";
import "@mantine/core/styles.css";

import { ModalsProvider } from "@mantine/modals";
import { MantineProvider } from "@mantine/core";

import "./i18n";

createRoot(document.getElementById("root")!).render(
  <MantineProvider>
    <ModalsProvider>
      <App />
    </ModalsProvider>
  </MantineProvider>
);
