const axios = require("axios");
const { Client } = require("../../db");
const { API_CLIENTES } = require("../urls");

const allClient = async () => {
  try {
    const clients = await Client.findAll();
    if (clients.length === 0) {
      const api = (await axios.get(`${API_CLIENTES}`)).data;
      const dataApi = api.map((t) => ({
        forename: t.forename,
        surname: t.surname,
        image: t.image,
        email: t.email,
        phoneN: t.phoneN,
        nationality: t.nationality,
        dateOfBirth: t.dateOfBirth,
        dni: t.dni,
        gender: t.gender,
        banned:t.banned
      }));
      await Client.bulkCreate(dataApi);
    }
    return await Client.findAll();
  } catch (error) {
    throw new Error(`Error al obtener datos de la API: ${error.message}`);
  }
};

module.exports = allClient;
