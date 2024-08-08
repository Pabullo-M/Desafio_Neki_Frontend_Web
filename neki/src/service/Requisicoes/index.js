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
    api.delete(`/usuarioSkill/${skillId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
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
        },{
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.error(error);
        });
}

export const postLogin = async (usuario, senha) => {
  try {
    const response = await api.post('/usuario/login', { 
        usuario,
        senha
    });
    console.log(response.data.id);
    saveData('id', response.data.id);
    console.log(response.data.token);
    saveData('token', response.data.token);
    
    return { data: response.data, error: null };
  } catch (error) {
    let errorMessage = 'Erro desconhecido';

    if (error.response) {
      if (error.response.status === 401) {
        errorMessage = 'Usuário ou senha incorretos';
      } else {
        errorMessage = error.response.data.message || 'Erro desconhecido';
      }
    } else if (error.request) {
      errorMessage = 'Nenhuma resposta recebida do servidor';
    } else {
      errorMessage = error.message || 'Erro desconhecido';
    }

    console.error(errorMessage);

    return { data: null, error: errorMessage };
  }
};

export const postCadastroUsuario = async (usuario, senha) => {
  try {
    const response = await api.post('/usuario/cadastro', { 
        usuario,
        senha
    });
    return { data: response.data, error: null };
  } catch (error) {
    let errorMessage = 'Erro desconhecido';

    if (error.response) {
      errorMessage = error.response.data.message || 'Erro desconhecido';
    } else if (error.request) {
      errorMessage = 'Nenhuma resposta recebida do servidor';
    } else {
      errorMessage = error.message || 'Erro desconhecido';
    }

    return { data: null, error: errorMessage };
  }
};