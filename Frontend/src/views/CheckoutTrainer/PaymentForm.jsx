import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import "./checkout.css"

export default function PaymentForm({handleTermsAcceptedChange}) {
  const handleCheckboxChange = (event) => {
    const isChecked = event.target.checked;
    handleTermsAcceptedChange(isChecked);
  };
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Terminos de uso y cobranzas
      </Typography>

        <Grid container spacing={3}>
        <div>
  <p className='parrafoPayments'>
    Al registrarte como entrenador en FitRevolution, aceptas los siguientes términos de cobro que se aplicarán a todos los deportistas que se suscriban a tus servicios a través de nuestra plataforma:
    <br />
    <br />
    <strong>Tarifa de Servicio:</strong> FitRevolution cobrará una tarifa de servicio del 10% sobre el total de los ingresos generados por cada deportista que contrate tus servicios como entrenador.
    <br />
    <br />
    <strong>Cálculo de la Tarifa:</strong> La tarifa del 10% se calculará sobre la suma total de las tarifas de suscripción o cualquier otro cargo aplicable que los deportistas paguen directamente a través de la plataforma FitRevolution.
    <br />
    <br />
    <strong>Proceso de Cobro:</strong> FitRevolution se encargará automáticamente de deducir la tarifa correspondiente antes de transferir los ingresos restantes a tu cuenta. Los pagos se realizarán de manera periódica, según los términos establecidos en nuestras políticas de pago.
    <br />
    <br />
    <strong>Transparencia:</strong> Puedes acceder a un registro detallado de tus ingresos y las tarifas aplicadas a través de tu panel de control en FitRevolution en cualquier momento.
    <br />
    <br />
    <strong>Cambios en las Tarifas:</strong> FitRevolution se reserva el derecho de ajustar las tarifas de servicio en cualquier momento, previa notificación a los entrenadores. Sin embargo, cualquier cambio en las tarifas no afectará las transacciones ya completadas antes de la fecha de entrada en vigencia de dichos cambios.
    <br />
    <br />
    Al completar el registro como entrenador en FitRevolution, reconoces y aceptas estos términos de cobro. Te recomendamos revisar regularmente nuestros términos y condiciones para mantenerte informado sobre cualquier actualización.
    <br />
    <br />
    Gracias por ser parte de la comunidad de FitRevolution y contribuir al bienestar de nuestros deportistas.
    <br />
    <br />
    <strong>FitRevolution Team</strong>
  </p>
</div>

          
          <Grid item xs={12}>
          <FormControlLabel
        control={<Checkbox color="secondary" name="saveCard" value="yes" onChange={handleCheckboxChange} />}
        label="Aceptar términos y condiciones"
      />
            
          </Grid>
        </Grid>
    </React.Fragment>
  );
}
