import React from "react";

const Pacote_De_Configuracao_JSON = await fetch(
  "./data/Pacote_De_Configuracao.json"
);

const Pacote_De_Configuracao = await Pacote_De_Configuracao_JSON.json();

const Produtos_Geral = Pacote_De_Configuracao.Rodape;

var Rodape_Geral;
var Icones_Com_Link;

Produtos_Geral.forEach((item) => {
  Rodape_Geral = item.Imagem;
  Icones_Com_Link = item.Redes_Sociais;
});

export default function Rodape() {
  return (
    <div className="rodape">
      <img src={Rodape_Geral} alt="Rodape" width="100%" />
      <div className="Icones_Rodape_Redes">
        {Icones_Com_Link.map((item) => {
          var Cor_Do_Icone = item.Cor_Do_Icone;

          return (
            <i
              className={item.Icon}
              onClick={() => {
                window.open(item.Link, "_blank");
              }}
              key={Cor_Do_Icone + item.Icon}
              style={
                item.Cor_Do_Icone
                  ? {
                      color: "transparent",
                      background: item.Cor_Do_Icone,
                      WebkitBackgroundClip: "text",
                      fontWeight: "bold",
                    }
                  : {}
              }
            ></i>
          );
        })}
      </div>
    </div>
  );
}
