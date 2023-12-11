//Components
import Alert from '../alert/alert.component'
//Common imports
import { URLSERVER } from '../../../configURL.js';
import imagelogo from '../../images/imageLogo.jpg'
import React from 'react';
import { Link, useMatch,useLocation,useNavigate } from 'react-router-dom';
//Styles
import './searchbar.css';
import 'bootstrap/dist/css/bootstrap.min.css'
//Material UI
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';



function SearchBar(props) {
  const location = useLocation();
  const navigate = useNavigate();
  const isActive = location.pathname === '/';
  const isActiveAbout = location.pathname === '/about';
  const isActiveLogin = location.pathname === '/login';
  const isActiveRegister = location.pathname === '/login/Deportistas';

  return (
    <AppBar position="static" className="navbar">
      <Toolbar className='navbarLanding'>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
        >
          <MenuIcon />
        </IconButton>
        <Link to={'/'}>
          <img className="imagelogo" src={imagelogo} alt="logo" />
        </Link>

        <div
          class='collapse navbar-collapse'
          id='navbarTogglerDemo03'>
          <ul class='navbar-nav mr-auto mt-2 mt-lg-0'>
            <li class='nav-item'>
              <button className='bt-nav-landing'>
                <Link
                  className={`nav-link  ${isActive ? 'text-warning' : ''}`}
                  to={'/'}>
                  Inicio
                </Link>
              </button>
            </li>

            <li class='nav-item'>
              <button className='bt-nav-landing'>
                <Link
                  className={`nav-link  ${isActiveAbout ? 'text-warning' : ''}`}
                  to={'/about'}>
                  Sobre Nosotros
                </Link>
              </button>
            </li>

            <li class='nav-item active'>
              <button className='bt-nav-landing'>
              <Link
                  className={`nav-link  ${isActiveLogin ? 'text-warning' : ''}`}
                  to={'/login/Entrenadores'}>
                  Sos entrenador?
                </Link>
              </button>
            </li>

            <li class='nav-item'>
              <button className='bt-nav-landing-register'>
              <Link
                  className={`nav-link  ${isActiveRegister ? 'text-warning' : ''}`}
                  to={'/login/Deportistas'}>
                  Iniciar sesion
                </Link>
              </button>
            </li>
          </ul>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default SearchBar;