const postEmailPromotion = require("../../controllers/Nodemailer/postEmailPromotion");

const postEmailPromoHndls = async (req, res) => {
  const{emailsFilter,imgLink,message}=req.body;
  
  try {
    await postEmailPromotion(emailsFilter,imgLink,message);

    res.status(200).json({ message: "Correo de promoción enviado con éxito" });
  } catch (error) {
    console.log(error.message)
    console.error(
      `Error en el handler de postEmailPromotion: ${error.message}`
    );
    res.status(500).json({ message: "Error interno del servidor" });
  }
};
module.exports = postEmailPromoHndls; 