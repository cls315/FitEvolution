const nodemailer = require("nodemailer")


const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "fitevolution77@gmail.com",
      pass: "aekf psrk itpi bcrx",
    },
  });

  async function emailPromotion(email, forename, surname) {
    try {
      await transporter.sendMail({
        from: "fitevolution77@gmail.com",
        to: `${email}`,
        subject: "¡Nueva promocion en FitEvolution !",
        html:`
         <div>

        <h2>Hola ${forename} ${surname}</h2>
        <p>¡Gracias por ser parte de nuestra comunidad en FitEvolution!</p>
        <p>¡No queremos que te pierdas nuestra última promoción exclusiva!</p>
        <a href="[Aqui iria un enlace del supuesto descuento]">
        <img src="[URL de la imagen del flyer]" alt="Promoción" />
        <p>¡Esperamos que disfrutes de esta oferta especial!</p>
        <p>Atentamente, El Equipo de FitEvolution</p>
        </a>


        </div>
        `,
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
  

  
