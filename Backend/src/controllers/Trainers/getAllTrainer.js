const axios = require("axios");
const { Trainer } = require("../../db");

const { API_TRAINERS } = require("../urls");

const allTrainer = async () => {
  const trainer = await Trainer.findAll();
  if (trainer.length === 0) {
    const api = (await axios.get(`${API_TRAINERS}`)).data;
    const apiTrain = api.map((t) => ({
      forename: t.forename,
      surname: t.surname,
      image: t.image,
      phoneN: t.phoneN,
      nationality: t.nationality,
      dateOfBirth: t.dateOfBirth,
      email: t.email,
      dni: t.dni,
      gender: t.gender,
      focusTr: t.focusTr,
      description: t.description,
      puntuaciones: t.puntuaciones,
      rutinaPredeterminada: t.rutinaPredeterminada,
    }));
    return await Trainer.bulkCreate(apiTrain);
  }
  if (!trainer)
    throw new Error("No se encontraron Entrenadores en la base de datos");
  return trainer;
};

module.exports = allTrainer;
