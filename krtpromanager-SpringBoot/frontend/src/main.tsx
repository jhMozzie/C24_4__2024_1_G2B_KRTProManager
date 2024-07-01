import React from "react";
import ReactDOM from "react-dom/client";
import { AppWrapper } from "./App.tsx";
import "./index.css";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppWrapper />
      <ReactQueryDevtools />
    </QueryClientProvider>
  </React.StrictMode>
);
