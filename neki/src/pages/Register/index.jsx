import {TextField } from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';
import "./index.css"
import React, { useState } from "react";
import { postCadastroUsuario} from "../../service/Requisicoes";
import PasswordField from "../../components/PasswordField";
import Modal from "../../components/ModalSkills";
import { useNavigate } from "react-router-dom";

function Register(){
    const [loading, setLoading] = useState(false);
    const [usuario, setUsuario] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmaSenha, setConfirmaSenha] = React.useState('');
    const [isModalOpen, setModalOpen] = useState(false);
    const [responseCadastro, setResponseCadastro] = useState('');

    const navigate = useNavigate();
   

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    async function handleClick() {
        setLoading(true);
    
        if(!senha || !usuario){
            setResponseCadastro('Usuario ou senha inválidos, favor verificar!')
            setLoading(false);
            return openModal()
        }

        if (confirmaSenha !== senha) {
            setLoading(false);
            openModal();
            setResponseCadastro('As senhas devem ser iguais, favor verificar!');
            return;
        }

    
        const { data, error } = await postCadastroUsuario(usuario, senha);
    
        if (error) {
            setResponseCadastro(`Erro ao cadastrar usuário: ${error}`);
            openModal();
        } else {
            alert(data);
            navigate('/');
        }
    
        setLoading(false);
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
                <Modal className= "modalRegistro" isOpen={isModalOpen} onClose={closeModal}>
                    <h1>Aviso!</h1>
                    <h2>{responseCadastro}</h2>
                </Modal>
            </section>
    )
}

export default Register