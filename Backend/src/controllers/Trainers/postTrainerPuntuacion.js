const postTrainerPuntuacion = async (entrenador, nuevaPuntuacion) => {
  try {
    // Verificar si la puntuación es válida según el modelo
    const puntuacionNumerica = parseFloat(nuevaPuntuacion);
    if (
      isNaN(puntuacionNumerica) ||
      puntuacionNumerica < 0 ||
      puntuacionNumerica > 5
    ) {
      throw new Error("La puntuación debe ser un número entre 0 y 5");
    }

    // Agregar la nueva puntuación al array existente
    const puntuacionesActualizadas = [
      nuevaPuntuacion, // Convertir a string para asegurar que coincida con el modelo
    ];

    return puntuacionesActualizadas;
  } catch (error) {
    throw error; // Propagar el error para manejarlo en la función que llama a postTrainerPuntuacion
  }
};

module.exports = postTrainerPuntuacion;
