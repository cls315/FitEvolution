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
                <Button onClick={()=>{setPageView(1)}}>Mis rutinas</Button>
                <Button onClick={()=>{nuevosPaquetes()}}>Nuevos paquetes</Button>
            </div>
        </div>
    )
}

export default NavPerfil;