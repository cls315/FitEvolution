//Components

//Commons imports
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import validate from './validate'    //Styles
import style from "./registerTrainer.module.css";
import axios from "axios";
import { URLSERVER } from '../../../configURL';
import Button from '@mui/material/Button';


//* Widget Cloudinary
import UploadWidCloud from '../../components/Cloudinary/UploadWidCloud';

//*alertas
import Swal from 'sweetalert2'

//import firebase
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../components/firebase/firebase';


function RegisterTrainer() {
    const navigate = useNavigate();
    const volverInicio = () => {
        navigate('/login/Entrenadores');
    };

    const changeAccount = () => {
        navigate('/select/');
    }


    const [errors, setErrors] = useState({})
    const [form, setForm] = useState({
        forename: "",
        password: "",
        repeatpassword: "",
        image: "",
        email: "",
        description: "",
        surname:null,    //les  puse null porque en la db no pueden estar  vacios
        phoneN:null,
        nationality:null,
        dateOfBirth:null,
        dni:null,
        gender:null,
        focusTr:null,
        score:null,
        puntuaciones:[],
    })
//!esta logica es para mostrar u ocultar el password ingresado
//     const [showPassword, setShowPassword] = useState(false);

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };


    console.log(form)
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
    //*manejo de la imagen de cloudinary para llenarlo por props en el componente UploadWidCloud;
    const uploadImage = (img)=>{
        setForm(formPrevio => ({
            ...formPrevio,
            image:img
          }));
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const checkErr = validate(form)
        if (Object.values(form).some(inp => inp==="")) {  //some comprueba si algun elemento del array es "", si hay un "" quiere decir que hay un input vacio
            Swal.fire('DEBÉS COMPLETAR TODOS LOS CAMPOS!');
            return;
        }
        if (Object.values(checkErr).some(error => error)) {
            Swal.fire('EL FORMULARIO CONTIENE ERRORES!');
            return;
        }

        const result = await Swal.fire({
            title: `¿Seguro que quiere crear el Entrenador ${form.forename} ${""}?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, crearlo'
        });

        if(result.isConfirmed){
            try {
                const userCredentials = await createUserWithEmailAndPassword(auth, form.email, form.password) //esto se envia a firebase y puede llevar tiempo por ello usamos async y await
                console.log(userCredentials)
                if (userCredentials.operationType) {
                    Swal.fire(`Entrenador ${form.forename} registrado con éxito`, '', 'success');
                    await axios.post(`${URLSERVER}/fitevolution/trainers`, form) 
                    navigate('/login/Entrenadores')
                } else { Swal.fire(`Error al registrar el usuario ${form.forename} `,'','error') }
 
            } catch (error) {
                if (error.code === "auth/email-already-in-use") {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error al enviar el formulario',
                        text: 'Email ya está registrado',
                    });
                } else if (error.code === "auth/invalid-email") {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error al enviar el formulario',
                        text: 'Email inválido',
                    });
                } else if (error.code === "auth/weak-password") {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error al enviar el formulario',
                        text: 'La contraseña debe tener un mínimo de 6 caracteres',
                    });
                } else if (error.code) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error al enviar el formulario',
                            text: `Error: ${error.message}`,
                        });
                }
            }
        }

        // alert(`seguro quiere crear el Entrenador ${form.forename} ${""}?`)
        // try {
        //     //firebase registro de usuario 
        //     const userCredentials = await createUserWithEmailAndPassword(auth, form.email, form.password) //esto se envia a firebase y puede llevar tiempo por ello usamos async y await
        //     console.log(userCredentials)
        //     if (userCredentials.operationType) {
        //         window.alert("Usuario registrado con exito")
        //         navigate('/login/Entrenadores')
        //     } else { throw Error("Error al registrar el usuario") }
        //     //----------------------------

        //     //envio de formulario al servidor
        //     await axios.post("http://localhost:3001/fitevolution/trainers", form)
        //     //-------------------------------
        // } catch (error) {
        //     //window.alert(error.code)    //error.name "firebase error(tipo de error)", error.code "nombre del error", error.message "descripcion del error"
        //     if (error.code === "auth/email-already-in-use") window.alert("Email ya esta registrado")
        //     else if (error.code === "auth/invalid-email") window.alert("Email invalido")
        //     else if (error.code === "auth/weak-password") window.alert("La contraseña debe tener un minimo de 6 caracteres")
        //     else if (error.code) window.alert("Error al enviar el formulario:", error.message)
        // }
    }


    return (<div className={style.conteinerRegister}>
        <div className={style.menuregister}>
            <div className={style.titleSup}>
                <button onClick={changeAccount} className={style.btregister}>{'< Cambiar tipo de cuenta'}</button>
                <h1 className={style.titleregister}>Crea una cuenta de entrenador</h1>
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

                    <div className={style.labelform1}>
                        <label className={style.label1}> Certificaciones</label>
                     <UploadWidCloud uploadImage={uploadImage}/>
                        {/* <input placeholder=" Arrastrar aqui( .jpg,.pdf)" className={style.inputNom} name="image" onChange={handleChange} />
                        {errors.image && <p className={style.p1}>{errors.image}</p>} */}
                    </div>
                    { /* <div className={style.labelform1}>
                            <label className={style.label1}> Genero</label>
                          <select placeholder="Genero" className={style.inputNom} name="gender" onChange={handleChange}>
                            <option value="">Selecciona...</option>
                        <option value="Masculino">Masculino</option>
                        <option value="Femenino">Femenino</option>
                        <option value="Otro">Otro</option>
                            </select>
                        {errors.gender && <p className={style.p1}>{errors.gender}</p>}
                        </div>*/}
                    <div className={style.labelDescription}>
                        <label className={style.label1}> Experiencia</label>
                        <textarea placeholder=" Agrega una descripcion" type='string' className={style.inputDescription} name="description" onChange={handleChange} />
                        {errors.description && <p className={style.p1}>{errors.description}</p>}
                    </div>

                    <div className={style.titleInf}>
                        <Button variant="contained" color="primary" size="small"type="submit" className={style.btCreateAccount}>Crear cuenta</Button>
                        <span >¿Ya tienes cuenta?  <button onClick={volverInicio} className={style.spanButton}> inicio de sesion</button></span>
                    </div>
                </form >

            </div>

        </div>
    </div>)
}

export default RegisterTrainer