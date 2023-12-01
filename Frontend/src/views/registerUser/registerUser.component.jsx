//Components

//Commons imports
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import validate from './validate'    //Styles
import style from "./registerUser.module.css";
import axios from "axios";
//import firebase
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../components/firebase/firebase';
import { URLSERVER } from '../../../configURL';


function RegisterUser() {
    const navigate = useNavigate();

    const volverInicio = () => {
        navigate('/login/Deportistas');
    };

    const changeAccount = () => {
        navigate('/select/');
    }


    const [errors, setErrors] = useState({})
    const [form, setForm] = useState({
        forename: "",
        password: "",
        repeatpassword: "",
        email: "",
    })
  
    const handleChange = (e) => {
        const property = e.target.name
        const value = e.target.value;

        setForm((previo) => {
            const newS = {
                ...previo,
                [property]: value
            };
            setErrors(validate(newS));
            return newS;
        });

    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const checkErr = validate(form)
        if (Object.values(form).some(inp => inp==="")) {  //some comprueba si algun elemento del array es "", si hay un "" quiere decir que hay un input vacio
            alert("DEBÉS COMPLETAR TODOS LOS CAMPOS!");
            return;
        }
        if (Object.values(checkErr).some(error => error)) {
            alert("EL FORMULARIO CONTIENE ERRORES!");
            return;
        }
        alert(`seguro quiere crear el usuario: ${form.forename} ${""}?`)
        try {
            //firebase registro de usuario 
            const userCredentials = await createUserWithEmailAndPassword(auth, form.email, form.password) //esto se envia a firebase y puede llevar tiempo por ello usamos async y await
            console.log(userCredentials)
            if (userCredentials.operationType) {
                window.alert("Usuario registrado con exito")
                navigate('/login/Deportistas')
            } else { throw Error("Error al registrar el usuario") }
            //----------------------------

            //envio de formulario al servidor
            await axios.post(`${URLSERVER}/fitevolution/trainers`, form)
            //-------------------------------
        } catch (error) {
            //window.alert(error.code)    //error.name "firebase error(tipo de error)", error.code "nombre del error", error.message "descripcion del error"
            if (error.code === "auth/email-already-in-use") window.alert("Email ya esta registrado")
            else if (error.code === "auth/invalid-email") window.alert("Email invalido")
            else if (error.code === "auth/weak-password") window.alert("La contraseña debe tener un minimo de 6 caracteres")
            else if (error.code) window.alert("Error al enviar el formulario:", error.message)
        }
    }


    return (<div className={style.conteinerRegister}>
        <div className={style.menuregister}>
            <div className={style.titleSup}>
                <button onClick={changeAccount} className={style.btregister}>{'< Cambiar tipo de cuenta'}</button>
                <h1 className={style.titleregister}>Crea una cuenta de usuario</h1>
            </div>
            <div className={style.inputsRegister}>
                <form className={style.RegForms} onSubmit={handleSubmit}>
                    <div className={style.labelform1}>
                        <label className={style.label1}> Nombre</label>
                        <input placeholder=" Nombre" className={style.inputNom} name="forename" onChange={handleChange} />
                        {errors.forename && <p className={style.p1}>{errors.forename}</p>}
                    </div>
                    <div className={style.labelform1}>
                        <label className={style.label1}> Contraseña</label>
                        <input placeholder="Contraseña" className={style.inputNom} name="password" type="password" onChange={handleChange} />
                        {errors.password && <p className={style.p1}>{errors.password}</p>}
                    </div>
                    <div className={style.labelform1}>
                        <label className={style.label1}> Repetir contraseña</label>
                        <input placeholder="Repetir contraseña" className={style.inputNom} name="repeatpassword" type="password" onChange={handleChange} />
                        {errors.repeatpassword && <p className={style.p1}>{errors.repeatpassword}</p>}
                    </div>
                    <div className={style.labelCorreo}>
                        <label className={style.label1}> Correo electronico</label>
                        <input placeholder=" Correo electronico" className={style.inputCorreo} name="email" onChange={handleChange} />
                        {errors.email && <p className={style.p1}>{errors.email}</p>}
                    </div>

                    <div className={style.titleInfUser}>
                        <button type="submit" className={style.btCreateAccount}>Crear cuenta</button>
                        <span className={style.btspanUser}>¿Ya tienes cuenta?  <button onClick={volverInicio} className={style.spanButton}> inicio de sesion</button></span>
                    </div>
                </form >

            </div>

        </div>
    </div>)
}

export default RegisterUser