const { Routine } = require("../../db");

const postRoutines = async (exerc, enfoque, precio) => {
  try {
    // Calcular la duración total sumando las duraciones estimadas de los ejercicios

    // Crear la rutina con totalDuration calculado
    const newRoutine = await Routine.create({
      exerc,
      enfoque,
      precio,
    });

    return newRoutine;
  } catch (error) {
    throw error;
  }
};

module.exports = postRoutines;
