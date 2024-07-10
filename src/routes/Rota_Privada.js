import { Navigate, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import bcrypt from "bcryptjs";

var Chances_De_Acertar_A_Senha = 3;

export default function Rota_Privada() {
  const [acessoAdmin, setAcessoAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const Senha_Hash =
    "$2a$10$vmEjiZsBrS5e8OHoQurJWeY2GvzSGbDLhgFAs6MXDFTyPwJaqSJwG";
  const Autenticacao_Hash =
    "$2a$10$MDhziOwC.oh7DQf1WJ.hfuR1CM5kGc7wVjwr7EQSzXu4aSJHh.R/a";

  useEffect(() => {
    const validarLogin = async () => {
      var token = localStorage.getItem("token");

      var Token_Validador = token
        ? await bcrypt.compare(token, Autenticacao_Hash)
        : false;

      if (Token_Validador) {
        setAcessoAdmin(true);
        setIsLoading(false);
        return;
      }

      while (Chances_De_Acertar_A_Senha > 0) {
        var senhaParaLiberacao = prompt("Digite a senha: ");
        if (!senhaParaLiberacao) {
          break;
        }
        var liberacao = await bcrypt.compare(senhaParaLiberacao, Senha_Hash);
        if (liberacao) {
          localStorage.setItem(
            "token",
            atob("YUFsUEZZclVzN25BdmZaVkc2NjhjY2RmODIzODAz")
          );
          setAcessoAdmin(true);
          setIsLoading(false);
          return;
        } else {
          Chances_De_Acertar_A_Senha--;
          alert(
            "Senha errada! Restam apenas " +
              Chances_De_Acertar_A_Senha +
              " tentativas"
          );
        }
      }

      setIsLoading(false);
    };

    validarLogin();
  }, []);

  if (isLoading) {
    return <div>Validando informações...</div>;
  }

  return acessoAdmin ? <Outlet /> : <Navigate to="/" />;
}
