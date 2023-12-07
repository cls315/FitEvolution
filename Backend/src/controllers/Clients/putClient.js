const { Client } = require("../../db");
const axios = require("axios");
const { API_CLIENTES } = require("../urls");

const putClients = async (req, res) => {
  const { id } = req.params;
  try {
    const { banned } = req.body;

    const clientDb = await Client.findByPk(id);

    if (!clientDb) {
      throw new Error("cliente no encontrado");
    }
    // actualizo el estado del cliente
    clientDb.banned = banned || clientDb.banned;

    return await clientDb.save();
  } catch (error) {
    throw new Error(`Error en la solicitud : ${error.message}`);
  }
};

module.exports = putClients;
