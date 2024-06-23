//#region Importação de hooks
import { useState, useEffect } from "react";
//#endregion

//#region Importação de Bibliotecas
import Cookies from "js-cookie";
//#endregion

//#region Importação de Componentes
import Sub_Categorias_Em_Circulo from "./Esposicao_De_Produtos/Sub_Categorias_Em_Circulo";
//#endregion

//#region Configuracoes
const Pacote_De_Configuracao_JSON = await fetch(
  "./data/Pacote_De_Configuracao.json"
);

const Pacote_De_Configuracao = await Pacote_De_Configuracao_JSON.json();

var Numero_De_Contato = Pacote_De_Configuracao.Numero_De_Contato;

const Configuracoes_Geral = Pacote_De_Configuracao.Extencoes_De_Arquivo;

var Configuracoes_De_Extencao_De_Imagem;

Configuracoes_Geral.forEach((item) => {
  Configuracoes_De_Extencao_De_Imagem = item.Imagem;
});

const Produtos_Geral = Pacote_De_Configuracao.Produtos;

var Produto_Com_Categoria;

Produtos_Geral.forEach((item) => {
  Produto_Com_Categoria = item.Produtos;
});

var Key_Unica = 0;
//#endregion

export default function Esposicao_De_Produtos() {
  //#region useStates
  const [Filtro_Teste_Geral, setFiltro_Teste_Geral] = useState([
    {
      Categoria: "",
      Filtro: "",
    },
  ]);

  const [Tamanho_De_Roupa, setTamanho_De_Roupa] = useState();

  const [Tamanho_De_Roupa_Escolhido, setTamanho_De_Roupa_Escolhido] = useState(
    []
  );
  //#endregion

  //#region Funções
  const Filtrar_Elemento_Da_Categoria = (Categoria, Filtro) => {
    setFiltro_Teste_Geral([{ Categoria: Categoria, Filtro: Filtro }]);
  };
  //#endregion

  //#region Salvamento em Cookies
  useEffect(() => {
    if (Tamanho_De_Roupa_Escolhido != "") {
      Cookies.set(
        "Tamanho_De_Roupa_Escolhido",
        JSON.stringify(Tamanho_De_Roupa_Escolhido),
        {
          expires: 30,
        }
      );
    }
  }, [[Tamanho_De_Roupa_Escolhido]]);
  //#endregion

  //#region Recuperação de Cookies
  useEffect(() => {
    if (Cookies.get("Tamanho_De_Roupa_Escolhido")) {
      setTamanho_De_Roupa_Escolhido(
        JSON.parse(Cookies.get("Tamanho_De_Roupa_Escolhido"))
      );
    }
  }, []);

  //#endregion

  //#region Retornos Padronizados
  var Card_Do_Produto_Padrao = (sub_item) => {
    var Teste_De_Tamanho_Ja_Encontrado = false;
    Key_Unica++;
    return (
      <div
        className={
          sub_item.Class_Item_Vazio
            ? "product-card " + sub_item.Class_Item_Vazio
            : "product-card"
        }
        key={
          "sub_item_product-card" + sub_item.Sub_Categoria_Produto + Key_Unica
        }
      >
        <div className="ribbon">
          <span
            className={
              "Faixa_De_Categoria_" +
              sub_item.Sub_Categoria_Produto +
              sub_item.Nome_Do_Produto
            }
            style={{
              whiteSpace: "nowrap",
            }}
          >
            <p
              style={{
                fontSize: "100%",
              }}
            >
              {sub_item.Sub_Categoria_Produto}
            </p>
          </span>
        </div>
        <div className="product-image">
          <img
            src={
              "img/Produtos/" +
              sub_item.Nome_Do_Produto +
              Configuracoes_De_Extencao_De_Imagem
            }
            id={
              sub_item.Nome_Do_Produto
                ? sub_item.Nome_Do_Produto.replace(/ /g, "_")
                : ""
            }
            alt={sub_item.Nome_Do_Produto}
          />
        </div>
        <div className="product-content">
          <h2 style={{ height: "48px", overflow: "hidden" }}>
            {sub_item.Nome_Do_Produto}
          </h2>
          <p className="price">{sub_item.Preco}</p>
          <div className="size-guide">
            <button
              className="btn show-sizes-btn"
              onClick={() => {
                if (
                  Tamanho_De_Roupa ==
                  sub_item.Sub_Categoria_Produto +
                    " " +
                    sub_item.Nome_Do_Produto
                ) {
                  setTamanho_De_Roupa();
                } else {
                  setTamanho_De_Roupa(
                    sub_item.Sub_Categoria_Produto +
                      " " +
                      sub_item.Nome_Do_Produto
                  );
                }
              }}
            >
              {Tamanho_De_Roupa_Escolhido.map((item_tamanho) => {
                if (!Teste_De_Tamanho_Ja_Encontrado) {
                  if (
                    item_tamanho.Nome_Do_Produto_Referente ==
                    sub_item.Nome_Do_Produto
                  ) {
                    Teste_De_Tamanho_Ja_Encontrado = true;
                    return item_tamanho.Tamanho_De_Roupa_Referente;
                  }
                }
              })}

              {!Teste_De_Tamanho_Ja_Encontrado ? "TM" : ""}
            </button>
            <div
              className="sizes-list hidden"
              style={
                Tamanho_De_Roupa ==
                sub_item.Sub_Categoria_Produto + " " + sub_item.Nome_Do_Produto
                  ? {
                      display: "block",
                    }
                  : {}
              }
            >
              <p>
                <strong>Tamanhos disponíveis</strong>
              </p>
              <ul>
                {sub_item.Tamanhos &&
                  sub_item.Tamanhos.map((item) => {
                    return (
                      <li
                        key={item}
                        value={JSON.stringify(item)
                          .replace('"', "")
                          .replace('"', "")}
                        onClick={() => {
                          setTamanho_De_Roupa();

                          if (Tamanho_De_Roupa_Escolhido.length) {
                            var Validador_De_Itens_Repetidos = true;
                            Tamanho_De_Roupa_Escolhido.map(
                              (verificador_de_item) => {
                                if (
                                  verificador_de_item.Nome_Do_Produto_Referente ==
                                  sub_item.Nome_Do_Produto
                                ) {
                                  Validador_De_Itens_Repetidos = false;

                                  var Tamanho_De_Roupa_Escolhido_Objeto_Manipulavel =
                                    Tamanho_De_Roupa_Escolhido;

                                  Tamanho_De_Roupa_Escolhido_Objeto_Manipulavel.map(
                                    (item_manipulavel) => {
                                      if (
                                        item_manipulavel.Nome_Do_Produto_Referente ==
                                        sub_item.Nome_Do_Produto
                                      ) {
                                        item_manipulavel.Tamanho_De_Roupa_Referente =
                                          JSON.stringify(item)
                                            .replace('"', "")
                                            .replace('"', "");
                                      }
                                    }
                                  );

                                  setTamanho_De_Roupa_Escolhido(
                                    Tamanho_De_Roupa_Escolhido_Objeto_Manipulavel
                                  );
                                }
                              }
                            );
                            if (Validador_De_Itens_Repetidos) {
                              setTamanho_De_Roupa_Escolhido([
                                ...Tamanho_De_Roupa_Escolhido,
                                {
                                  Nome_Do_Produto_Referente:
                                    sub_item.Nome_Do_Produto,
                                  Tamanho_De_Roupa_Referente: JSON.stringify(
                                    item
                                  )
                                    .replace('"', "")
                                    .replace('"', ""),
                                },
                              ]);
                            }
                          } else {
                            setTamanho_De_Roupa_Escolhido([
                              {
                                Nome_Do_Produto_Referente:
                                  sub_item.Nome_Do_Produto,
                                Tamanho_De_Roupa_Referente: JSON.stringify(item)
                                  .replace('"', "")
                                  .replace('"', ""),
                              },
                            ]);
                          }
                        }}
                      >
                        {JSON.stringify(item).replace('"', "").replace('"', "")}
                      </li>
                    );
                  })}
              </ul>
            </div>
          </div>
          <button
            className="btn buy-btn"
            onClick={() => {
              window.open(
                "https://wa.me/" +
                  Numero_De_Contato +
                  "?text=Queria%20saber%20mais%20informa%C3%A7%C3%B5es%20sobre%20o%20produto%3A%20" +
                  sub_item.Nome_Do_Produto.replace(/ /g, "%20"),
                "_blank"
              );
            }}
          >
            Mais informações
          </button>
        </div>
      </div>
    );
  };
  //#endregion

  return (
    <>
      {Produto_Com_Categoria.map((item) => {
        var Teste_De_Impar_Par = item.Produtos.length % 2 === 0;
        if (!Teste_De_Impar_Par && item.Produtos.length < 12) {
          item.Produtos.push({
            Class_Item_Vazio: "Class_Item_Vazio",
          });
        }
        return (
          <div
            className="Conjunto_Categoria"
            key={"Conjunto_Categoria" + item.Categoria + item.Produtos.length}
          >
            <span
              id={"Conjunto_Categoria_" + item.Categoria}
              style={{
                top: "-100px",
                position: "relative",
                opacity: 0,
                zIndex: -999,
              }}
            >
              .
            </span>
            <h1 className="Espaco_Para_Melhor_Interface_Title">
              {item.Categoria + " "}
              <p className="Espaco_Para_Melhor_Interface_Resultado">
                {item.Produtos.length} resultados
              </p>
            </h1>

            <Sub_Categorias_Em_Circulo
              Funcao_Onclick={Filtrar_Elemento_Da_Categoria}
              Categoria_Sendo_Enviada={item.Categoria}
            />

            <div
              className="Produto"
              style={{
                height: "932px",
                overflowX: "auto",
                flexDirection: "column",
              }}
              key={"Produto" + item.Categoria + item.Produtos.length}
            >
              {item.Produtos.map((sub_item) => {
                var Filtro_Teste;
                var Filtro_Teste_Categoria;
                Filtro_Teste_Geral.map((item_Filtro_Teste) => {
                  Filtro_Teste = item_Filtro_Teste.Filtro;
                  Filtro_Teste_Categoria = item_Filtro_Teste.Categoria;
                });
                if (
                  (Filtro_Teste && Filtro_Teste_Categoria == item.Categoria) ||
                  sub_item.Class_Item_Vazio
                ) {
                  if (
                    sub_item.Sub_Categoria_Produto == Filtro_Teste ||
                    sub_item.Class_Item_Vazio
                  ) {
                    return Card_Do_Produto_Padrao(sub_item);
                  }
                } else {
                  return Card_Do_Produto_Padrao(sub_item);
                }
              })}
            </div>
          </div>
        );
      })}
    </>
  );
}
