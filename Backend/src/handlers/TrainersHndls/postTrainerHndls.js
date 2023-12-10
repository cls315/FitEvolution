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
    puntuaciones,
    score,
    subscribers,
  } = req.body;
  try {
   // if (forename === "" || email === "" || image === "" || description === "")
     // throw Error("Faltan rellenar campos");

     console.log()

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
      puntuaciones,
      score,
      subscribers
    );

    res.status(200).json(newTrainer);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
};

module.exports = postTrainerHdnls;
