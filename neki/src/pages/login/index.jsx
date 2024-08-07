import { Checkbox, TextField } from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';
import "./index.css";
import React, { useEffect } from "react";
import RegisterLink from "../../components/RegisterLink";
import PasswordField from "../../components/PasswordField";
import { postLogin } from "../../service/Requisicoes";
import { saveData, clearLocalStorageItem, getFromLocalStorage } from "../../service/util";
import { useNavigate } from "react-router-dom";

function Login() {
  const [loading, setLoading] = React.useState(false);
  const [checked, setChecked] = React.useState(false);
  const [usuario, setUsuario] = React.useState('');
  const [senha, setSenha] = React.useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if(getFromLocalStorage('token')){
        navigate('/Skills')
    }
    const savedChecked = getFromLocalStorage('checked');
    if (savedChecked !== null && usuario !== null) {
      setChecked(JSON.parse(savedChecked));
    }
    const savedUser = getFromLocalStorage('user');
    if (savedUser) {
      setUsuario(savedUser);
    }
  }, []);

  function handleClick() {
    setLoading(true);
    try{
        postLogin(usuario, senha)
    }catch(error){
        console.log(error);
        alert("Falha no login!")
        setLoading(false);
    }
    setLoading(false);
    navigate('/Skills')
  }

  function handleCheck(event) {
    const isChecked = event.target.checked;
    setChecked(isChecked);
    saveData('checked', JSON.stringify(isChecked));

    if (isChecked) {
      saveData('user', usuario);
    } else {
      clearLocalStorageItem('user');
    }
  }

  return (
      
      <section className="sec">
        <h1>Login</h1>
        <TextField
          label="Usuario"
          color="primary"
          variant="outlined"
          value={usuario}
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
        <p>
        <Checkbox
          checked={checked}
          onChange={handleCheck}
          inputProps={{ 'aria-label': 'controlled' }}
          size="small"
        />
        Salvar usuário?
      </p>
      <p>Não tem uma conta? <RegisterLink /></p>
      </section>

  );
}

export default Login;
