const nodemailer = require("nodemailer");

//creo el transporter para utiulizar en la ruta para enviar gmail
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "fitevolution77@gmail.com",
    pass: "aekf psrk itpi bcrx",
  },
});

async function sendWelcomeEmail(email, forename, surname) {
  try {
    await transporter.sendMail({
      from: "fitevolution77@gmail.com",
      to: `${email}`,
      subject: "¡Bienvenido a FitEvolution!",
      text: `Hola ${forename} ${surname},\n\n¡Gracias por registrarte en FitEvolution! ¡Bienvenido!\n\nEsperamos que disfrutes de nuestra plataforma.\n\nAtentamente,\nEl equipo de FitEvolution";`,
    });

    console.log("Correo de bienvenida enviado con éxito.");
  } catch (error) {
    console.error("Error al enviar el correo de bienvenida:", error);
  }
}

transporter
  .verify()
  //.then(() => console.log("gmail enviado con exito!"))
  .catch((error) => console.error("Error al verificar el transporter:", error));

module.exports = { transporter, sendWelcomeEmail };
