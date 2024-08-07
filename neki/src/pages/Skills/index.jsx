import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { List, ListItem, ListItemText, CircularProgress, Typography, ListItemAvatar, Avatar, TextField} from '@mui/material';
import { DeleteUsuarioSkill, getUsuarioSkills, putUsuarioSkills } from '../../service/Requisicoes';
import { getFromLocalStorage } from '../../service/util';
import { LoadingButton } from '@mui/lab';

function Skills() {
    const navigate = useNavigate();
    const token = getFromLocalStorage('token');
    const usuarioId = getFromLocalStorage('id');
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [atualizarTela, setAtualizarTela] = useState(true);
    const [alterarLevel, setAlterarLevel] = useState(true);
    const [editItemId, setEditItemId] = useState(null);
    const [novoLevel, setNovoLevel] = useState(null);


    useEffect(() => {
        if (!token) {
            navigate('/');
            return;
        }

        getUsuarioSkills(usuarioId)
            .then(data => {
                setData(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err);
                setLoading(false);
            });
    }, [navigate, token, atualizarTela]);



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
    return (
        <div>
            <Typography variant="h4" gutterBottom>
                Minhas Skills
            </Typography>
            <List>
                {data.map(item => (
                    <ListItem key={item.usuarioskillid}>
                        <ListItemAvatar>
                            <Avatar src={item.imgurl || 'https://via.placeholder.com/40'} alt={item.skillnome} />
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
                                    {editItemId === item.usuarioskillid ? (
                                        <div>
                                            <LoadingButton
                                                size="small"
                                                onClick={()=>{handleAlterar(item.usuarioskillid, novoLevel)}}
                                                loading={loading}
                                                loadingPosition="center"
                                                variant="contained"
                                            >
                                                <span>Confirmar</span>
                                            </LoadingButton>
                                        </div>
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
                                        onClick={alterarLevel && editItemId !== item.usuarioskillid  ? () => handleDelete(item.usuarioskillid) : handleCancelaAlteracao}
                                        loading={loading}
                                        loadingPosition="center"
                                        variant="contained"
                                    >
                                        {alterarLevel && editItemId !== item.usuarioskillid  ? <span>Excluir</span> : <span>Cancelar</span>}
                                    </LoadingButton>
                                </div>
                            }
                        />
                    </ListItem>
                ))}
            </List>
        </div>
    );
}

export default Skills;
