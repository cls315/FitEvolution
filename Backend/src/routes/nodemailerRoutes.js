const { Router } = require("express");
//const { sendWelcomeEmail }= require("../../configNodemailer/nodemailer")
const welcomeEmailHndls = require("../handlers/NodemailerHndls/nodemailerHndls");
const nodemailer = Router();

nodemailer.post("/", welcomeEmailHndls);

//* codigo todo junto para futuras modificaciones:
// nodemailer.post("/", async (req,res)=>{
//     try {
//         const {email, forename,surname } = req.body;

//         await sendWelcomeEmail(email, forename, surname);

//         res.status(200).json({ message: "Correo enviado exitosamente" });
//       } catch (error) {
//         console.error("Error al enviar el correo:", error.message);
//         res.status(500).json({ error: "Error al enviar el correo" });
//       }
//     });

module.exports = nodemailer;
