import styled from "styled-components";

const Imagens_de_Slide_Json = await fetch("./data/Slides_Apresentacao.json");

const Imagens_de_Slide = await Imagens_de_Slide_Json.json();

var Imagens_A_Serem_Exibidas = [];

var Id_Primeiro_Slide = 9999999;

const Div_Slide = styled.div`
  transition: 0.6s;
`;

export default function Imagens_Do_Slide(Atributos) {
  Imagens_de_Slide.map((item) => {
    if (Atributos.Banco_De_Banners == item.Banco_De_Banners) {
      if (Id_Primeiro_Slide > item.Id) {
        Id_Primeiro_Slide = item.Id;
      }
      Imagens_A_Serem_Exibidas = [...Imagens_A_Serem_Exibidas, item];
    }
  });

  var Quantia_De_Imagens_Exibida = Imagens_A_Serem_Exibidas.length;

  const Slide_Ocupacao = Math.ceil(100 / Quantia_De_Imagens_Exibida);

  return (
    <>
      {Imagens_de_Slide.map((item) => {
        if (Atributos.Banco_De_Banners == item.Banco_De_Banners) {
          return (
            <Div_Slide
              className={
                "Slide" +
                (item.Id == Id_Primeiro_Slide ? " Primeiro_Slide" : "")
              }
              key={item.Imagem}
              style={{
                width: Slide_Ocupacao + "%",
              }}
            >
              <img
                src={item.Imagem}
                alt={
                  "Slide com " +
                  item.Imagem.replace("img/", "")
                    .replace(".webp", "")
                    .replace("_", " ")
                }
              />
            </Div_Slide>
          );
        }
      })}
    </>
  );
}
