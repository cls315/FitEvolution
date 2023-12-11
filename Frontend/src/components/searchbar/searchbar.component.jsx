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

        <div className="navbar-links" >
          <Button className={`nav-link ${isActive ? 'text-dark' : ''}`} component={Link} to={'/'}>
            Inicio
          </Button>
          <Button className={`nav-link ${isActiveAbout ? 'text-dark' : ''}`} component={Link} to={'/about'}>
            Sobre Nosotros
          </Button>
          <Button className={`nav-link ${isActiveLogin ? 'text-dark' : ''}`} component={Link} to={'/login/Entrenadores'}>
            Sos entrenador?
          </Button>
          <Button variant="contained" onClick={() => navigate('/login/Deportistas')}>
            Iniciar sesión
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default SearchBar;