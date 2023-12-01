// getRoutines.js

const axios = require("axios");
const { Routine, Trainer } = require("../../db");
const { API_RUTINAS } = require("../urls");

const getRoutines = async () => {
  const routinesInDB = await Routine.findAll();

  if (routinesInDB.length === 0) {
    const apiRoutines = (await axios.get(API_RUTINAS)).data;
    const mappedRoutines = apiRoutines.map((r) => ({
      exerc: r.exerc,
      totalDuration: r.totalDuration,
      enfoque: r.enfoque,
      trainerId: r.trainerId,
      precio: r.precio,
    }));

    // Crear las rutinas en la base de datos
    await Routine.bulkCreate(mappedRoutines);
  }

  const updatedRoutines = await Routine.findAll();

  return updatedRoutines.map((routine) => ({
    id: routine.id,
    exerc: routine.exerc,
    totalDuration: routine.totalDuration,
    enfoque: routine.enfoque,
    trainerId: routine.trainerId, // asignar el TrainerId correspondiente
    precio: routine.precio,
  }));
};

module.exports = getRoutines;
