import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import StarRating from "../../components/starRating/starRating";
import LoadingComponent from "../../components/loading/loading.component"

import {agregarCarrito, getRoutines} from "../../components/redux/actions/actions"

import Navdetail from "./navdetail";

import styles from "./detail.module.css"

const Detail = ()=>{

    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false);
    const {id} = useParams();

    useEffect(()=>{
        dispatch(getRoutines());
    }, [dispatch])


    const allTrainers = useSelector((state) => state.allTrainers)
    const allroutines = useSelector((state)=> state.routines)

    const trainer = allTrainers.find((teacher) => teacher.id == id)
    const routines = allroutines.filter((routine) => routine.trainerId == id)

    const sumPack = (option)=>{
        dispatch(agregarCarrito(option))
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
            {loading && <LoadingComponent/>}     {/*CARGA DE GIF PARA CUANDO SE ENVIA EL PAGO DEL CARRITO*/}
            <Navdetail setLoading={setLoading}/>
            {/* {!teacher.id ? (
                <div>
                    <p>The teacher is not found</p>
                </div>
            ) : ( */}
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
                <button className={styles.btn} onClick={()=>{sumPage()}}>Selecciona tu plan</button>
            </div>
            ) : page == 2 ? (
            <div className={styles.info}>
                <div className={styles.packs}>
                {routines ? routines.map((routine) => (
                    <div className={styles.pack1}>
                        <h2>PACK {routine.exerc.length} EJERCICIOS</h2>
                        <h3>${routine.precio}</h3>
                        <h4>{routine.enfoque}</h4>
                        <h5>Duracion: {routine.totalDuration} dias</h5>
                        <button className={styles.packbtn} onClick={()=>{sumPack(routine)}}>Sumar al carrito</button>
                </div>
                ))
                : (<div className={styles.pack1}>
                    <h3>No tiene rutinas creadas</h3>
                </div>)
                }
                </div>
                <button className={styles.btn} onClick={()=>{restPage()}}>Volver a detalles</button>
            </div>
            ) : (<div></div>)}
            <div className={styles.perfil}>
                <img src={trainer.image} className={styles.img}/>
                <StarRating rating={trainer.score} className={styles.stars}/>
            </div>
        </div>
            {/* )} */}
        </div>
    )
}

export default Detail;