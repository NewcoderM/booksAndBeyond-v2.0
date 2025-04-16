import { createRoot } from "react-dom/client";
import BaseRouter from "./router.jsx";
import { StrictMode } from "react";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BaseRouter />
  </StrictMode>
);
