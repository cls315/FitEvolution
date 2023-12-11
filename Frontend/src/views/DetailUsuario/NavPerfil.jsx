import styles from "./NavPerfil.module.css"
import imageLogo from "../../images/imageLogo.jpg"
import { useNavigate } from 'react-router-dom';

const NavPerfil = ()=>{

    const navigate = useNavigate()

    const nuevosPaquetes = ()=>{
        navigate('/homeusuario')
    }

    return(
        <div className={styles.nav}>
            <img src={imageLogo} className={styles.logo}/>
            <div className={styles.btnconteiner}>
                <button onClick={()=>{nuevosPaquetes()}}>Nuevos paquetes</button>
            </div>
        </div>
    )
}

export default NavPerfil;