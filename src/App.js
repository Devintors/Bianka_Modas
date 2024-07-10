import "./StylePadrao.css";
import "./Style_Cores.css";
import HomePage from "./pages/Home/HomePage";
import Suporte_Chat from "./pages/Suporte_Chat/Suporte_Chat";
import Rota_Privada from "./routes/Rota_Privada";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="Admin" element={<Rota_Privada />}>
          <Route index element={<h1>Admin</h1>} />
          <Route path="Atendimento" element={<Suporte_Chat />} />
        </Route>
      </Routes>
    </Router>
  );
}
