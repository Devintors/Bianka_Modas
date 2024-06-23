//#region Importação de Estilo
import "./style.css";
import "./Estilo_Navbar.css";
import "./Estilo_Cards.css";
import "./Estilo_Banner_De_Slides.css";
import "./Estilo_Fita_De_Loja.css";
//#endregion

//#region Importação de Componentes
import Header_Componente from "../../components/Header_Componente";
import Banner_Apresentacoes from "../../components/Banner_Apresentacoes";
import Categorias from "../../components/Categorias";
import Destaques from "../../components/Destaques";
import Esposicao_De_Produtos from "../../components/Esposicao_De_Produtos";
import Rodape from "../../components/Rodape";
//#endregion

export default function HomePage() {
  return (
    <div className="Corpo_Site">
      <Header_Componente />
      <Banner_Apresentacoes Banco_De_Banners="Bianka_Modas" />
      <div className="Corretor_De_Slides"></div>
      <Categorias />
      <div className="showcase">
        <div className="product-box">
          <Destaques />
          <Esposicao_De_Produtos />
        </div>
      </div>
      <Rodape />
    </div>
  );
}
