import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { List, ListItem, ListItemText, Typography, ListItemAvatar, Avatar, TextField} from '@mui/material';
import { DeleteUsuarioSkill, getAllSkills, getUsuarioSkills, postCadastroSkills, putUsuarioSkills } from '../../service/Requisicoes';
import { getFromLocalStorage } from '../../service/util';
import { LoadingButton } from '@mui/lab';
import './index.css'
import img from '../../assets/img/vazio.png'
import Modal from '../../components/ModalSkills';

function Skills() {
    const navigate = useNavigate();
    const token = getFromLocalStorage('token');
    const usuarioId = getFromLocalStorage('id');
    const [data, setData] = useState([]);
    const [dataSkill, setDataSkill] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [atualizarTela, setAtualizarTela] = useState(true);
    const [alterarLevel, setAlterarLevel] = useState(true);
    const [editItemId, setEditItemId] = useState(null);
    const [novoLevel, setNovoLevel] = useState(null);
    const [isModalOpen, setModalOpen] = useState(false);
    const [levels, setLevels] = useState("");

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    useEffect(() => {
        if (!token) {
            navigate('/');
            return;
        }
        getAllSkills()
            .then(data => {
                setDataSkill(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err);
                setLoading(false);
            });

        getUsuarioSkills(usuarioId)
            .then(data => {
                setData(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err);
                setLoading(false);
            });
    }, [navigate, token, atualizarTela, ]);



    if (error) {
        return <div>Error: {error.message}</div>;
    }

    const handleDelete = (id)=>{
        DeleteUsuarioSkill(id);
        setAtualizarTela(!atualizarTela);
    }
    const handleAlterar = (skillId, levelAlterado)=>{
        putUsuarioSkills(skillId, levelAlterado);
        setAtualizarTela(!atualizarTela);
        setEditItemId(null);
    }
    const handleCancelaAlteracao = () =>{
        setEditItemId('');
        setAlterarLevel(true);
    }
    const handleAddLevel = (itemId) => {
      postCadastroSkills(usuarioId, itemId, levels)
      setLevels('');
      setAtualizarTela(!atualizarTela)
    }
    return (
        <main className='containerPrincipal'>
          {!data.length==0?
          <>
          <Typography variant="h3" gutterBottom>
            Minhas Skills
          </Typography>
          <List>
            {data.map(item => (
              <ListItem key={item.usuarioskillid} className="MuiListItem-root">
                <ListItemAvatar className="MuiListItemAvatar-root">
                  <Avatar src={item.imgurl || 'https://via.placeholder.com/100'} alt={item.skillnome} sx={{ width: 100, height: 100 }} />
                </ListItemAvatar>
                <ListItemText
                  primary={item.skillnome}
                  secondary={
                    <div>
                      <p>{item.skilldescricao}</p>
                      {alterarLevel && editItemId !== item.usuarioskillid ? (
                        <p>Nível: {item.usuarioskilllevel}</p>
                      ) : (
                        <TextField
                          size='small'
                          label="Alterar level"
                          color="primary"
                          variant="outlined"
                          value={novoLevel}
                          onChange={(event) => setNovoLevel(event.target.value)}
                        />
                      )}
                      <div className="button-group">
                        {editItemId === item.usuarioskillid ? (
                          <LoadingButton
                            size="small"
                            onClick={() => { handleAlterar(item.usuarioskillid, novoLevel) }}
                            loading={loading}
                            loadingPosition="center"
                            variant="contained"
                          >
                            <span>Confirmar</span>
                          </LoadingButton>
                        ) : (
                          <LoadingButton
                            size="small"
                            onClick={() => setEditItemId(item.usuarioskillid)}
                            loading={loading}
                            loadingPosition="center"
                            variant="contained"
                          >
                            Editar
                          </LoadingButton>
                        )}
                        <LoadingButton
                          size="small"
                          onClick={alterarLevel && editItemId !== item.usuarioskillid ? () => handleDelete(item.usuarioskillid) : handleCancelaAlteracao}
                          loading={loading}
                          loadingPosition="center"
                          variant="contained"
                        >
                          {alterarLevel && editItemId !== item.usuarioskillid ? <span>Excluir</span> : <span>Cancelar</span>}
                        </LoadingButton>
                      </div>
                    </div>
                  }
                />
              </ListItem>
            ))}
          </List>
          </>: <div>
                <h1>Lista Vazia</h1>
                <img
                    src={img}
                />
          </div>}
          <button
          className='botao'
          onClick={openModal}
          >
            Adicionar Skill
          </button>
          <Modal isOpen={isModalOpen} onClose={closeModal}>
            <div>
                <Typography variant="h4" gutterBottom>
                    Skills
                </Typography>
                <List>
                    {dataSkill.map(item => (
                          <ListItem key={item.id}>
                              <ListItemAvatar>
                                  <Avatar src={item.imgUrl} alt={item.nome} />
                              </ListItemAvatar>
                              <ListItemText
                                  primary={item.nome}
                                  secondary={item.descricao}
                              />
                            <TextField
                                size='small'
                                label="Incluir Level"
                                color="primary"
                                variant="outlined"
                                value={levels|| ''}
                                onChange={(event) => setLevels(event.target.value)}
                            />
                            <LoadingButton
                                size="small"
                                onClick={() => handleAddLevel(item.id)}
                                loading={loading[item.id] || false}
                                loadingPosition="center"
                                variant="contained"
                            >
                                Adicionar
                            </LoadingButton>
                          </ListItem>
                    ))}
                </List>
            </div>
          </Modal>
        </main>
      );
}

export default Skills;
