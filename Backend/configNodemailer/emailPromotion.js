const nodemailer = require("nodemailer")
const path = require('path');

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "fitevolution77@gmail.com",
      pass: "aekf psrk itpi bcrx",
    },
  });

  async function emailPromotion(email,forename,surname,imgLink,message) {
    try {
      const imagePath = imgLink;

      await transporter.sendMail({
        from: "fitevolution77@gmail.com",
        to: `${email}`,
        subject: "¡Nueva promocion en FitEvolution !",
        html:

        `<div>
        <h2>Hola ${forename} ${surname}</h2>
        <p>¡Gracias por ser parte de nuestra comunidad en FitEvolution!</p>
        <p>¡Tenemos un mensaje para ti!</p>
        <p>${message}</p>
        <p>Atentamente, El Equipo de FitEvolution</p>
        </a>
        </div>
        `
        ,
        attachments:[
          {
            filename:'imagenPromo.png',
            path: imagePath,
            cid: 'imagen_promocion'

          }
        ]
      });
  
      console.log("Correo de promocion enviado con éxito.");
    } catch (error) {
      console.error("Error al enviar el correo de promocion:", error);
    }
  }
  
  transporter
    .verify()
    //.then(() => console.log("gmail enviado con exito!"))
    .catch((error) => console.error("Error al verificar el transporter:", error));
  
  module.exports = { transporter, emailPromotion };
  

  
