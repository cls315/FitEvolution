import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTrainers, filterFocus, filterScore, quitarFiltros,sobreScore, sobreFocus, setusuario } from "../../components/redux/actions/actions"
import {Link, useNavigate} from "react-router-dom"
import imageLogo from "../../images/imageLogo.jpg"
import styles from "./navUsuario.module.css"

const NavUsuario = ({setCurrentPage, setUserSession, userstatus })=>{
console.log(userstatus)
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getTrainers());
    }, [dispatch])

    const trainers = useSelector((state) => state.allTrainers)
    const filtrados = useSelector((state)=> state.filterTrainers)
    const status = useSelector((state)=> state.status)

    var select1 = document.getElementById("focus");
    var select2 = document.getElementById("score");    

    let focus = trainers.map((trainer) => trainer.focusTr)
    focus = focus.filter((item, index) => {
        return focus.indexOf(item) === index;
    })
    let scores = trainers.map((trainer) => trainer.score)
    scores = scores.filter((item, index) => {
        return scores.indexOf(item) === index
    })
    scores = scores.sort((a,b) => (a - b));

    const filterByFocus = (e)=>{
        setCurrentPage(0)
        const option = e.target.value
        if(filtrados.lenght !== 0 && option === "todos"){
            dispatch(quitarFiltros())
        select2.value = "todos"
        } 
        else if(filtrados.lenght !== 0 && status === "focus") {
            dispatch(filterFocus(option))
        select2.value = "todos"
        } else if(filtrados.lenght !== 0 && status === "score"){
            dispatch(sobreScore(option))
        } else {
            dispatch(filterFocus(option))
        select2.value = "todos"
        }
    }

    const filterByScore = (e)=>{
        const option = e.target.value
        setCurrentPage(0)
        if(filtrados.lenght !== 0 && option === "todos"){
            dispatch(quitarFiltros())
        select1.value = "todos"
        } else if (filtrados.lenght !== 0 && status === "score"){
            dispatch(filterScore(option))
        select1.value = "todos"
        } else if (filtrados.lenght !== 0 && status === "focus"){
            dispatch(sobreFocus(option))
        } else {
            dispatch(filterScore(option))
        select1.value = "todos"
        }
    }

    const deleteFilters = ()=>{
        dispatch(quitarFiltros())
        select1.value = "todos"
        select2.value = "todos"
    }

    const setUser = ()=>{
        dispatch(setusuario(""))
        setUserSession(false)
    }
const navigate =useNavigate()
    return(
        <div className={styles.nav}>
            <img src={imageLogo} className={styles.logo}/>
            <div className={styles.ubibtn}>
            <button className={styles.btn1} onClick={()=>(deleteFilters())}>QUITAR FILTROS</button>
            <select name="focus" id="focus" defaultValue={"defaultoption"} onChange={(e)=>{filterByFocus(e)}}>
                <option value="defaultoption" disabled>ELIGE UN ENFOQUE</option>
                <option value="todos">TODOS LOS ENFOQUES</option>
                {focus.map((focus, index) => (
                    <option key={index} value={focus}>{focus}</option>
                ))}
            </select>
            <select name="score" id="score" defaultValue={"defaultoption2"} onChange={(e)=>{filterByScore(e)}}>
                <option value="defaultoption2" disabled>ELIGE EL SCORE</option>
                <option value="todos">TODOS LOS SCORES</option>
                {scores.map((score, index)=> (
                    <option key={index} value={score}>SOLO CON {score} ESTRELLAS</option>
                ))}
            </select>
            {userstatus === "invitado" ? (
                <Link to="/login/Deportistas">
                <button className={styles.btn1} onClick={()=>{setUser()}}>INICIAR SESION</button>
                </Link>
            ) : 
            (<>
            <Link to="/detailusuario">
            <button className={styles.btn1}>PERFIL</button>
            </Link>
            <Link to="/">
            <button className={styles.btn2} onClick={()=>{setUser()}}>CERRAR SESION</button>
            </Link>
            </>
    )
}
            </div>
            
        </div>
    )
}

export default NavUsuario;