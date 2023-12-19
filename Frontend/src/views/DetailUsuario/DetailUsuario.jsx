import NavPerfil from "./NavPerfil";
import styles from "./DetailUsuario.module.css"
import {useState, react, useEffect} from "react"
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useSelector, useDispatch } from "react-redux";
import { enviarPuntaje, getTrainers } from "../../components/redux/actions/actions";
import profileUser from "../../components/SVG/profileUser.png"
import Rating from '@mui/material/Rating';


const DetailUsuario = ()=>{

    const dispatch = useDispatch()
    const user = useSelector((state) => state.usuario)
    const allTrainers = useSelector((state)=> state.allTrainers)
    const misEntrenadores = []
    for(let i = 0; i < user.myTrainers.length; i++){
        const filterTrainers = allTrainers.find((trainer) => trainer.id == user.myTrainers[i])
        misEntrenadores.push(filterTrainers);
    }

    
    const [pageView, setPageView] = useState(1)
    const [rutina, setRutina] = useState();
    const [viewTrainer, setViewTrainer] = useState();
    const [puntuar, setPuntuar] = useState(1);
    const [score, setScore] = useState("")
    const [refresh, setRefresh] = useState(0)
    
    const navigate = useNavigate();
    
    const closeSesion = ()=>{
        navigate('/')
    }
    
    const verTrainer = (id)=>{
        const trainer = misEntrenadores.find((trainer)=>trainer.id == id)
        setViewTrainer(trainer)
        setScore(trainer.score)
        setPageView(5)
    }
    
    const verRutina = (id)=>{
        const routine = misEntrenadores.find((trainer) => trainer.rutinaPredeterminada[0].id == id)
        setRutina(routine.rutinaPredeterminada[0])
        setPageView(2)
    }

    const handleRatingChange = async (event, value) => {
        console.log("VALUE", value);
        dispatch(enviarPuntaje(viewTrainer.id, value));
        setRefresh(refresh +1)
        setPuntuar(1)
        Swal.fire(`Puntaje enviado con exito`, ``,`success`)
        setPageView(1)
      };

useEffect(()=>{
    dispatch(getTrainers())
    console.log("hola");
},[refresh])

    console.log("MI ENTRENADORES ------------->", misEntrenadores);
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
                 : pageView == 2 ?
                    <div className={styles.packsConteiner}>
                        <div className={styles.rutinaConteiner}>
                            <div className={styles.rutinaInfo}>
                               <h2>Enfoque: {rutina.enfoque}</h2>
                               <h2>Duracion: {rutina.totalDuration}</h2>
                               <h2>Ejercicios:</h2>
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
                     : pageView == 3 ?
                      <div className={styles.packsConteiner}>
                       {user.backups?.map((comprobante) => {
                        const dateString = comprobante[0];
                        const shortString = dateString.slice(0, 10);
                        const formattedDateString = shortString.split("-").reverse().join("-");
                            return (
                            <div className={styles.pack} >
                              <h2>Pack con: {comprobante[4]}</h2>
                              <h2>Valor de: {comprobante[2]}{comprobante[3]}</h2>
                              <h2>Adquirido en la fecha: {formattedDateString}</h2>
                            </div>
                            );})}
                      </div> 
                      : pageView == 4 ?
                       <div className={styles.packsConteiner}>
                        {misEntrenadores?.map((trainer)=>(
                            <div className={styles.pack} onClick={()=>{verTrainer(trainer.id)}}>
                                <h3>{trainer.forename} {trainer.surname}</h3>
                                <h3>Enfoque en: {trainer.focusTr}</h3>
                                <h3>Nacionalidad: {trainer.nationality}</h3>
                                <h3>Click aqui para ver mas informacion</h3>
                            </div>
                        ))}
                       </div> 
                       : pageView == 5 ?
                        <div className={styles.packsConteiner}>
                            <div className={styles.trainerConteiner}>
                                <div className={styles.trainerInfo}>
                                    <h3>Nombre: {viewTrainer.forename} {viewTrainer.surname}</h3>
                                    <h3>Emial: {viewTrainer.email}</h3>
                                    <h3>Cel: {viewTrainer.phoneN}</h3>
                                    <h3>Enfoque: {viewTrainer.focusTr}</h3>
                                    <h3>{viewTrainer.description}</h3>
                                </div>
                                <div className={styles.trainerImg}>
                                    <img src={viewTrainer.image} className={styles.img}/>
                                    {puntuar == 1 || puntuar == 3?
                                      <Rating name="half-rating-read" defaultValue={score} precision={0.5} readOnly />
                                     : puntuar == 2 ? 
                                     <Rating name="half-rating" defaultValue={score} precision={0.5} onChange={handleRatingChange}/>
                                      : ""}
                                    {puntuar !== 3 ? 
                                     <button onClick={()=>{setPuntuar(2)}}>Click aqui para puntuar</button>
                                     :
                                      ""}
                                </div>
                            </div>
                        </div>
                        : 
                        ""                                               
                }
            </div>
          
      </div>
    )   
}

export default DetailUsuario;