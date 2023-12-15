import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ListEmails from './listEmails';
import Swal from 'sweetalert2';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import { URLSERVER } from '../../../configURL';
import { useState, useEffect } from 'react';
import DialogContentText from '@mui/material/DialogContentText';
import Grid from '@mui/material/Grid';
//* Widget Cloudinary
import UploadWidCloud from '../../components/Cloudinary/UploadWidCloud';


export default function MensajesMasivosAdm() {
  const [open, setOpen] = useState(false);
  const [refresh, setRefresh] = useState(0);
  const [form, setForm] = useState({
    message: "",
    imgLink: "",
    emails: [],
    emailsFilter: []
  })
  console.log(form)

  const uploadImage = (img) => {
    setForm({ ...form, imgLink: img })
  }

  useEffect(() => {
    axios(`${URLSERVER}/fitevolution/nodemailer/email`)
      .then(({ data }) => {
        setForm({ ...form, emails: data })
        console.log(form.emails)
      })
      .catch((error) => {
        Swal.fire(error.message, '', 'error')
      })

  }, [refresh])

  const handleEmails = (e) => {
    const property = e.target.name
    const value = e.target.value;
    console.log(value)
    if (value === "Todos") {
      setForm({ ...form, emailsFilter: form.emails })
    }

    if (value === "Usuario") {
      let emailsfiltered = form.emails.filter(em => em.role === "Usuario")
      setForm({ ...form, emailsFilter: emailsfiltered })
    }

    if (value === "Trainer") {
      let emailsfiltered = form.emails.filter(em => em.role === "Trainer")
      setForm({ ...form, emailsFilter: emailsfiltered })
    }
    setRefresh(refresh + 1)
  }

  const handleChange = (e) => {
    const property = e.target.name
    const value = e.target.value;
    setForm({
      ...form,
      [property]: value
    });
  };

  const handleClickOpen = () => {
    setOpen(true);
    setRefresh(refresh + 1)
  };

  const handleClose = (event, reason) => {
    if (reason !== 'backdropClick') {
      setOpen(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault()
try{
  axios.post(`${URLSERVER}/fitevolution/nodemailer/sendEmail`,form)
  setOpen(false)
  Swal.fire('Correos enviados!', "", "success");
}catch(error){
  Swal.fire(error.message, '', 'error')
}
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>Enviar mensajes</Button>
      <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
        <DialogTitle>Enviar mensajes</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'row' }}>
            <FormControl sx={{ m: 1, minWidth: 415 }}>
              <DialogContentText sx={{ margin: 2 }}>{'Mensaje:'}</DialogContentText>
              <TextField
                id="outlined-multiline-static"
                label="Escribe un mensaje"
                multiline
                rows={4}
                name="message"
                onChange={handleChange}
                placeholder='Escribe un mensaje'
              />
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 415 }}>
              <DialogContentText sx={{ margin: 2 }}>{'Añadir FLYER'}</DialogContentText>
              <UploadWidCloud uploadImage={uploadImage} />
            </FormControl>
            <DialogContentText sx={{ margin: 2 }}>{'Filtrar emails:'}</DialogContentText>
            <FormControl sx={{ m: 1, width: '415px', flexDirection: "row" }}>
              <FormControl sx={{ m: 1, width: "200px" }}>
                <InputLabel htmlFor="demo-dialog-native">Tipo de cuenta</InputLabel>
                <Select
                  native
                  labelId="demo-dialog-select-label"
                  id="demo-dialog-select"
                  onChange={handleEmails}
                  input={<OutlinedInput label="Tipo de cuenta" id="demo-dialog-native" />}
                >
                  <option aria-label="None" value="" />
                  <option value={"Todos"}>Todos</option>
                  <option value={"Usuario"}>Deportistas</option>
                  <option value={"Trainer"}>Entrenadores</option>
                </Select>
              </FormControl>
              <FormControl sx={{ m: 1, width: "200px" }}>
                <Grid item xs={12} sm={20}>
                  <TextField
                    required
                    id="id"
                    name="id"
                    label="Buscar por ID"
                    fullWidth
                    autoComplete="given-name"
                    native
                    onChange={handleChange}
                  />
                </Grid>
              </FormControl>
              {/* <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-dialog-select-label">Estado de cuenta</InputLabel>
                <Select
                  labelId="demo-dialog-select-label"
                  id="demo-dialog-select"
                  value={""}
                  onChange={handleChange}
                  input={<OutlinedInput label="Estado de cuenta" />}
                  defaultValue='Todos'
                >
                  <MenuItem value={10}>Activos</MenuItem>
                  <MenuItem value={20}>No activos</MenuItem>
                  <MenuItem value={30}>Todos</MenuItem>
                </Select>
              </FormControl>*/}
            </FormControl>
            <DialogContentText sx={{ margin: 2 }}>{'Listado de correos:'}</DialogContentText>
            <FormControl sx={{ m: 1, minWidth: 415 }}>
              <ListEmails emails={form.emailsFilter} defaultemails={form.emails} />
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => { setRefresh(refresh + 1) }}>Actualizar</Button>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Enviar emails</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}