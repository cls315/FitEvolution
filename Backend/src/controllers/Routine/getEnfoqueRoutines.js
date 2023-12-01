// En tu archivo controllers/Routine/getEnfoqueRoutines.js (o donde lo tengas)

// Importa tu modelo o método de obtención de rutinas
const { Routine } = require("../../db");
const getRoutines = require("./getRoutines");

async function getEnfoqueRoutines(enfoque) {
  const rutinasEnDB = await Routine.findAll();
  if (rutinasEnDB.length === 0) await getRoutines();
  try {
    const rutinasActualizadas = await Routine.findAll({
      where: {
        enfoque: enfoque,
      },
    });

    return rutinasActualizadas;
  } catch (error) {
    // Manejo de errores si la obtención falla
    throw new Error(`Error al obtener rutinas por enfoque: ${error.message}`);
  }
}

module.exports = getEnfoqueRoutines;
