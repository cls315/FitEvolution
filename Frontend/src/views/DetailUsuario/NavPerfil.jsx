import styles from "./NavPerfil.module.css"
import imageLogo from "../../images/imageLogo.jpg"
import { useNavigate } from 'react-router-dom';
import { Button } from "@mui/material";

const NavPerfil = ({setPageView})=>{

    const navigate = useNavigate()

    const nuevosPaquetes = ()=>{
        navigate('/homeusuario')
    }

    return(
        <div className={styles.nav}>
            <img src={imageLogo} className={styles.logo}/>
            <div className={styles.btnconteiner}>
                <button onClick={()=>{setPageView(4)}}>Mis entrenadores</button>
                <button onClick={()=>{setPageView(3)}}>Mis compras</button>
                <button onClick={()=>{setPageView(1)}}>Mis rutinas</button>
                <button onClick={()=>{nuevosPaquetes()}}>Nuevos paquetes</button>
            </div>
        </div>
    )
}

export default NavPerfil;