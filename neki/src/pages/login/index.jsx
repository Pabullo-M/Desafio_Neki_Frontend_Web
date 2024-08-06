import { TextField } from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';
import "./index.css"
import React from "react";
import RegisterLink from "../../components/RegisterLink";
import PasswordField from "../../components/PasswordField";

function Login(){
    const [loading, setLoading] = React.useState(false);
    function handleClick() {
      setLoading(true);
    }



    return(
        <>
            <h1>Login</h1>

            <section>
                <TextField 
                    label="Usuario" 
                    color="primary" 
                    variant="outlined"
                />
                <PasswordField
                label="Senha"
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