const { Exercise } = require("../../db");

const postRoutines = async (
  name,
  image,
  description,
  category,
  muscle_trained,
  estimatedDuration
) => {
  try {
    // Calcular la duración total sumando las duraciones estimadas de los ejercicios

    // Crear la rutina con totalDuration calculado
    const newExercise = await Exercise.create({
      name,
      image,
      description,
      category,
      muscle_trained,
      estimatedDuration,
    });

    return newExercise;
  } catch (error) {
    throw error;
  }
};

module.exports = postRoutines;
