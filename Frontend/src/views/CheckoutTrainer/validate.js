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


    if(!state.dni) {
      errors.dni='El DNI es obligatorio';
    }
    if(isNaN(state.dni)) {
      errors.dni='Ingresa un número de DNI válido';  
    }
    if(!Number.isInteger(parseFloat(state.dni))) {
      errors.dni='El DNI debe ser numérico';
    }
    if(state.dni.length < 7 || state.dni.length > 9) {
      errors.dni='El DNI debe tener entre 7 y 9 dígitos';
    } 
    if (!state.description) {
      errors.description = "La descripción es obligatoria";
    } else if (state.description.length < 5 || state.description.length > 200) {
      errors.description = "La descripción debe tener al menos 5 caracteres y no más de 200 caracteres";
    }
    if (!state.focusTr) {      
      errors.focusTr = 'Elegir un enfoque es obligatorio';
    }
    if(!state.phoneN) { 
      errors.phoneN = 'El número de teléfono es obligatorio';
    }

    const regEx2 = /^\(?(\d{3})\)?[-]?(\d{3})[-]?(\d{4})$/;
    if(!regEx2.test(state.phoneN)) {
      errors.phoneN = 'Ingresa un número de teléfono válido, sin 0 ni 15';
    }
    if(!state.nationality)
    {errors.nationality="Elegir una Nacionalidad es obligatorio"}
    if(!state.gender)errors.gender="Elegir un Género es obligatorio"
    if (state.saveAddress !== true) {
      errors.saveAddress = 'Debes aceptar esta opción para continuar.';
    }
  return errors;
}



