const welcomeEmailController = require("../../controllers/Nodemailer/postNodemailer");

const welcomeEmailHndls = async (req, res) => {
  const { email, forename, surname } = req.body;
  const result = await welcomeEmailController(email, forename, surname);
  if (result.success) {
    res.status(200).json({ message: result.message });
  } else {
    res.status(500).json({ error: result.error });
  }
};

module.exports = welcomeEmailHndls;
