import React from "react";

const Pacote_De_Configuracao_JSON = await fetch(
  "./data/Pacote_De_Configuracao.json"
);

const Pacote_De_Configuracao = await Pacote_De_Configuracao_JSON.json();

const Configuracoes_Nav_Bar = Pacote_De_Configuracao.Navbar;

let Configuracoes_Dropdown;

Configuracoes_Nav_Bar.map((item) => {
  if (item.Dropdown_Itens) {
    Configuracoes_Dropdown = item.Dropdown_Itens;
  }
});

let Key_Unica = 0;
let Li_Key = 0;

export default function Dropdown() {
  let Teste_Final = Key_Unica + Li_Key + "Testada";
  Key_Unica++;
  return (
    <>
      {Configuracoes_Dropdown.map((item, index) => {
        Key_Unica++;
        Li_Key--;

        return (
          <li
            className="dropdown__item"
            key={`${Key_Unica}_dropdown_item_${index}_${Teste_Final}`}
          >
            <div
              className="nav__link"
              key={`${Key_Unica}_nav_link_div_${index}`}
            >
              {item.Nome_Lista}{" "}
              {item.Icon_Class ? <i className={item.Icon_Class}></i> : ""}
            </div>

            <ul
              className="dropdown__menu"
              key={`${Key_Unica}_${item.Nome_Lista}_${item.Icon_Class}_dropdown_menu_${index}`}
            >
              {item.Itens.map((sub_item, subIndex) => {
                Li_Key--;
                Key_Unica++;
                if (!sub_item.Endereco && !sub_item.Nome) {
                  Key_Unica++;
                  return (
                    <li
                      className="dropdown__subitem"
                      key={`${Key_Unica}_${sub_item.Nome}_${Li_Key}_dropdown_subitem_${Teste_Final}`}
                    >
                      {sub_item.Sub_Itens.map((sub_sub_item, subSubIndex) => {
                        Key_Unica++;
                        Li_Key--;
                        return (
                          <React.Fragment
                            key={`${Key_Unica}_${sub_sub_item.Nome}_fragment_${subSubIndex}`}
                          >
                            <div
                              className="dropdown__link"
                              key={`${Key_Unica}_${sub_sub_item.Nome}_dropdown_link_div_${subSubIndex}_metade`}
                            >
                              {sub_sub_item.Nome}{" "}
                              {sub_sub_item.Icon_Class ? (
                                <i
                                  className={sub_sub_item.Icon_Class}
                                  key={`Icone_Diferente_${Li_Key}_${sub_sub_item.Icon_Class}_Icone_usado_${subSubIndex}`}
                                ></i>
                              ) : (
                                ""
                              )}
                            </div>
                            <ul
                              className="dropdown__submenu"
                              key={`dropdown_submenu_${Key_Unica}_${subSubIndex}_ul`}
                            >
                              {sub_sub_item.Itens_Sub_Lista.map(
                                (sub_sub_sub_item, subSubSubIndex) => {
                                  Key_Unica++;
                                  Li_Key--;
                                  return (
                                    <li
                                      key={`${Li_Key}_dropdown_sublink_${Key_Unica}_li_retorno_com_link_${subSubSubIndex}`}
                                    >
                                      <a
                                        href={sub_sub_sub_item.Endereco}
                                        className="dropdown__sublink"
                                        key={`${Key_Unica}_link_com_sub_sub_sub_item_${subSubSubIndex}`}
                                      >
                                        {sub_sub_sub_item.Nome}
                                      </a>
                                    </li>
                                  );
                                }
                              )}
                            </ul>
                          </React.Fragment>
                        );
                      })}
                    </li>
                  );
                } else {
                  Key_Unica++;
                  return (
                    <li
                      key={`${sub_item.Nome}_li_junto_de_a_por_ultimo_${subIndex}`}
                    >
                      <a href={sub_item.Endereco} className="dropdown__link">
                        {sub_item.Nome}
                      </a>
                    </li>
                  );
                }
              })}
            </ul>
          </li>
        );
      })}
    </>
  );
}
