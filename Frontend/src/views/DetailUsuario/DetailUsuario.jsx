import NavPerfil from "./NavPerfil";
import styles from "./DetailUsuario.module.css"
import {useState} from "react"
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import profileUser from "../../components/SVG/profileUser.png"

const DetailUsuario = ()=>{

    const user = useSelector((state) => state.usuario)
    const allTrainers = useSelector((state)=> state.allTrainers)
    const misEntrenadores = []
    for(let i = 0; i < user.myTrainers.length; i++){
        const filterTrainers = allTrainers.find((trainer) => trainer.id == user.myTrainers[i])
        misEntrenadores.push(filterTrainers);
    }

    const [pageView, setPageView] = useState(1)
    const [rutina, setRutina] = useState();
    console.log("detail",user);

    const navigate = useNavigate();

    const closeSesion = ()=>{
        navigate('/')
    }

    
    const verRutina = (id)=>{
        const routine = misEntrenadores.find((trainer) => trainer.rutinaPredeterminada[0].id == id)
        setRutina(routine.rutinaPredeterminada[0])
        setPageView(2)
    }
console.log("RUTINA ----------------->", rutina);
    return(
        <div>
            <NavPerfil setPageView={setPageView}/>
            <div className={styles.allConteiner}>
                <div className={styles.infoConteiner}>
                    <img src={user.image !== null ? user.image : profileUser} className={styles.perfil}/>
                    <h2 className={styles.nombre}>{user.forename} {user.surname ? user.surname : ""}</h2>
                    <h3 className={styles.email}>{user.email ? user.email : ""}</h3>
                    <h3 className={styles.nacionalidad}>Argentina</h3>
                    <button className={styles.btnCerrarSesion} onClick={()=>{closeSesion()}}>Cerrar Sesion</button>
                </div>
                {pageView == 1 ?
                <div className={styles.packsConteiner}>
                    <h1>MIS RUTINAS</h1>
                    <div className={styles.packsHeader}>
                        <h2>Tipo</h2>
                        <h2>Profesor</h2>
                        <h2>Tiempo</h2>
                    </div>
                    {misEntrenadores.length>0 ? misEntrenadores?.map((trainer)=>(
                    <div className={styles.pack} onClick={()=> {verRutina(trainer.rutinaPredeterminada[0].id)}}>
                        <h2>{trainer.rutinaPredeterminada[0].enfoque}</h2>
                        <h2>{trainer.forename}</h2>
                        <h2>{trainer.rutinaPredeterminada[0].totalDuration}</h2>
                    </div>
                    )):
                    <div className={styles.pack}>
                        <h2>No tienes rutinas adquiridas</h2>
                    </div>
                    }
                </div>
                 :
                <div className={styles.packsConteiner}>
                    <div className={styles.rutinaConteiner}>
                        <div className={styles.rutinaInfo}>
                           <h2>Enfoque: {rutina.enfoque}</h2>
                           <h2>Duracion: {rutina.totalDuration}</h2>
                           <h2>Ejercicios:</h2>
                           {/* <div className={styles.tablaConteiner}>
                            <div className={styles.ejercicio}>
                            <h3 >Nombre</h3>
                            <h3>Area a estimular</h3>
                            </div>
                           {rutina.exerc?.map((ejercicio) => (
                            <div className={styles.ejercicio}>
                                <h3>{ejercicio.name}</h3>
                                {ejercicio.muscle_trained.map((muscle)=>(
                                    <h3>{muscle}</h3>
                                ))}
                            </div>
                           ))}
                           </div> */}
                           <table className={styles.table}>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Areas a Ejercitar</th>
        </tr>
      </thead>
      <tbody>
        {rutina.exerc?.map((ejercicio, index) => (
          <tr key={index}>
            <td>{ejercicio.name}</td>
            <td>{ejercicio.muscle_trained.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
                        </div>
                        <div className={styles.rutinaIMG}>
                           <img src={rutina.image}/>
                        </div>
                    </div>
                </div>
                }
            </div>
        </div>
    )
}

export default DetailUsuario;