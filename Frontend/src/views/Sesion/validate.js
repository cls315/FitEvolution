export default function validate(state) {
  const errors = {}

  if (!state.email)
    errors.email = 'El email es obligatorio';
  const regEx = /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/;
  if (!regEx.test(state.email))
    errors.email = 'Ingresa una dirección de correo electrónico válida';

  const passw = state.password
  if (!passw) {
    errors.password = 'La contraseña es obligatoria';
  } else if (passw.length < 6 || passw.search(/[A-Z]/) < 0 || passw.search(/[$&+,:;=?@#|'<>.^*()%!-]/) < 0) {
    errors.password = 'Debe tener al menos 6 caracteres, una mayúscula y un símbolo';
  }
  return errors;
}



