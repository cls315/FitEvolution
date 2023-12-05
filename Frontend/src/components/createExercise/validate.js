export default function validate (values){
    let errors = {};

    if(!values.name) 
    errors.name='El campo es requerido';
if(values.name.length < 2 || values.name.length > 50) 
    errors.name= 'Entre 2 y 50 caracteres';  
if(!/^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s]+$/u.test(values.name)) 
    errors.name = 'Solo letras en este campo';
   
    // Validación de la imagen del ejercicio
    if(!values.image){
        errors.image= 'alguna imagen o video debe ser cargado';
      }else if(!/^(?:([^:/?#]+):)?(?:([^/?#]*))?([^?#]*\.(?:jpg|gif|png|webp))(?:\?([^#]*))?(?:#(.*))?$/gm.test(values.image)){
        errors.image= 'Imagen es invalido: debe ser una url de imagen.';
      };
   
    // Validación de la descripción del ejercicio
    if (!values.description) {
       errors.description = "La descripción del ejercicio es obligatoria";
    } else if (values.description.length < 10) {
       errors.description = "La descripción del ejercicio debe tener al menos 10 caracteres";
    }
   
    // Validación de la categoría del ejercicio
    if (!values.category) {
       errors.category = "La categoría del ejercicio es obligatoria";
    }
   
    // Validación de la duración estimada del ejercicio
    if (!values.estimatedDuration) {
       errors.estimatedDuration = "La duración estimada del ejercicio es obligatoria";
    } else if (values.estimatedDuration < 0) {
       errors.estimatedDuration = "La duración estimada del ejercicio debe ser un número positivo";
    }
   
    return errors;
   };


