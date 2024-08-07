import { useEffect } from "react";
import { getFromLocalStorage } from "../../service/util";
import { useNavigate } from "react-router-dom";

function Skills(){
    const navigate = useNavigate();
    const token = getFromLocalStorage('token')
    
    useEffect(() => {
        if(!token){
            navigate('/')
        }
      }, []);
    return(
        <>
        
        </>
    )
}

export default Skills