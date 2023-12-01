const axios = require("axios");

const { Exercise } = require("../../db");
const { API_EJERCICIOS } = require("../urls");

const getExercise = async () => {
  const exercisesInDB = await Exercise.findAll();

  if (exercisesInDB.length === 0) {
    // No hay rutinas en la base de datos, cargar desde la API local
    const apiExercises = (await axios.get(API_EJERCICIOS)).data;

    // Mapear los datos de la API al modelo de datos de la base de datos
    const mappedExercises = apiExercises.map((e) => ({
      name: e.name,
      image: e.image,
      description: e.description,
      category: e.category,
      muscle_trained: e.muscle_trained,
      estimatedDuration: e.estimatedDuration,

      // Puedes agregar otros campos aquí según sea necesario
    }));

    // Crear las rutinas en la base de datos
    return await Exercise.bulkCreate(mappedExercises);

    // Obtener las rutinas después de cargarlas desde la API
    const updatedExercises = await Exercise.findAll();

    return updatedExercises;
  }

  // Hay rutinas en la base de datos, simplemente retornarlas
  return exercisesInDB;
};

module.exports = getExercise;
