import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useSelector } from 'react-redux';
import { FormHelperText } from '@mui/material';

export default function AddressForm(props) {
  const {form,errors,handleDateofbirth,handleChange}=props
  const trainer = useSelector((state) => state.trainer)


  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Por favor completar el formulario
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            error={!!errors.forename}
            required
            id="error"
            name="forename"
            label="Nombre"
            fullWidth
            autoComplete="given-name"
            variant="standard"
            defaultValue={trainer.forename ? trainer.forename : null}
            onChange={handleChange}
            helperText={errors.forename}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            error={!!errors.surname}
            required
            id="surname"
            name="surname"
            label="Apellido"
            fullWidth
            autoComplete="family-name"
            variant="standard"
            defaultValue={trainer.surname ? trainer.surname : null}
            onChange={handleChange}
            helperText={errors.surname}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            error={!!errors.email}
            id="email"
            name="email"
            label="Correo electronico"
            fullWidth
            autoComplete="email"
            variant="standard"
            defaultValue={trainer.email ? trainer.email : null}
            onChange={handleChange}
            helperText={errors.email}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="description"
            name="description"
            error={!!errors.description}
            label="Descripcion(antecedentes, matriculas, etc)"
            fullWidth
            autoComplete="description"
            variant="standard"
            defaultValue={trainer.description ? trainer.description : null}
            onChange={handleChange}
            helperText={errors.description}
          />
        </Grid>
        <Grid item xs={12} sm={6}>

          <FormControl variant="standard" fullWidth>
            <InputLabel id="demo-simple-select-standard-label">Enfoque</InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              error={!!errors.focusTr}
              value={form.focusTr}
              onChange={handleChange}
              label="Enfoque"
              name="focusTr"
              defaultValue={form.focusTr ? form.focusTr : null}
            >
              <MenuItem value={"Entrenamiento de fuerza"}>Entrenamiento de fuerza</MenuItem>
              <MenuItem value={"Entrenamiento funcional"}>Entrenamiento funcional</MenuItem>
              <MenuItem value={"Entrenamiento cardiovascular"}>Entrenamiento cardiovascular</MenuItem>
              <MenuItem value={"Entrenamiento deportivo"}>Entrenamiento deportivo</MenuItem>
            </Select>
            {!!errors.focusTr && <FormHelperText>{errors.focusTr}</FormHelperText>}
          </FormControl>

        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="dni"
            name="dni"
            error={!!errors.dni}
            label="DNI"
            fullWidth
            autoComplete="DNI"
            variant="standard"
            onChange={handleChange}
            defaultValue={form.dni ? form.dni : null}
            helperText={errors.dni}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="phoneN"
            name="phoneN"
            error={!!errors.phoneN}
            label="Telefono"
            fullWidth
            autoComplete="Telefono"
            variant="standard"
            onChange={handleChange}
            defaultValue={form.phoneN ? form.phoneN : null}
            helperText={errors.phoneN}  
          />
        </Grid>
        <Grid item xs={12} sm={6}>

          <FormControl variant="standard" fullWidth>
            <InputLabel id="demo-simple-select-standard-label">Nacionalidad</InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              error={!!errors.nationality}
              value={form.nationality}
              onChange={handleChange}
              label="Nacionalidad"
              name="nationality"
              defaultValue={form.nationality ? form.nationality : null}
            >
              <MenuItem value={"Argentina"}>Argentina</MenuItem>
              <MenuItem value={"Brasil"}>Brasil</MenuItem>
              <MenuItem value={"Chile"}>Chile</MenuItem>
              <MenuItem value={"Bolivia"}>Bolivia</MenuItem>
              <MenuItem value={"Otro"}>Otro</MenuItem>
            </Select>
            {!!errors.nationality && <FormHelperText>{errors.nationality}</FormHelperText>}

          </FormControl>

        </Grid>
        <Grid item xs={12} sm={6}>
        <FormControl variant="standard" fullWidth>
            <InputLabel id="demo-simple-select-standard-label">Género</InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              error={!!errors.gender}
              value={form.gender}
              onChange={handleChange}
              label="Género"
              name="gender"
              defaultValue={form.gender ? form.gender : null}
            >
              <MenuItem value={"Masculino"}>Masculino</MenuItem>
              <MenuItem value={"Femenino"}>Femenino</MenuItem>
              <MenuItem value={"Otro"}>Otro</MenuItem>
            </Select>
            {!!errors.gender && <FormHelperText>{errors.gender}</FormHelperText>}

          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <LocalizationProvider dateAdapter={AdapterDayjs} variant="standard">
            <DatePicker views={['day', 'month','year']} onChange={(newValue)=>{handleDateofbirth(newValue)}} />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12}>
  <FormControlLabel
    control={<Checkbox color="secondary" name="saveAddress" checked={form.saveAddress} onChange={handleChange} />}
    label="Usar esta dirección para comunicarse con FitRevolution"
  />
  {errors.saveAddress && <FormHelperText fullWidth sx={{textAlign:'center'}}>{errors.saveAddress}</FormHelperText>}
</Grid>

      </Grid>
    </React.Fragment>
  );
}
