import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { List, ListItem, ListItemText, CircularProgress, Typography, ListItemAvatar, Avatar } from '@mui/material';
import { DeleteUsuarioSkill, getUsuarioSkills } from '../../service/Requisicoes';
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
    const handleAlterar = ()=>{

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
                            <Avatar src={item.imgurl} alt={item.skillnome} />
                        </ListItemAvatar>
                        <ListItemText
                            primary={item.skillnome}
                            secondary={
                                <div>
                                    <p>{item.skilldescricao}</p>
                                    <p>Nível: {item.usuarioskilllevel}</p>
                                    <LoadingButton
                                        size="small"
                                        onClick={()=>{handleDelete(item.usuarioskillid)}}
                                        loading={loading}
                                        loadingPosition="center"
                                        variant="contained"
                                        >
                                        <span>Excluir</span>
                                    </LoadingButton>
                                    <LoadingButton
                                        size="small"
                                        onClick={handleAlterar}
                                        loading={loading}
                                        loadingPosition="center"
                                        variant="contained"
                                        >
                                        <span>Alterar level</span>
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
