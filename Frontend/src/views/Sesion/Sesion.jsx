// import style from "./Sesion.module.css"
// import { IoLogoFacebook } from "react-icons/io";
// import { FcGoogle } from "react-icons/fc";
// import { Link, useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from "react-redux";
// import { getTrainers, setusuario } from "../../components/redux/actions/actions.js";
// import validate from "./validate.js";
// import { callLoginGoogle, callLoginFacebook } from "../../utils/authFunctions";
// import axios from "axios";
// import { URLSERVER } from "../../../configURL.js";
// //FIREBASE
// import { auth } from "../../components/firebase/firebase";

// import { signInWithEmailAndPassword } from "firebase/auth";

// //--------



// const FormSesion = (props) => {

//     const { typeSession } = useParams()
//     const navigate = useNavigate()
//     const [form, setForm] = useState({ email: "", password: "" })
//     const [errors, setErrors] = useState({})
//     const dispatch=useDispatch()



//     //FIREBASE
//     //Para acceder con una ventana emergente, llamada signInWithPopup,valida si existe el usuario y si no crea uno
//     const call_login_google = async (e) => {
//         e.preventDefault();
//         try {
//             const user=await callLoginGoogle();
//             if (typeSession === "Deportistas") {
//                 await axios.post(`${URLSERVER}/fitevolution/clients`, {email:user.email,surname:user.displayName.split(" ")[1],forename:user.displayName.split(" ")[0]})
//                 navigate('/homeusuario')}
//             if (typeSession === "Entrenadores") {
//                 await axios.post(`${URLSERVER}/fitevolution/trainers`, {email:user.email,surname:user.displayName.split(" ")[1],forename:user.displayName.split(" ")[0]})
//                 navigate('/dashboardtr')}
//         } catch (error) {
//             console.log(error.message)
//             if(error.code==="auth/account-exists-with-different-credential") alert("el email ya existe, prueba iniciar sesion con otro metodo")
//             if (error.response.data.error==="El usuario ya esta registrado" && typeSession === "Deportistas") navigate('/homeusuario')
//             else if(error.response.data.error==="El usuario ya esta registrado" && typeSession === "Entrenadores") navigate('/dashboardtr')
//             else if(error) alert(error.response.data)
//         }
//     }

//     //--------------------------------------------------------------
//     //Para acceder con una ventana emergente, llamada signInWithPopup,valida si existe el usuario y si no crea uno
//     const call_login_facebook = async (e) => {
//         e.preventDefault();
//         try {
//             const user=await callLoginFacebook();
//             console.log(user)
//             if (typeSession === "Deportistas") {
//                await axios.post(`${URLSERVER}/fitevolution/clients`, {email:user.email,surname:user.displayName.split(" ")[1],forename:user.displayName.split(" ")[0]})
//                 navigate('/homeusuario')}
//             if (typeSession === "Entrenadores") {
//                 await axios.post(`${URLSERVER}/fitevolution/trainers`, {email:user.email,surname:user.displayName.split(" ")[1],forename:user.displayName.split(" ")[0]})
//                 navigate('/dashboardtr')}
//         } catch (error) {
//             console.log(error.code)
//             if(error.code==="auth/account-exists-with-different-credential") alert("el email ya existe, prueba iniciar sesion con otro metodo")
//             if (error.response.data.error==="El usuario ya esta registrado" && typeSession === "Deportistas") navigate('/homeusuario')
//             else if (error.response.data.error==="El usuario ya esta registrado" && typeSession === "Entrenadores") navigate('/dashboardtr')
//             else if(error) alert(error.response.data)
            
//         }
//     }
//     //--------------------------------------------------------------
//     //inicio de sesion con email,valida si existe el usuario pero no crea ninguno

//     const handleSubmit = async (e) => {
//         e.preventDefault()
//         //  navigate('/homeusuario')
//         //  navigate('/dashboardtr')
//             const checkErr = validate(form)
//             if (Object.values(form).some(inp => inp === "")) {  //some comprueba si algun elemento del array es "", si hay un "" quiere decir que hay un input vacio
//                 alert("DEBÉS COMPLETAR TODOS LOS CAMPOS!");
//                 return;
//             }
    
//             if (Object.values(checkErr).some(error => error)) {
//                 alert("LOS CAMPOS TIENEN ERRORES!");
//                 return;
//             }
    
//             try {
//                 const credentials = await signInWithEmailAndPassword(auth, form.email, form.password)
//                 window.alert(`Bienvenido: ${credentials.user.email}`)
//                 if (typeSession === "Deportistas") navigate('/homeusuario')
//                 if (typeSession === "Entrenadores") navigate('/dashboardtr')
//                 console.log(credentials.user.email)
//             } catch (error) {
//                 //  window.alert(error.code)
//                 if (error.code === "auth/invalid-login-credentials" || error.code === "auth/invalid-login-credentials") window.alert("Usuario y/o contraseña invalidos")
//             }
//     }


import style from "./Sesion.module.css"
import { IoLogoFacebook } from "react-icons/io";
import { FcGoogle } from "react-icons/fc";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getTrainers, setusuario } from "../../components/redux/actions/actions.js";
import validate from "./validate.js";
import { callLoginGoogle, callLoginFacebook } from "../../utils/authFunctions";
import axios from "axios";
import { URLSERVER } from "../../../configURL.js";
import Swal from 'sweetalert2'

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
            const user=await callLoginGoogle();
            if (typeSession === "Deportistas") {
                await axios.post(`${URLSERVER}/fitevolution/clients`, {email:user.email,surname:user.displayName.split(" ")[1],forename:user.displayName.split(" ")[0]})
                Swal.fire(`Bienvenido a FitRevolution ${user.displayName.split(" ")[0]}`)
                navigate('/homeusuario')}
            if (typeSession === "Entrenadores") {
                await axios.post(`${URLSERVER}/fitevolution/trainers`, {email:user.email,surname:user.displayName.split(" ")[1],forename:user.displayName.split(" ")[0]})
                Swal.fire(`Bienvenido a FitRevolution ${user.displayName.split(" ")[0]}`)
                navigate('/dashboardtr')}
        } catch (error) {
            const requestData = JSON.parse(error.config.data);
            const forename = requestData.forename;
            console.log(error.config.data)
            if(error.code==="auth/account-exists-with-different-credential") Swal.fire("el email ya existe, prueba iniciar sesion con otro metodo",'','error')
            if (error.response.data.error==="El usuario ya esta registrado" && typeSession === "Deportistas"){
             Swal.fire(`Bienvenido nuevamente ${forename} `)
                navigate('/homeusuario')
            }    
            else if(error.response.data.error==="El usuario ya esta registrado" && typeSession === "Entrenadores")
            {   
                Swal.fire(`Bienvenido nuevamente ${forename} `)
                navigate('/dashboardtr')
            }    
            else if(error) Swal.fire(error.response.data,'','error')
        }
    }

    //--------------------------------------------------------------
    //Para acceder con una ventana emergente, llamada signInWithPopup,valida si existe el usuario y si no crea uno
    const call_login_facebook = async (e) => {
        e.preventDefault();
        try {
            const user=await callLoginFacebook();
            console.log(user)
            if (typeSession === "Deportistas") {
               await axios.post(`${URLSERVER}/fitevolution/clients`, {email:user.email,surname:user.displayName.split(" ")[1],forename:user.displayName.split(" ")[0]})
               Swal.fire(`Bienvenido a FitRevolution ${user.displayName.split(" ")[0]}`,'','success')
                navigate('/homeusuario')}
            if (typeSession === "Entrenadores") {
                await axios.post(`${URLSERVER}/fitevolution/trainers`, {email:user.email,surname:user.displayName.split(" ")[1],forename:user.displayName.split(" ")[0]})
                Swal.fire(`Bienvenido a FitRevolution ${user.displayName.split(" ")[0]}`,"",'success')
                navigate('/dashboardtr')}
        } catch (error) {
            const requestData = JSON.parse(error.config.data);
            const forename = requestData.forename;
            console.log(error.code)
            if(error.code==="auth/account-exists-with-different-credential") Swal.fire("el email ya existe, prueba iniciar sesion con otro metodo",'','error')
            if (error.response.data.error==="El usuario ya esta registrado" && typeSession === "Deportistas"){
                Swal.fire(`Bienvenido nuevamente ${forename} `)
                navigate('/homeusuario')
            }    
            else if(error.response.data.error==="El usuario ya esta registrado" && typeSession === "Entrenadores")
            {   
                Swal.fire(`Bienvenido nuevamente ${forename} `)
                navigate('/dashboardtr')
            }    
            else if(error) Swal.fire(error.response.data,'','error')
        }
    }
    //--------------------------------------------------------------
    //inicio de sesion con email,valida si existe el usuario pero no crea ninguno

    const handleSubmit = async (e) => {
        e.preventDefault();
        //  navigate('/homeusuario')
        //  navigate('/dashboardtr')
            const checkErr = validate(form)
            if (Object.values(form).some(inp => inp === "")) {  //some comprueba si algun elemento del array es "", si hay un "" quiere decir que hay un input vacio
                Swal.fire('DEBÉS COMPLETAR TODOS LOS CAMPOS!',"",'error');
                return;
            }
    
            if (Object.values(checkErr).some(error => error)) {
                Swal.fire('EL FORMULARIO CONTIENE ERRORES!',"","error");
                return;
            }
    
            try {
                const credentials = await signInWithEmailAndPassword(auth, form.email, form.password)
                Swal.fire(`Bienvenido: ${credentials.user.displayName}`)
                if (typeSession === "Deportistas") navigate('/homeusuario')
                if (typeSession === "Entrenadores") navigate('/dashboardtr')
                console.log(credentials.user.email)
            } catch (error) {
                //  window.alert(error.code)
                if (error.code === "auth/invalid-login-credentials" || error.code === "auth/invalid-login-credentials") Swal.fire("Usuario y/o contraseña invalidos",'','error')
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
    
    const invitado = (option)=>{
       dispatch(setusuario(option))
       navigate("/homeusuario")
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
                    <button onClick={()=>invitado("invitado")} className={style.btLogin}>{'ingresar como invitado >'}</button>
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