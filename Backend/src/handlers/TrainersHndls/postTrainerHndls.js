const postTrainer = require("../../controllers/Trainers/postTrainer");

const postTrainerHdnls = async (req, res) => {
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
    focusTr,
    description,
    score,
  } = req.body;

  try {
    if (forename === "" || email === "" || image === "" || description === "")
      throw Error("Faltan rellenar campos");

    const newTrainer = await postTrainer(
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
      score
    );

    res.status(200).json(newTrainer);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

module.exports = postTrainerHdnls;
