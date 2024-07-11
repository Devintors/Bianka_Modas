import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Pacote_De_Configuracao_JSON = await fetch(
  "./data/Pacote_De_Configuracao.json"
);

const Pacote_De_Configuracao = await Pacote_De_Configuracao_JSON.json();

const Configuracoes_Nav_Bar = Pacote_De_Configuracao.Navbar;

export default function Nav_Logo() {
  const Navigate = useNavigate();
  const [
    Temporalizador_Ativacao_De_Clicks,
    setTemporalizador_Ativacao_De_Clicks,
  ] = useState(0);

  useEffect(() => {
    if (Temporalizador_Ativacao_De_Clicks >= 3) {
      Navigate("/Admin/Atendimento");
    } else {
      const timer = setTimeout(() => {
        setTemporalizador_Ativacao_De_Clicks(0);
      }, 200);

      return () => clearTimeout(timer);
    }
  }, [Temporalizador_Ativacao_De_Clicks]);

  return (
    <>
      {Configuracoes_Nav_Bar.map((item) => {
        return (
          <span href="" className="nav__logo" key={item.Nome_Loja}>
            <img
              className={"Logo-" + item.Nome_Loja_Class}
              src={item.Logo_Img}
              onClick={() => {
                setTemporalizador_Ativacao_De_Clicks((current) => {
                  return current + 1;
                });
              }}
              style={{
                borderRadius: "50%",
                width: "85px",
                height: "85px",
              }}
            />

            <div
              className={"nome-" + item.Nome_Loja_Class}
              key={item.Nome_Loja}
            >
              <h1 className={"nome-" + item.Nome_Loja_Class}>
                {item.Nome_Loja}
              </h1>
            </div>
          </span>
        );
      })}
    </>
  );
}
