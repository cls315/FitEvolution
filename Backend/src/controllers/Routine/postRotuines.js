const { Routine } = require("../../db");

const postRoutines = async (exerc, enfoque, totalDuration, image) => {
  try {
    // Crear la rutina con totalDuration calculado
    const newRoutine = await Routine.create({
      enfoque,
      exerc,
      totalDuration,
      image,
    });

    return newRoutine;
  } catch (error) {
    throw error;
  }
};

module.exports = postRoutines;
