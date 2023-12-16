const { Client } = require("../../db");
const postCompleteClient = require("../../controllers/Clients/postCompleteClient");

const { sendWelcomeEmail } = require("../../../configNodemailer/nodemailer");

const postCompleteClientsHndls = async (req, res) => {
  console.log("Datos recibidos:", req.body);
  const clientId = req.params.id;

  const {
    forename,
    surname,
    image,
    email,
    phoneN,
    nationality,
    dateOfBirth,
    dni,
    gender,
  } = req.body;

  try {
    const existingClient = await Client.findById(clientId);
    const updatedClient = await postCompleteClient(
      clientId,
      forename,
      surname,
      image,
      email,
      phoneN,
      nationality,
      dateOfBirth,
      dni,
      gender
    );

    // Guardar los cambios en la base de datos
    await existingClient.save();
    res.status(200).json(updatedClient);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
};

module.exports = postCompleteClientsHndls;
