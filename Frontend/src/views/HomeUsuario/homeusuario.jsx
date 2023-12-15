import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTrainers, userPerfil } from "../../components/redux/actions/actions"
import NavUsuario from "../../components/navUsuario/navUsuario";
import Cards from "../../components/cards/cards"
import styles from "./homeusuario.module.css"
import { URLfrontend } from "../../../configURL";

//firebase
import { auth } from '../../components/firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';
//--------

const Homeusuario = () => {

  const dispatch = useDispatch()
  const allTrainers = useSelector((state) => state.allTrainers);
  const filterTrainer = useSelector((state) => state.filterTrainers)
  const userstatus = useSelector((state)=> state.userStatus)
  const clientSave = useSelector((state)=> state.usuario)

  //firebase
  const [userSession, setUserSession] = useState(false)
  //modo escucha de firebase
  const [usuario, setUsuario] = useState()
 useEffect(()=>{
  onAuthStateChanged(auth, async (user) => {    //esta funcion es de firebase se queda en modo escucha cada vez que se carga la aplicacion, user contiene la informacion del usuario.
    if(userstatus === "invitado"){
      setUserSession(true)
    } else if (user) {
      const email = user.email
      setUsuario(email)
      setUserSession(true)
    } else {
      setUserSession(false)
    }
  })
},[usuario])
//-------------------------
//--------

useEffect(() => {
  dispatch(getTrainers());
}, [dispatch])

if(!clientSave || clientSave.email !== usuario){
  dispatch(userPerfil(usuario))
}

  const [currentPage, setCurrentPage] = useState(0);

  let profes = [];
  filterTrainer.length === 0 ? profes = allTrainers : profes = filterTrainer
  profes = profes.filter(entrenador => entrenador.status === "Active");
  return (<>
    {userSession ?
      <div>
        <NavUsuario setCurrentPage={setCurrentPage} setUserSession={setUserSession} userstatus={userstatus}/>
        <div className={styles.conteiner}>
          <div className={styles.cardsconteiner}>
            <Cards profes={profes} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
          </div>
        </div>
      </div> :
      <a href={`${URLfrontend}`}>Su sesion finalzo, haz click aqui.</a>
    }
  </>);
};

export default Homeusuario;
