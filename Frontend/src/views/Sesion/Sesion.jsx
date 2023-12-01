import style from "./Sesion.module.css"
import { IoLogoFacebook } from "react-icons/io";
import { FcGoogle } from "react-icons/fc";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { getTrainers } from "../../components/redux/actions/actions.js";
import validate from "./validate.js";
import { callLoginGoogle, callLoginFacebook } from "../../utils/authFunctions";
import axios from "axios";
import { URLSERVER } from "../../../configURL.js";
//FIREBASE
import { auth } from "../../components/firebase/firebase";

import { signInWithEmailAndPassword } from "firebase/auth";

//--------



const FormSesion = (props) => {

    const { typeSession } = useParams()
    const navigate = useNavigate()
    const [form, setForm] = useState({ email: "", password: "" })
    const [errors, setErrors] = useState({})
    const dispatch=useDispatch()



    //FIREBASE
    //Para acceder con una ventana emergente, llamada signInWithPopup,valida si existe el usuario y si no crea uno
    const call_login_google = async (e) => {
        e.preventDefault();
        try {
            const response=await callLoginGoogle();
            if (typeSession === "Deportistas") {
                console.log(response)
                await axios.post(`${URLSERVER}/fitevolution/clients`, {email:response})
                navigate('/homeusuario')}
            if (typeSession === "Entrenadores") navigate('/dashboardtr')
        } catch (error) {
            console.log(error.message)
        }
    }

    //--------------------------------------------------------------
    //Para acceder con una ventana emergente, llamada signInWithPopup,valida si existe el usuario y si no crea uno
    const call_login_facebook = async (e) => {
        e.preventDefault();
        try {
            await callLoginFacebook();
            if (typeSession === "Deportistas") navigate('/homeusuario')
            if (typeSession === "Entrenadores") navigate('/dashboardtr')
        } catch (error) {
            console.log(error.message)
        }
    }
    //--------------------------------------------------------------
    //inicio de sesion con email,valida si existe el usuario pero no crea ninguno

    const handleSubmit = async (e) => {
        e.preventDefault()
        //  navigate('/homeusuario')
        //  navigate('/dashboardtr')
        const checkErr = validate(form)
        if (Object.values(form).some(inp => inp === "")) {  //some comprueba si algun elemento del array es "", si hay un "" quiere decir que hay un input vacio
            alert("DEBÉS COMPLETAR TODOS LOS CAMPOS!");
            return;
        }

        if (Object.values(checkErr).some(error => error)) {
            alert("LOS CAMPOS TIENEN ERRORES!");
            return;
        }

        try {
            const credentials = await signInWithEmailAndPassword(auth, form.email, form.password)
            window.alert(`Bienvenido: ${credentials.user.email}`)
            if (typeSession === "Deportistas") navigate('/homeusuario')
            if (typeSession === "Entrenadores") navigate('/dashboardtr')
            console.log(credentials.user.email)
        } catch (error) {
            //  window.alert(error.code)
            if (error.code === "auth/invalid-login-credentials" || error.code === "auth/invalid-login-credentials") window.alert("Usuario y/o contraseña invalidos")
        }
    }

    //-------

    const handleChange = (e) => {
        e.preventDefault()
        const property = e.target.name
        const value = e.target.value;

        setForm((previo) => {
            const newS = {
                ...previo,
                [property]: value
            };
            setErrors(validate(newS));
            return newS;
        })
    }


    const volverinicio = () => {
        navigate('/')
    }

    const typeAccount = () => {
        if (typeSession === "Deportistas") navigate(`/registeruser/`)
        if (typeSession === "Entrenadores") navigate(`/registertrainer/`)
    }


    return (
        <div className={style.FormSesion}>

            <form className={style.Form} onSubmit={handleSubmit}>
                <div className={style.btconteiner}>
                    <button onClick={volverinicio} className={style.btLogin}>{'< volver al inicio'}</button>
                </div>
                <h1>{typeSession}</h1>

                <div className={style.formSession}>
                    <div className={style.labelform1}>
                        <label className={style.label1}> Correo electronico</label>
                        <input placeholder=" Correo electronico" className={style.inputNom} name="email" onChange={handleChange} />
                        {errors.email && <p className={style.p1}>{errors.email}</p>}
                    </div>
                    <div className={style.labelform1}>
                        <label className={style.label1}> Contraseña</label>
                        <input placeholder="Contraseña" className={style.inputNom} name="password" type="password" onChange={handleChange} />
                        {errors.password && <p className={style.p1}>{errors.password}</p>}
                    </div>
                </div>
                <button type="submit" className={style.button}>Iniciar Sesion</button>
                <hr />
                <div className={style.faceGoole}>
                    <button onClick={call_login_facebook} className={style.Face}>
                        <IoLogoFacebook size={42} className={style.iconFace} />
                        <p className={style.pfg}>Continuar con Facebook</p>
                    </button>

                    <button onClick={call_login_google} className={style.google}>
                        <FcGoogle size={40} className={style.iconFace} />
                        <p className={style.pfg}>Continuar con Google</p>
                    </button>
                </div>
                <p className={style.parr}>¿Olvidaste tu contraseña?<Link to={'/forgot_Password'}> Haz click aqui</Link></p>
                <p>¿No tienes una cuenta?<button className={style.btSessionInf} onClick={typeAccount}> Haz click aqui</button></p>
            </form>






        </div>







    )

}

export default FormSesion;