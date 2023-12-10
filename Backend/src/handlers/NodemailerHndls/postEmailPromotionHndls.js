const postEmailPromotion = require("../../controllers/Nodemailer/postEmailPromotion");

const postEmailPromoHndls = async (req, res) => {
  try {
    await postEmailPromotion();

    res.status(200).json({ message: "Correo de promoción enviado con éxito" });
  } catch (error) {
    console.error(
      `Error en el handler de postEmailPromotion: ${error.message}`
    );
    res.status(500).json({ message: "Error interno del servidor" });
  }
};
module.exports = postEmailPromoHndls; 