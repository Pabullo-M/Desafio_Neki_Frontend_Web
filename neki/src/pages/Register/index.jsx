import {TextField } from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';
import "./index.css"
import React from "react";
import { postCadastroUsuario} from "../../service/Requisicoes";
import PasswordField from "../../components/PasswordField";

function Register(){
    const [loading, setLoading] = React.useState(false);
    const [usuario, setUsuario] = React.useState('');
    const [senha, setSenha] = React.useState('');
    const [confirmaSenha, setConfirmaSenha] = React.useState('');
    const [token, setToken] = React.useState('');

    function handleClick() {
      setLoading(true);
      if(confirmaSenha !== senha){
        setLoading(false)
        return alert("As senhas devem ser iguais")

      }
      setToken(postCadastroUsuario(usuario, senha))
      console.log(token + "aloo");
      setLoading(false)
    }



    return(

            <section>
                <h1>Cadastro</h1>
                <TextField 
                    label="Usuario" 
                    color="primary" 
                    variant="outlined"
                    onChange={(event) => setUsuario(event.target.value)}
                />
                <PasswordField
                    type="password"
                    label="Senha" 
                    color="primary" 
                    variant="outlined"
                    onChange={(event) => setSenha(event.target.value)}
                />
                <PasswordField
                    type="password"
                    label="Confirmar senha" 
                    color="primary" 
                    variant="outlined"
                    onChange={(event) => setConfirmaSenha(event.target.value)}
                />
                <LoadingButton
                    size="large"
                    onClick={handleClick}
                    loading={loading}
                    loadingPosition="center"
                    variant="contained"
                    >
                        <span>Registrar-se</span>
                </LoadingButton>
            </section>
    )
}

export default Register