import { useNavigate } from "react-router-dom"
const sesionClosed= ()=>{
    window.alert("La sesion finalizo, porfavor vuelve a iniciar sesion")  
    const navigate=useNavigate()
    navigate('/login')

}

export default sesionClosed