import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export default function PaymentForm() {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Detalles de
      </Typography>
      <Grid container spacing={3}>
        <Typography variant="h6" gutterBottom>
          Descripción de Cobro para Entrenadores en FitRevolution
        </Typography>
        <Grid container spacing={3}>
          <p>
            Al registrarte como entrenador en FitRevolution, aceptas los siguientes términos de cobro que se aplicarán a todos los deportistas que se suscriban a tus servicios a través de nuestra plataforma:
            Tarifa de Servicio: FitRevolution cobrará una tarifa de servicio del 10% sobre el total de los ingresos generados por cada deportista que contrate tus servicios como entrenador.
            Cálculo de la Tarifa: La tarifa del 10% se calculará sobre la suma total de las tarifas de suscripción o cualquier otro cargo aplicable que los deportistas paguen directamente a través de la plataforma FitRevolution.
            Proceso de Cobro: FitRevolution se encargará automáticamente de deducir la tarifa correspondiente antes de transferir los ingresos restantes a tu cuenta. Los pagos se realizarán de manera periódica, según los términos establecidos en nuestras políticas de pago.
            Transparencia: Puedes acceder a un registro detallado de tus ingresos y las tarifas aplicadas a través de tu panel de control en FitRevolution en cualquier momento.
            Cambios en las Tarifas: FitRevolution se reserva el derecho de ajustar las tarifas de servicio en cualquier momento, previa notificación a los entrenadores. Sin embargo, cualquier cambio en las tarifas no afectará las transacciones ya completadas antes de la fecha de entrada en vigencia de dichos cambios.
            Al completar el registro como entrenador en FitRevolution, reconoces y aceptas estos términos de cobro. Te recomendamos revisar regularmente nuestros términos y condiciones para mantenerte informado sobre cualquier actualización.
            Gracias por ser parte de la comunidad de FitRevolution y contribuir al bienestar de nuestros deportistas.
          </p>
          <p>FitRevolution Team</p>
          <Grid item xs={12}>
            <FormControlLabel
              control={<Checkbox color="secondary" name="saveCard" value="yes" />}
              label="Aceptar"
            />
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
