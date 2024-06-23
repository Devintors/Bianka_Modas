const Pacote_De_Configuracao_JSON = await fetch(
  "./data/Pacote_De_Configuracao.json"
);

const Pacote_De_Configuracao = await Pacote_De_Configuracao_JSON.json();

const Configuracoes_Geral = Pacote_De_Configuracao.Extencoes_De_Arquivo;

var Configuracoes_De_Extencao_De_Imagem;
var Configuracoes_De_Extencao_De_Imagem_2;

Configuracoes_Geral.forEach((item) => {
  Configuracoes_De_Extencao_De_Imagem = item.Imagem;
  Configuracoes_De_Extencao_De_Imagem_2 = item.Imagem_2;
});

const Produtos_Geral = Pacote_De_Configuracao.Produtos;

var Destaques_Geral;
var Produtos_Existentes;
var Produtos_Em_Destaques;
var Produtos_Em_Destaques = [];
var Key_Unica = 0;

Produtos_Geral.forEach((item) => {
  Destaques_Geral = item.Destaques;
  Produtos_Existentes = item.Produtos;

  Destaques_Geral.map((item_Destaques_Geral) => {
    item_Destaques_Geral.Produtos.map((sub_item_Destaques_Geral) => {
      Produtos_Existentes.map((item_Produtos_Existentes) => {
        item_Produtos_Existentes.Produtos.map(
          (sub_item_Produtos_Existentes) => {
            if (
              sub_item_Destaques_Geral.Nome_Do_Produto ==
              sub_item_Produtos_Existentes.Nome_Do_Produto
            ) {
              if (Produtos_Em_Destaques.length > 0) {
                Produtos_Em_Destaques.map((item_Produtos_Em_Destaques) => {
                  if (
                    item_Produtos_Em_Destaques.Categoria ==
                    item_Produtos_Existentes.Categoria
                  ) {
                    item_Produtos_Em_Destaques.Produtos = [
                      ...item_Produtos_Em_Destaques.Produtos,
                      sub_item_Produtos_Existentes,
                    ];
                  } else {
                    var Teste_De_Adicao_De_Nao_Repeticao = false;

                    item_Produtos_Em_Destaques.Produtos.map(
                      (sub_item_Produtos_Em_Destaques) => {
                        if (
                          sub_item_Produtos_Em_Destaques.Nome_Do_Produto ==
                          sub_item_Produtos_Existentes.Nome_Do_Produto
                        ) {
                          Teste_De_Adicao_De_Nao_Repeticao = true;
                        }
                      }
                    );

                    if (!Teste_De_Adicao_De_Nao_Repeticao) {
                      var Teste_Final_De_Liberacao = true;
                      Produtos_Em_Destaques.map((Teste_Final) => {
                        Teste_Final.Produtos.map((Ultimo_Espaco) => {
                          if (
                            Ultimo_Espaco.Nome_Do_Produto ==
                              sub_item_Produtos_Existentes.Nome_Do_Produto ||
                            Teste_Final.Categoria ==
                              item_Produtos_Existentes.Categoria
                          ) {
                            Teste_Final_De_Liberacao = false;
                          }
                        });
                      });
                      if (Teste_Final_De_Liberacao) {
                        Produtos_Em_Destaques = [
                          ...Produtos_Em_Destaques,
                          {
                            Categoria: item_Produtos_Existentes.Categoria,
                            Produtos: [sub_item_Produtos_Existentes],
                          },
                        ];
                      }
                    }
                  }
                });
              } else {
                Produtos_Em_Destaques = [
                  ...Produtos_Em_Destaques,
                  {
                    Categoria: item_Produtos_Existentes.Categoria,
                    Produtos: [sub_item_Produtos_Existentes],
                  },
                ];
              }
            }
          }
        );
      });
    });
  });
});

export default function Destaques() {
  Key_Unica++;
  return (
    <>
      <div className="product-minimal">
        {Produtos_Em_Destaques.map((item) => {
          return (
            <div className="product-showcase" key={item.Categoria + Key_Unica}>
              <h2 className="title">{item.Categoria}</h2>
              <div className="showcase-wrapper">
                <div className="showcase-container">
                  {item.Produtos.map((item) => {
                    Key_Unica++;

                    return (
                      <div
                        className="showcase"
                        key={
                          item.Endereco_De_Imagem +
                          item.Nome_Do_Produto +
                          "Destaques" +
                          Key_Unica
                        }
                      >
                        <a
                          href={`#${item.Nome_Do_Produto.replace(/ /g, "_")}`}
                          className="showcase-img-box"
                        >
                          <img
                            src={
                              "img/Produtos/" +
                              item.Nome_Do_Produto +
                              Configuracoes_De_Extencao_De_Imagem
                            }
                            alt={item.Nome_Do_Produto}
                            width="70px"
                            className="showcase-img"
                          />
                        </a>
                        <div className="showcase-content">
                          <a
                            href={`#${item.Nome_Do_Produto.replace(/ /g, "_")}`}
                          >
                            <h4 className="showcase-title">
                              {item.Nome_Do_Produto}
                            </h4>
                          </a>
                          <a
                            href={`#${item.Nome_Do_Produto.replace(/ /g, "_")}`}
                            className="showcase-category"
                          >
                            {item.Sub_Categoria_Produto}
                          </a>
                          <div className="price-box">
                            <p className="price">{item.Preco}</p>
                            <del>{item.Sem_Desconto}</del>
                          </div>
                        </div>

                        <div>
                          <img
                            src={
                              item.Carimbo
                                ? `img/Carimbos/${item.Sub_Categoria_Produto}${Configuracoes_De_Extencao_De_Imagem_2}`
                                : `img/Carimbos/Sem_Carimbo${Configuracoes_De_Extencao_De_Imagem_2}`
                            }
                            width="50px"
                            style={{ backgroundColor: "#FDE9EB" }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
