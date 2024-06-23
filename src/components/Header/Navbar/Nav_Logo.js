const Pacote_De_Configuracao_JSON = await fetch(
  "./data/Pacote_De_Configuracao.json"
);

const Pacote_De_Configuracao = await Pacote_De_Configuracao_JSON.json();

const Configuracoes_Nav_Bar = Pacote_De_Configuracao.Navbar;

export default function Nav_Logo() {
  return (
    <>
      {Configuracoes_Nav_Bar.map((item) => {
        return (
          <a href="#" className="nav__logo" key={item.Nome_Loja}>
            <img
              className={"Logo-" + item.Nome_Loja_Class}
              src={item.Logo_Img}
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
          </a>
        );
      })}
    </>
  );
}
