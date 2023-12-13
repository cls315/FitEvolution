export default function validate(state) {
  const errors = {}

  if (!state.forename)
    errors.forename = 'El campo es requerido';
  if (state.forename.length < 2 || state.forename.length > 50)
    errors.forename = 'Entre 2 y 50 caracteres';
  if (!/^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s]+$/u.test(state.forename))
    errors.forename = 'Solo letras ';

      if(!state.surname) 
        errors.surname='El campo es requerido';
    if(state.surname.length < 2 || state.surname.length > 50) 
        errors.surname= 'Entre 2 y 50 caracteres';  
    if(!/^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s]+$/u.test(state.surname)) 
        errors.surname = 'Solo letras ';

  if (!state.email)
    errors.email = 'El email es obligatorio';
  const regEx = /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/;
  if (!regEx.test(state.email))
    errors.email = 'Ingresa una dirección de correo electrónico válida';

    const dni = state.dni

    if(!dni) {
      errors.dni='El DNI es obligatorio';
    }
    if(isNaN(dni)) {
      errors.dni='Ingresa un número de DNI válido';  
    }
    if(!Number.isInteger(parseFloat(dni))) {
      errors.dni='El DNI debe ser numérico';
    }
    if(dni.length < 7 || dni.length > 9) {
      errors.dni='El DNI debe tener entre 7 y 9 dígitos';
    } 
  return errors;
}



