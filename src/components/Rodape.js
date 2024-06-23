const Pacote_De_Configuracao_JSON = await fetch(
  "./data/Pacote_De_Configuracao.json"
);

const Pacote_De_Configuracao = await Pacote_De_Configuracao_JSON.json();

const Produtos_Geral = Pacote_De_Configuracao.Rodape;

var Rodape_Geral;

Produtos_Geral.forEach((item) => {
  Rodape_Geral = item.Imagem;
});

export default function Rodape() {
  return (
    <div className="rodape">
      <img src={Rodape_Geral} alt="Rodape" width="100%" />
    </div>
  );
}
