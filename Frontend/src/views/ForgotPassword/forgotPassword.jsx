//Components imports

//Commons imports
import { useState } from "react"
import { useNavigate } from "react-router-dom"
//Style
import style from "./forgotPassword.module.css"
import { Button } from "@mui/material"


const ForgotPassword = (props) => {
    const navigate=useNavigate()
    const [form, setForm] = useState({ email: ""})
    const [errors, setErrors] = useState({})
    const handleSubmit=()=>{}

    const volverlogin = () => {
        navigate('/')
    }

    const handleChange=()=>{}
  

    return (
        <div className={style.FormSesionps}>

            <form className={style.Form} onSubmit={handleSubmit}>
                <div className={style.btconteinerps}>
                    <Button onClick={volverlogin} className={style.btLoginps}>{'< volver al inicio'}</Button>
                </div>
                <h1>¿Olvidaste tu contraseña?</h1>
                <p>Ingresa tu dirección de correo electrónico y te enviaremos instrucciones sobre cómo restablecer tu contraseña.</p>
                <div className={style.formSession}>
                    <div className={style.labelform1}>
                        <label className={style.label1}> Correo electronico</label>
                        <input placeholder=" Correo electronico" className={style.inputNom} name="email" onChange={handleChange} />
                        {errors.email && <p className={style.p1}>{errors.email}</p>}
                    </div>
                </div>
                <Button variant="contained" color="primary" size="small" type="submit" className={style.button}>Recuperar Contraseña</Button>
            </form>
        </div>
    )
}

export default ForgotPassword;