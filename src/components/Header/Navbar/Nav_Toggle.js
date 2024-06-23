import React from "react";

export default function Nav_Toggle({
  Click_Do_Elemento,
  Valor_Atual_De_Visibilidade,
}) {
  return (
    <div
      className={
        Valor_Atual_De_Visibilidade ? "nav__toggle show-icon" : "nav__toggle"
      }
      id="nav-toggle"
      onClick={Click_Do_Elemento}
    >
      <i className="ri-menu-line nav__burger"></i>
      <i className="ri-close-line nav__close"></i>
    </div>
  );
}
