const { sendWelcomeEmail } = require("../../../configNodemailer/nodemailer");

const welcomeEmailController = async (email, forename, surname) => {
  try {
    await sendWelcomeEmail(email, forename, surname);
    return { success: true, message: "Correo enviado exitosamente" };
  } catch (error) {
    console.error("Error al enviar el correo:", error.message);
    return { success: false, error: "Error al enviar el correo" };
  }
};

module.exports = { welcomeEmailController };
