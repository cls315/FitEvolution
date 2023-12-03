import { useNavigate } from 'react-router-dom'
import style from './SessionAdmin.module.css'

const SessionAdmin =()=>{
const navigate= useNavigate()
const button=()=>{
    navigate ("/adm")
}


    return (
        <div  classname= {style.form}>
            <form >

            <input type="password" placeholder= "Usuario"/>
    
            <input type="password" placeholder= "Contraseña"/>

            <button onClick ={button}>Enter</button>

            </form>

            


        </div>

    ) 
}
export default SessionAdmin