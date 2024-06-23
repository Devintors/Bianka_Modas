import React, { useState } from "react";

import Nav_Logo from "./Navbar/Nav_Logo";
import Nav_Toggle from "./Navbar/Nav_Toggle";
import Dropdown from "./Navbar/Dropdown";

export default function Navbar() {
  const [Classe_Da_Div, setClasse_Da_Div] = useState(false);

  const Funcao_De_Alterar_Visibilidade_Do_Menu = () => {
    setClasse_Da_Div(!Classe_Da_Div);
  };

  return (
    <nav className="nav-container">
      <div className="nav__data">
        <Nav_Logo />
        <Nav_Toggle
          Click_Do_Elemento={Funcao_De_Alterar_Visibilidade_Do_Menu}
          Valor_Atual_De_Visibilidade={Classe_Da_Div}
        />
      </div>
      <div
        className={Classe_Da_Div ? "nav__menu show-menu" : "nav__menu"}
        id="nav-menu"
      >
        <ul className="nav__list">
          <li>
            <a href="#" className="nav__link">
              Inicio
            </a>
          </li>
          <Dropdown />
        </ul>
      </div>
    </nav>
  );
}
