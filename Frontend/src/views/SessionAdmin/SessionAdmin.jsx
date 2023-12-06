import { useNavigate } from 'react-router-dom'
import style from './SessionAdmin.module.css'

const SessionAdmin =()=>{
const navigate= useNavigate()
const button=()=>{
    navigate ("/adm")
}


    return (
        <div  className={style.form}>
            <form >
           <h2 className={style.tittle}>Usuario admin</h2>

            <input type="password" placeholder= "Usuario"className={style.input}/>
    
            <input type="password" placeholder= "Contraseña"className={style.input1}/>

            <button onClick ={button}className={style.boton}>Enter</button>

            </form>

            


        </div>

    ) 
}
export default SessionAdmin