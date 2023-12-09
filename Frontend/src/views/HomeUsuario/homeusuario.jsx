import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTrainers } from "../../components/redux/actions/actions"
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

  //firebase
  const [userSession, setUserSession] = useState(false)
  //modo escucha de firebase
  useEffect(()=>{
  onAuthStateChanged(auth, async (user) => {    //esta funcion es de firebase se queda en modo escucha cada vez que se carga la aplicacion, user contiene la informacion del usuario.
    if(userstatus === "invitado"){
      setUserSession(true)
    } else if (user) {
      console.log(user)
    setUserSession(true)
  } else {
    setUserSession(false)
    console.log(user)
  }
})
},[])
  //-------------------------
  //--------

  useEffect(() => {
    dispatch(getTrainers());
  }, [dispatch])


  const [currentPage, setCurrentPage] = useState(0);

  let profes = [];
  filterTrainer.length === 0 ? profes = allTrainers : profes = filterTrainer

  return (<>
    {userSession ?
      <div>
        <NavUsuario setCurrentPage={setCurrentPage} setUserSession={setUserSession}/>
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
