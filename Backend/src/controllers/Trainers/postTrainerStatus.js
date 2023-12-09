const postTrainerStatus = async (entrenador, nuevoStatus) => {
  try {
    // Verificar que el nuevo estado sea válido
    if (nuevoStatus !== "Active" && nuevoStatus !== "Suspended") {
      throw new Error("El nuevo estado no es válido");
    }

    // Actualizar el estado del entrenador
    entrenador.status = nuevoStatus;

    // Devolver el nuevo estado
    return entrenador.status;
  } catch (error) {
    throw error;
  }
};

module.exports = postTrainerStatus;
