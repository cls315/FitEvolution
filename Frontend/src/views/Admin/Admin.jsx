import ClientsTable from "../../components/clientsTable/ClientsTable";
import TrainersTable from "../../components/trainersTable/trainersTable.component";

import { useNavigate } from "react-router-dom";

const Admin = () => {
  const navigate = useNavigate();
  const ejectButton = () => {
    navigate("/createEj");
  };
  return (
    <div>
      <div>
        <button onClick={ejectButton}>Crear ejercicios</button>
      </div>

      {<ClientsTable />}

      <div>Tabla de Entrenadores</div>
      {<TrainersTable />}
    </div>
  );
};

export default Admin;
