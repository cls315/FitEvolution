const { Client, Carrito } = require("../../db");
const { sendWelcomeEmail } = require("../../../configNodemailer/nodemailer");

const postClient = async (req, res) => {
  console.log("Datos recibidos:", req.body);
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
    backup,
    blocks,
    role,
    myTrainers,
  } = req.body;

  try {
    const existingClient = await Client.findOne({
      where: { email: email },
    });

    if (existingClient) {
      return res.status(400).json({ error: "El usuario ya esta registrado" });
    } else {
      const createClient = await Client.create({
        forename,
        surname,
        image,
        email,
        phoneN,
        nationality,
        dateOfBirth,
        dni,
        gender,
        backup,
        blocks,
        role,
        myTrainers,
      });

      // Envío el correo de bienvenida
      await sendWelcomeEmail(email, forename, surname);

      res.status(201).json(createClient);
    }
  } catch (error) {
    console.error("Error en la creación del cliente:", error);
    res.status(400).json({ error: error.message });
  }
};

module.exports = postClient;
