import { Api } from "../Api";

const api = Api();

api.get('/endpoint')
    .then(response => {
        console.log(response.data);
    })
    .catch(error => {
        console.error(error);
    });

    export const postLogin=(usuario, senha)=>{
        api.post('/usuario/login', { 
            usuario,
            senha
         })
            .then(response => {
                console.log(response.data);
                return response.data;
            })
            .catch(error => {
                console.error(error);
            });
    }

    export const postCadastroUsuario=(usuario, senha)=>{
        api.post('/usuario/cadastro', { 
            usuario,
            senha
         })
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }