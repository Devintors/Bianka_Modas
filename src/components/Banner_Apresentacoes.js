import Input_Tipo_Radio from "./Subcomponents_Banner_Apresentacoes/Input_Tipo_Radio";
import Imagens_Do_Slide from "./Subcomponents_Banner_Apresentacoes/Imagens_Do_Slide";
import Navegacao_Entre_Slides from "./Subcomponents_Banner_Apresentacoes/Navegacao_Entre_Slides";
import styled from "styled-components";

const Imagens_de_Slide_Json = await fetch("./data/Slides_Apresentacao.json");
const Imagens_de_Slide = await Imagens_de_Slide_Json.json();

const Div_Slides = styled.div`
  display: flex;
  height: 100%;
`;

var Imagens_A_Serem_Exibidas = [];

export default function Banner_Apresentacoes(Atributos) {
  Imagens_de_Slide.map((item) => {
    if (Atributos.Banco_De_Banners == item.Banco_De_Banners) {
      Imagens_A_Serem_Exibidas = [...Imagens_A_Serem_Exibidas, item];
    }
  });

  var Quantia_De_Imagens_Exibida = Imagens_A_Serem_Exibidas.length;

  const Slide_Ocupacao = Math.ceil(100 * Quantia_De_Imagens_Exibida);

  return (
    <>
      <div className="Imagens_De_Apresentacoes Opacidade_De_Itens_Para_Temas">
        <Div_Slides
          style={{
            width: Slide_Ocupacao + "%",
          }}
        >
          <Input_Tipo_Radio Banco_De_Banners={Atributos.Banco_De_Banners} />
          <Imagens_Do_Slide Banco_De_Banners={Atributos.Banco_De_Banners} />
          <Navegacao_Entre_Slides
            Banco_De_Banners={Atributos.Banco_De_Banners}
          />
        </Div_Slides>
      </div>
    </>
  );
}
