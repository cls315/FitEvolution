import './menuprincipalTrainer.css';
import ClientsTable from '../clientsTable/ClientsTable';

export default function menuprincipalTrainer(props) {
   const {trainer}=props
  return (
    <div className='menuprincipalTrainer'>
      <div className='d-flex flex-column text-right'>
        <h3>Deportistas activos{' (1)'}</h3>
        <span>
          {`Bienvenido ${trainer.forename} a tu cuenta de entrenador, aqui puedes ver todos los
          deportistas`}
        </span>
      </div>
      <ClientsTable />
      <div className='conteinerUsersDash'></div>
    </div>
  );
}
