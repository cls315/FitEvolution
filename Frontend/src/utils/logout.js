import { signOut } from "firebase/auth";
import { auth } from "../components/firebase/firebase"; //parametro de la autenticacion
import { useNavigate } from "react-router-dom";

const logout= async()=>{
    await signOut(auth)              //cierra la sesion y vuelve al user==null  
    console.log('user signed out')
}

export default logout