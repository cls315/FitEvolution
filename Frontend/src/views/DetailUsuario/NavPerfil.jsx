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
<<<<<<< HEAD
                <button onClick={()=>{setPageView(4)}}>Mis entrenadores</button>
                <button onClick={()=>{setPageView(3)}}>Mis compras</button>
                <button onClick={()=>{setPageView(1)}}>Mis rutinas</button>
                <button onClick={()=>{nuevosPaquetes()}}>Nuevos paquetes</button>
=======
                <Button variant="contained" color="info" onClick={()=>{setPageView(3)}}>Mis compras</Button>
                <Button variant="contained" color="primary" onClick={()=>{setPageView(1)}}>Mis rutinas</Button>
                <Button variant="contained" color="success" onClick={()=>{nuevosPaquetes()}}>Nuevos paquetes</Button>
>>>>>>> ed57185f020dc60afe725b0481a25924df2a4f4f
            </div>
        </div>
    )
}

export default NavPerfil;