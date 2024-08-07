import { Api } from "../Api";
import { getFromLocalStorage, saveData } from "../util";

const token = getFromLocalStorage('token');

const api = Api();

// api.get('/endpoint')
//     .then(response => {
//         console.log(response.data);
//     })
//     .catch(error => {
//         console.error(error);
//     });

export const getAllSkills = async () => {
    try {
      const response = await api.get('/skills', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar habilidades:', error);
      throw error;
    }
  };
export const getUsuarioSkills = async (usuarioId)=>{
    try {
        const response = await api.get(`/usuarioSkill/${usuarioId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar habilidades:', error);
      throw error;
    }
  };
  export const putUsuarioSkills = async (Id, levelAlterado)=>{
    try {
        const response = await api.put(`/usuarioSkill/${Id}`,
            levelAlterado
        , {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar habilidades:', error);
      throw error;
    }
  };

export const DeleteUsuarioSkill = (skillId)=>{
    api.delete(`/usuarioSkill/${skillId}`)
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.error(error);
        });

}


export const postCadastroSkills=(usuarioId, skillId, level)=>{
    api.post('/usuarioSkill/add', { 
        usuarioId,
        skillId,
        level
        })
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.error(error);
        });
}

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