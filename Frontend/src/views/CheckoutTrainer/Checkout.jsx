import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import Review from './Review';
import logout from '../../utils/logout';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import './checkout.css'
import validate from "./validate.js";
import axios from 'axios';
import { URLSERVER } from '../../../configURL.js';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        FitRevolution
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const steps = ['Datos del entrenador', 'Detalles de pago', 'Verificar y enviar'];

function getStepContent(step,errors,form,handleDateofbirth,handleChange,handleTermsAcceptedChange) {
  switch (step) {
    case 0:
      return <AddressForm form={form} errors={errors} handleDateofbirth={handleDateofbirth} handleChange={handleChange}/>;
    case 1:
      return <PaymentForm handleTermsAcceptedChange={handleTermsAcceptedChange}/>;
    case 2:
      return <Review form={form}/>;
    default:
      throw new Error('Unknown step');
  }
}

export default function Checkout() {
const [termsAccepted, setTermsAccepted] = React.useState(false);

  const [activeStep, setActiveStep] = React.useState(0);
  const navigate=useNavigate()
  const trainer = useSelector((state) => state.trainer)
  console.log(trainer)
  const [errors, setErrors] = useState({});
  console.log(errors)
  const [form, setForm] = React.useState({
    forename: trainer.forename ? trainer.forename : "",
    surname: trainer.surname ? trainer.surname : "",
    email: trainer.email ? trainer.email : "",
    description: trainer.description ? trainer.description : "",
    focusTr: "",
    dni: "",
    phoneN: "",
    nationality: "",
    gender: "",
    dateOfBirth: "",
    saveAddress:false,
  });
  console.log(form)
  console.log(trainer.id)

  const handleChange = (event) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
  const property = event.target.name;
    setForm({ ...form, [property]: value });
    setErrors(validate({ ...form, [property]: value }));
  };

  const handleDateofbirth=(newValue)=>{
    console.log(newValue)
    let newValueformat=`${newValue.$D},${newValue.$M},${newValue.$y}`
    setForm({ ...form, dateOfBirth: newValueformat })
   
  }

  const handleNext = async() => {
    if (Object.values(form).some(inp => inp === "")) {  //some comprueba si algun elemento del array es "", si hay un "" quiere decir que hay un input vacio
      Swal.fire('DEBÉS COMPLETAR TODOS LOS CAMPOS!', "", 'error');
      return;
  }else if(activeStep===1 && !termsAccepted){
    Swal.fire('TIENES QUE ACEPTAR LOS TERMINOS Y CONDICIONES',"","warning")
    return;
  }

  if (Object.values(errors).some(error => error)) {
    Swal.fire('EL FORMULARIO CONTIENE ERRORES!', "", "error");
    return;
  }
    setActiveStep(activeStep + 1);
    console.log(activeStep)
    if(activeStep===2){
      try{
      await axios.post(`${URLSERVER}/fitevolution/trainers/${trainer.id}/complete`,form)
      Swal.fire('FORMULARIO ENVIADO!', "", "success");
      }catch(error){
        if (error) Swal.fire(error.message, '', 'error')
      }

    return;
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const exitSession=async()=>{
    await logout()
    navigate('/')
  }
const handleTermsAcceptedChange = (isChecked) => {
  setTermsAccepted(isChecked);
};


//*para generar un numero de seguimiento aleatorio 
function generarNumeroSeguimiento() {
  const numeroAleatorio = Math.floor(Math.random() * 1000000) + 1;
  return `#${numeroAleatorio}`;
}

const numeroSeguimiento = generarNumeroSeguimiento();
  return (<div className='conteiner'>
    <React.Fragment >
      <CssBaseline />
      <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: 'relative',
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            FitRevolution
          </Typography>
          <Button
            variant="contained"
            onClick={exitSession}
            style={{ marginLeft:'auto', marginRight:'0px' }}
          >
          Cerrar sesion
          </Button>

        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Solicitud de entrenadores
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography variant="h5" gutterBottom>
                Gracias por elegirnos
              </Typography>
              <Typography variant="subtitle1">
                Tu numero de seguimiento es {numeroSeguimiento}. Te confirmaremos por email cuando este
                la cuenta aprobada, suele demorar menos de 24 horas.
              </Typography>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {getStepContent(activeStep,errors,form,handleDateofbirth,handleChange,handleTermsAcceptedChange)}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Back
                  </Button>
                )}

                <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{ mt: 3, ml: 1 }}
                >
                  {activeStep === steps.length - 1 ? 'Enviar' : 'Next'}
                </Button>
              </Box>
            </React.Fragment>
          )}
        </Paper>
        <Copyright />
      </Container>
    </React.Fragment>
    </div>);
}
