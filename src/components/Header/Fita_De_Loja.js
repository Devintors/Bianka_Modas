const Pacote_De_Configuracao_JSON = await fetch(
  "./data/Pacote_De_Configuracao.json"
);

const Pacote_De_Configuracao = await Pacote_De_Configuracao_JSON.json();

const Fitas_De_Loja = Pacote_De_Configuracao.Fita_De_Loja;

const Repetir_Imagens = [];

var Key_Unica = 0;

Fitas_De_Loja.forEach((item) => {
  for (var i = 0; i < 3; i++) {
    Repetir_Imagens.push({
      ...item,
      id: `${item.Id}-${i}_Teste`,
    });
  }
});

export default function Fita_De_Loja() {
  return (
    <div className="text-wrapper" id="text-wrapper1">
      <div className="Movimento_De_Sumir">
        {Repetir_Imagens.map((item) => {
          Key_Unica++;

          return (
            <img
              src={item.Local}
              className="promocoes-d"
              key={Key_Unica + item.Id + "Fita_De_Loja_Movimento_De_Subir"}
            />
          );
        })}
      </div>

      <div className="Movimento_De_Aparicao">
        {Repetir_Imagens.map((item) => {
          Key_Unica++;

          return (
            <img
              src={item.Local}
              className="promocoes-e"
              key={Key_Unica + item.Id + "Fita_De_Loja_Movimento_De_Aparicao"}
            />
          );
        })}
      </div>
    </div>
  );
}
