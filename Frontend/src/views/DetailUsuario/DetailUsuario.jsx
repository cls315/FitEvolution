import NavPerfil from "./NavPerfil";
import styles from "./DetailUsuario.module.css"
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import profileUser from "../../components/SVG/profileUser.png"

const DetailUsuario = ()=>{

    const user = useSelector((state) => state.usuario)
    console.log("detail",user);

    const navigate = useNavigate();

    const closeSesion = ()=>{
        navigate('/')
    }

    return(
        <div>
            <NavPerfil />
            <div className={styles.allConteiner}>
                <div className={styles.infoConteiner}>
                    <img src={user.image ? user.image : profileUser} className={styles.perfil}/>
                    <h2 className={styles.nombre}>{user.forename} {user.surname ? user.surname : ""}</h2>
                    <h3 className={styles.email}>{user.email}</h3>
                    <h3 className={styles.nacionalidad}>Argentina</h3>
                    <button className={styles.btnCerrarSesion} onClick={()=>{closeSesion()}}>Cerrar Sesion</button>
                </div>
                <div className={styles.packsConteiner}>
                    <div className={styles.packsHeader}>
                        <h2>Tipo</h2>
                        <h2>Profesor</h2>
                        <h2>Dias</h2>
                        <h2>Vencimiento</h2>
                    </div>
                    <div className={styles.pack}>
                        <h2>Entrenamiento de fuerza</h2>
                        <h2>Juancito Perez</h2>
                        <h2>5 dias</h2>
                        <h2>7/01/2024</h2>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetailUsuario;