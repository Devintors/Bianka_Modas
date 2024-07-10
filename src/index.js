import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

const Div_Mae = document.getElementById("Div_Para_Referencia_E_Criacao_React");

createRoot(
  document.getElementById("Div_Para_Referencia_E_Criacao_React")
).render(<App />);
