const Pacote_De_Configuracao_JSON = await fetch(
  "./data/Pacote_De_Configuracao.json"
);

const Pacote_De_Configuracao = await Pacote_De_Configuracao_JSON.json();

const Categorias_Geral = Pacote_De_Configuracao.Categorias;

const Produtos_Geral = Pacote_De_Configuracao.Produtos;

var Produto_Com_Categoria;

Produtos_Geral.forEach((item) => {
  Produto_Com_Categoria = item.Produtos;
});

Categorias_Geral.forEach((item) => {
  Produto_Com_Categoria.forEach((sub_item) => {
    if (item.Nome == sub_item.Categoria) {
      item.Quantia_De_Itens = sub_item.Produtos.length;
    }
  });
});

var Key_Unica = 0;

export default function Categoria_Itens() {
  Key_Unica++;
  return (
    <div className="category-item-container has-scrollbar">
      {Categorias_Geral.map((item) => {
        Key_Unica++;
        return (
          <div className="category-item" key={Key_Unica + "category-item"}>
            <div className="category-img-box">
              <img src={item.Local} alt={item.Alt} width="30px" />
            </div>
            <div className="category-content-box">
              <div className="category-content-flex">
                <h3 className="category-item-title">{item.Nome}</h3>
                <p className="category-item-amount">
                  {"(" + item.Quantia_De_Itens + ")"}
                </p>
              </div>
              <a href={item.Endereco} className="category-btn">
                Ver
              </a>
            </div>
          </div>
        );
      })}
    </div>
  );
}
