const Pacote_De_Configuracao_JSON = await fetch(
  "./data/Pacote_De_Configuracao.json"
);

const Pacote_De_Configuracao = await Pacote_De_Configuracao_JSON.json();

const Configuracoes_Geral = Pacote_De_Configuracao.Extencoes_De_Arquivo;

var Configuracoes_De_Extencao_De_Imagem;

Configuracoes_Geral.forEach((item) => {
  Configuracoes_De_Extencao_De_Imagem = item.Imagem;
});

const Produtos_Geral = Pacote_De_Configuracao.Produtos;

var Sub_Categorias_Geral;

var Categorias_Existentes = [];

Produtos_Geral.forEach((item) => {
  item.Produtos.forEach((sub_item) => {
    sub_item.Produtos.forEach((sub_sub_item) => {
      var Teste_De_Categoria_Ja_Existente = true;
      if (Categorias_Existentes.length > 0) {
        Categorias_Existentes.map((sub_sub_sub_item) => {
          if (
            sub_sub_sub_item.Nome_Da_Subcategoria ==
              sub_sub_item.Sub_Categoria_Produto &&
            sub_sub_sub_item.Categoria_Da_Subcategoria == sub_item.Categoria
          ) {
            Teste_De_Categoria_Ja_Existente = false;
          }
        });
      } else {
        Categorias_Existentes = [
          {
            Categoria_Da_Subcategoria: sub_item.Categoria,
            Nome_Da_Subcategoria: sub_sub_item.Sub_Categoria_Produto,
          },
        ];

        Teste_De_Categoria_Ja_Existente = false;
      }

      if (Teste_De_Categoria_Ja_Existente) {
        Categorias_Existentes = [
          ...Categorias_Existentes,
          {
            Categoria_Da_Subcategoria: sub_item.Categoria,
            Nome_Da_Subcategoria: sub_sub_item.Sub_Categoria_Produto,
          },
        ];
      }
    });
  });
  Categorias_Existentes = [
    ...Categorias_Existentes,
    { Nome_Da_Subcategoria: "" },
  ];
  Sub_Categorias_Geral = Categorias_Existentes;
});

var Key_Unica = 0;

export default function Sub_Categorias_Em_Circulo(Atributos) {
  const Recebendo_Funcao = Atributos.Funcao_Onclick;

  Key_Unica++;
  return (
    <div className="escolha-de-produtos">
      {Sub_Categorias_Geral.map((item) => {
        Key_Unica++;
        if (
          Atributos.Categoria_Sendo_Enviada == item.Categoria_Da_Subcategoria
        ) {
          return (
            <div
              className="produtos-circulo"
              key={Key_Unica + "produtos-circulo"}
              onClick={() => {
                Recebendo_Funcao(
                  item.Categoria_Da_Subcategoria,
                  item.Nome_Da_Subcategoria
                );
              }}
            >
              <img
                src={
                  "img/Sub_Categoria/" +
                  item.Nome_Da_Subcategoria +
                  Configuracoes_De_Extencao_De_Imagem
                }
                alt={item.Nome_Da_Subcategoria}
                width="90px"
              />
            </div>
          );
        } else if (!item.Categoria_Da_Subcategoria) {
          return (
            <div
              className="produtos-circulo"
              key={Key_Unica + "produtos-circulo segunda"}
              onClick={() => {
                Recebendo_Funcao(
                  Atributos.Categoria_Sendo_Enviada,
                  item.Nome_Da_Subcategoria
                );
              }}
            >
              <img
                src={
                  "img/Sub_Categoria/Limpar_Sub_Categorias" +
                  Configuracoes_De_Extencao_De_Imagem
                }
                alt={"Limpar Sub Categorias"}
                width="90px"
              />
            </div>
          );
        }
      })}
    </div>
  );
}
