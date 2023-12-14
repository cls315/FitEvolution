import React, { useState } from 'react';
import { TextField, Button, Typography, Paper, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate()


  const LogSuper =( username, password)=>{

    if( username="superadmin" && password==="Nohayplata")
    alert ("loguin correcto")
else alert("loguin incorrecto")
  }

  const handleLogin = (event) => {
    navigate('/owner')
    event.preventDefaul(LogSuper(username,password))
    
  };

  return (
    <Grid container justifyContent="center" alignItems="center" sx={{ height: '100vh' }}>
      <Grid item xs={12} sm={8} md={5}>
        <Paper elevation={6} square sx={{ p: 4, textAlign: 'center' }}>
          <Typography component="h1" variant="h5" sx={{ mb: 4 }}>
            Iniciar sesión Super Admin
          </Typography>
          <TextField
            fullWidth
            margin="normal"
            label="Usuario"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Contraseña"
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleLogin}
            sx={{ mt: 2 }}
          >
            Iniciar sesión
          </Button>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default LoginForm;