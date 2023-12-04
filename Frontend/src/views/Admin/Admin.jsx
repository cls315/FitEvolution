import ClientsTable from "../../components/clientsTable/ClientsTable";
import TrainersTable from "../../components/trainersTable/TrainersTable";

const Admin = () => {
  return (
    <div>
      <div>
        <button>Crear ejercicios</button>
      </div>

      {<ClientsTable />}

      <div>Tabla de Trainers</div>
      {/* {<TrainersTable />} */}
    </div>
  );
};

export default Admin;
