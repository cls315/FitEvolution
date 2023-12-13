//Commons imports
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { URLfrontend } from '../../../configURL';
import { auth  } from '../../components/firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { trainerPerfil } from '../../components/redux/actions/actions';
import { useDispatch, useSelector } from 'react-redux';
//components imports
import MenuprincipalTrainer from '../../components/menuprincipalTainer/menuprincipalTrainer';
import DashBar from '../../components/Dashbar/Dashbar';
import PagosprincipalTrainer from '../../components/pagosprincipalTrainer/pagosprincipalTrainer';
import EntrePrincipalTrainer from '../../components/entreprincipalTRainer/entreprincipalTrainer';
//styles
import React from 'react';
import './DashboardTrainer.css';





const DashboardTrainer = (props) => {

  const [menu, setmenu] = useState('deportes')
  const allTrainers=useSelector((state) => state.allTrainers)
  
  const trainer=useSelector((state)=>state.trainer)
  const dispatch=useDispatch()
 
  
  
  //firebase
  const [userSession, setUserSession] = useState(false)
  //modo escucha de firebase
 useEffect(()=>{
    onAuthStateChanged(auth, (user)=>{    //esta funcion es de firebase se queda en modo escucha cada vez que se carga la aplicacion.
    if(user){
      console.log(user.email)
      setUserSession(true)
      dispatch(trainerPerfil(user.email))
      console.log(trainer)
      
    } else{
      setUserSession(false)
      
      console.log(user)
    }
    })

    
    return () => {
    };
     

  },[allTrainers])

  //-------------------------*/
  const handleMenu = (e) => {
    const nom = e.target.name
    console.log(e.target.name)
    setmenu(nom)
  }
//*manejo de renderizado condicional del boton de admin

  return (<>
    {
      userSession ?
        <div className='bg-trainer-board'>
          <DashBar handleMenu={handleMenu}/>
          {menu === "deportes" && <MenuprincipalTrainer trainer={trainer}/>}
          {menu === "pagos" && <PagosprincipalTrainer />}
          {menu === "entrenamientos" && <EntrePrincipalTrainer />}
          <footer className='footerUser'><p>© 2023 FitRevolution </p></footer>
        </div> :
       <a href={`${URLfrontend}`}>Su sesion finalizó, haga click aqui.</a>
    }
  </>);
};

export default DashboardTrainer;
