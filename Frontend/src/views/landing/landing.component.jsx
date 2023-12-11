//Components
import Loading from '../../components/loading/loading.component'
import SearchBar from '../../components/searchbar/searchbar.component';
import SliderLanding from '../../components/sliderLanding/sliderLanding.component';
//Commons imports
import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom';
import iconos from '../../images/iconos.png'
import { useDispatch } from 'react-redux';
import { setusuario } from '../../components/redux/actions/actions';
//Styles
import style from "./landing.module.css"
//Material UI
import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';


function Landing(props) {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const dispatch=useDispatch()


  useEffect(() => {
    dispatch(setusuario(""))
    return () =>{
      
    } 
  }, []);

  return (<div className={style.containerForm}>
    <SearchBar />
    <div className={style.conteinerTitle}>
      <div className={style.sliderLandingClass}>
      <SliderLanding />
      </div>
      <div className={style.Title}>
        <h2 className={style.subTitle1Landing}>Asociate a una de nuestras membresias</h2>
        <h1 className={style.title1Landing}>COMIENZA AHORA GRATIS!</h1>
        <h2 className={style.subTitle1Landing}>Disfruta de todos los beneficios de FitRevolution</h2>
        <img className={style.iconosLanding} src={iconos} alt="iconos"></img>
        <Button onClick={() => {
          navigate('/select/')
        }}variant="contained">Comenzar</Button>
      </div>
    </div>



  </div>)
}

export default Landing