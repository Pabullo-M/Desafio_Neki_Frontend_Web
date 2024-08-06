import { Alert, TextField } from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';
import "./index.css"
import React from "react";
import RegisterLink from "../../components/RegisterLink";
import PasswordField from "../../components/PasswordField";
import { postLogin } from "../../service/Requisicoes";

function Login(){
    const [loading, setLoading] = React.useState(false);
    const [usuario, setUsuario] = React.useState('');
    const [senha, setSenha] = React.useState('');
    const [token, setToken] = React.useState('');

    function handleClick() {
      setLoading(true);
      setToken(postLogin(usuario, senha))
      console.log(token + "aloo");
      setLoading(false)
    }



    return(
        <>
            <h1>Login</h1>

            <section>
                <TextField 
                    label="Usuario" 
                    color="primary" 
                    variant="outlined"
                    onChange={(event) => setUsuario(event.target.value)}
                />
                <PasswordField
                    label="Senha"
                    onChange={(event) => setSenha(event.target.value)}
                />
                <LoadingButton
                    size="large"
                    onClick={handleClick}
                    loading={loading}
                    loadingPosition="center"
                    variant="contained"
                    >
                        <span>Login</span>
                </LoadingButton>
            </section>
            <p>Não tem uma conta? <RegisterLink /></p>
        </>
    )
}

export default Login