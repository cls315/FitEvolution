import styles from "./NavPerfil.module.css"
import imageLogo from "../../images/imageLogo.jpg"
import { useNavigate } from 'react-router-dom';
import { Button } from "@mui/material";

const NavPerfil = ()=>{

    const navigate = useNavigate()

    const nuevosPaquetes = ()=>{
        navigate('/homeusuario')
    }

    return(
        <div className={styles.nav}>
            <img src={imageLogo} className={styles.logo}/>
            <div className={styles.btnconteiner}>
                <Button variant="contained" onClick={()=>{nuevosPaquetes()}}>Nuevos paquetes</Button>
            </div>
        </div>
    )
}

export default NavPerfil;