import { Api } from "../Api";
import { saveData } from "../util";

const api = Api();

// api.get('/endpoint')
//     .then(response => {
//         console.log(response.data);
//     })
//     .catch(error => {
//         console.error(error);
//     });

    export const postLogin=(usuario, senha)=>{
        api.post('/usuario/login', { 
            usuario,
            senha
         })
            .then(response => {
                console.log(response.data.id);
                saveData('id',response.data.id)
                console.log(response.data.token)
                saveData('token',response.data.token)
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