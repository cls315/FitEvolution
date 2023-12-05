import ClientsTable from "../../components/clientsTable/ClientsTable"
import { useNavigate } from "react-router-dom"

const Admin=()=>{
    const navigate = useNavigate()
   const ejectButton =()=>{
   navigate('/createEj')
   }
    return (
     
        <div>
            <div>
                
                <button onClick={ejectButton}>Crear ejercicios</button>
            </div>

        {<ClientsTable/>}
        </div>
      
    
    )
}

export default Admin