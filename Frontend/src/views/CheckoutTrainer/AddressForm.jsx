import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function AddressForm() {
  const trainer = useSelector((state) => state.trainer)
  console.log(trainer)

  const [form, setForm] = React.useState({
    enfoque:"",
    nacionalidad:"",
  });

  const handleChange = (event) => {
    const value=event.target.value
    const property=event.target.name
    setForm({...form,[property]: value});
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Por favor completar el formulario
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="First name"
            fullWidth
            autoComplete="given-name"
            variant="standard"
            value={trainer.forename ? trainer.forename : null}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Last name"
            fullWidth
            autoComplete="family-name"
            variant="standard"
            value={trainer.surname ? trainer.surname : null}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="email"
            name="email"
            label="Correo electronico"
            fullWidth
            autoComplete="email"
            variant="standard"
            value={trainer.email ? trainer.email : null}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="descripcion"
            name="descripcion"
            label="Descripcion(antecendentes, matriculas, etc)"
            fullWidth
            autoComplete="shipping address-line2"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
        
            <FormControl variant="standard" fullWidth>
              <InputLabel id="demo-simple-select-standard-label">Enfoque</InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={form.enfoque}
                onChange={handleChange}
                label="Enfoque"
              >
                <MenuItem value={"Entrenamiento de fuerza"}>Entrenamiento de fuerza</MenuItem>
                <MenuItem value={"Entrenamiento funcional"}>Entrenamiento funcional</MenuItem>
                <MenuItem value={"Entrenamiento cardiovascular"}>Entrenamiento cardiovascular</MenuItem>
                <MenuItem value={"Entrenamiento deportivo"}>Entrenamiento deportivo</MenuItem>
              </Select>
            </FormControl>
          
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="DNI"
            name="DNI"
            label="DNI"
            fullWidth
            autoComplete="DNI"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="Telefono"
            name="Telefono"
            label="Telefono"
            fullWidth
            autoComplete="Telefono"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
        
        <FormControl variant="standard" fullWidth>
          <InputLabel id="demo-simple-select-standard-label">Nacionalidad</InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={form.nacionalidad}
            onChange={handleChange}
            label="Nacionalidad"
          >
            <MenuItem value={"Argentina"}>Argentina</MenuItem>
            <MenuItem value={"Brasil"}>Brasil</MenuItem>
            <MenuItem value={"Chile"}>Chile</MenuItem>
            <MenuItem value={"Bolivia"}>Bolivia</MenuItem>
            <MenuItem value={"Otro"}>Otro</MenuItem>
          </Select>
        </FormControl>
      
    </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="Genero"
            name="Genero"
            label="Genero"
            fullWidth
            autoComplete="Genero"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="dateOfBirth"
            name="dateOfBirth"
            label="Fecha de nacimiento"
            fullWidth
            autoComplete="dateOfBirth"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
            label="Use this address for payment details"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
