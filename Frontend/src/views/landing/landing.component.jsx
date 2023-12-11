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
// Material-UI components
import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


function Landing(props) {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setusuario(""));
    return () => {};
  }, []);

  return (
    <div className={style.containerForm}>
      <SearchBar />
      <div className={style.conteinerTitle}>
        <div className={style.sliderLandingClass}>
          <SliderLanding />
        </div>
        <div className={style.Title}>
          <Typography variant="h6" className={style.subTitle1Landing}>
            Asociate a una de nuestras membresias
          </Typography>
          <Typography variant="h3" className={style.title1Landing}>
            COMIENZA AHORA GRATIS!
          </Typography>
          <Typography variant="h6" className={style.subTitle1Landing}>
            Disfruta de todos los beneficios de FitRevolution
          </Typography>
          <img className={style.iconosLanding} src={iconos} alt="iconos" />
          <Button onClick={() => navigate('/select/')} variant="contained" style={{ marginLeft: '170px' }}>
            Comenzar
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Landing;