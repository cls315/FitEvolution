export default function validate(state){
  console.log(state)
  const errors={}

    if(!state.forename) 
        errors.forename='El campo es requerido';
    if(state.forename.length < 2 || state.forename.length > 50) 
        errors.forename= 'Entre 2 y 50 caracteres';  
    if(!/^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s]+$/u.test(state.forename)) 
        errors.forename = 'Solo letras en este campo';
      
    
  /*  if(!state.surname) 
        errors.surname='El campo es requerido';
    if(state.surname.length < 2 || state.surname.length > 50) 
        errors.surname= 'La longitud del campo debe estar entre 2 y 50 caracteres';  
    if(!/^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s]+$/u.test(state.surname)) 
        errors.surname = 'Solo se permiten letras en este campo';*/

    if(!state.image){
        errors.image= 'El campo imagen debe ser completado.';
      }else if(!/^(?:([^:/?#]+):)?(?:([^/?#]*))?([^?#]*\.(?:jpg|gif|png|webp))(?:\?([^#]*))?(?:#(.*))?$/gm.test(state.image)){
        errors.image= 'Imagen es invalido: debe ser una url de imagen.';
      };
    
    if(!state.email) 
      errors.email='El email es obligatorio'; 
        const regEx = /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/;
    if(!regEx.test(state.email)) 
      errors.email='Ingresa una dirección de correo electrónico válida';
  /*  
      if(!state.phoneN) { 
        errors.phoneN = 'El número de teléfono es obligatorio';
      }
  
      const regEx2 = /^\(?(\d{3})\)?[-]?(\d{3})[-]?(\d{4})$/;
      if(!regEx2.test(state.phoneN)) {
        errors.phoneN = 'Ingresa un número de teléfono válido, sin 0 ni 15';
      }
    
      const nationality = state.nationality
      if(!nationality) 
          errors.nationality='El campo es requerido';
      if(nationality.length < 2 || nationality.length > 50) 
          errors.nationality= 'La longitud del campo debe estar entre 2 y 50 caracteres';  
      if(!/^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s]+$/u.test(nationality)) 
          errors.nationality = 'Solo se permiten letras en este campo';

    
          
      if(!state.dateOfBirth) {  
        errors.dateOfBirth='La fecha de nacimiento es obligatoria';
      }
  
      const date = new Date(state.dateOfBirth);
  
      if(!(date instanceof Date && !isNaN(date))) {
        errors.dateOfBirth='Por favor, introduce una fecha de nacimiento válida';
      }
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
              }*/
          
       // if(!state.gender) errors.gender="debes seleccionar una opción"
              const description = state.description
        if(!description) errors.description=" Debes completar este campo"
        if(description.length >200) errors.description="200 carácteres máximo"
             const passw = state.password
             console.log(passw)
         if(!passw) {
             errors.password = 'La contraseña es obligatoria';
           } else if(passw.length < 6 || passw.search(/[A-Z]/) < 0 || passw.search(/[$&+,:;=?@#|'<>.^*()%!-]/) < 0) {
             errors.password = 'Debe tener al menos 6 caracteres, una mayúscula y un símbolo';
           }
           if (!state.repeatpassword) {
             errors.repeatpassword = 'Por favor confirma tu contraseña';  
           } else if (state.repeatpassword !== state.password) {
             errors.repeatpassword = 'Las contraseñas no coinciden';
           }
    return errors;
        }

     
  
