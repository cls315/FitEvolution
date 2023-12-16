import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import StarRating from "../../components/starRating/starRating";
import LoadingComponent from "../../components/loading/loading.component"
import sinimagen from "../../images/sinimagen.png"
import Swal from "sweetalert2";

import {agregarCarrito, getRoutines, saveIdTrainer} from "../../components/redux/actions/actions"

import Navdetail from "./navdetail";

import styles from "./detail.module.css"
import { Button } from "@mui/material";

const Detail = ()=>{

    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false);
    const {id} = useParams();

    useEffect(()=>{
        dispatch(getRoutines());
    }, [dispatch])


    const allTrainers = useSelector((state) => state.allTrainers)
    const allroutines = useSelector((state)=> state.routines)
    const cart = useSelector((state)=> state.carrito)
    const status = useSelector((state)=>state.userStatus)
    
        const user = useSelector((state)=> state.usuario)


    const trainer = allTrainers.find((teacher) => teacher.id == id)
    const routines = allroutines.filter((routine) => routine.trainerId == id)
    let packComprado = null

    const sumPack = (routine, id) => {
        if (cart) {
            const packenCarrito = cart.some((item) => item == routine);
            if(status !== "invitado"){
             packComprado = user.myTrainers?.some((trainer) => trainer == id);
            }
    
            if (!packenCarrito && !packComprado) {
                dispatch(agregarCarrito(routine));
                Swal.fire("Rutina agregada correctamente al carrito","","info")
                dispatch(saveIdTrainer(id));
            } else {
                Swal.fire("Ya agregaste este pack en el carrito o contrataste anteriormente al mismo entrenador","","error");
            }
        }
    }

    let [page, setPage] = useState(1);

    const sumPage = ()=>{
        setPage(page + 1)
    }

    const restPage = ()=>{
        setPage(page - 1)
    }

    return(
        <div>
            {/* {loading && <LoadingComponent/>}     {/CARGA DE GIF PARA CUANDO SE ENVIA EL PAGO DEL CARRITO/} */}
            <Navdetail setLoading={setLoading}/>
            {!trainer ? (
                <div>
                    <p>El entrenador no fue encontrado</p>
                </div>
            ) : (
        <div className={styles.allconteiner}>
            {page == 1 ? (
            <div className={styles.info}>
                <div className={styles.details}>
                    <h2>Nombre: {trainer.forename} {trainer.surname}</h2>
                    <h2>Nacionalidad: {trainer.nationality}</h2>
                    <h2>E-mail: {trainer.email}</h2>
                    <h2>Enfoque: {trainer.focusTr}</h2>
                    <h2>Descripcion: {trainer.description}</h2>
                </div>
                <Button variant="contained" onClick={()=>{sumPage()}}>Selecciona tu plan</Button>
            </div>
            ) : page == 2 ? (
            <div className={styles.info}>
                <div className={styles.packs}>
                {routines.length ? routines.map((routine) => (
                    <div className={styles.pack1}>
                        <h2>PACK {routine.exerc.length} EJERCICIOS</h2>
                        <h3>${routine.precio}</h3>
                        <h4>{routine.enfoque}</h4>
                        <h4>Rutina de adaptacion para principiante y rutina adaptada al cliente</h4>
                        <h5>Duracion: {routine.totalDuration} dias</h5>
                        <button className={styles.packbtn} onClick={()=>{sumPack(routine, id)}}>Sumar al carrito</button>
                </div>
                ))
                : (<div className={styles.pack1}>
                    <h3>Este entrenador no posee rutinas creadas en este momento</h3>
                </div>)
                }
                </div>
                <Button variant="contained" onClick={()=>{restPage()}}>Volver a detalles</Button>
            </div>
            ) : (<div></div>)}
            <div className={styles.perfil}>
                <img src={trainer.image ? trainer.image : sinimagen} className={styles.img}/>
                <StarRating rating={trainer.score} className={styles.stars}/>
            </div>
        </div>
             )} 
        </div>
    )
}

export default Detail;
