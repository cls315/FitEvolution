const { Trainer } = require("../../db");
const { sendWelcomeEmail } = require("../../../configNodemailer/nodemailer");

const postTrainer = async (
  forename,
  surname,
  image,
  email,
  phoneN,
  nationality,
  dateOfBirth,
  dni,
  gender,
  focusTr,
  description,
  puntuaciones,
  // score,
  subscribers
) => {
  const existingTrainer = await Trainer.findOne({
    where: { email: email },
  });

  if (existingTrainer) {
    throw Error("El usuario ya esta registrado");
  } else {
    const newTrainer = await Trainer.create({
      forename,
      surname,
      image,
      email,
      phoneN,
      nationality,
      dateOfBirth,
      dni,
      gender,
      focusTr,
      description,
      puntuaciones,
      // score,
      subscribers,
    });

    // Envío el correo de bienvenida
    await sendWelcomeEmail(email, forename, surname);

    return newTrainer;
  }
};

module.exports = postTrainer;
