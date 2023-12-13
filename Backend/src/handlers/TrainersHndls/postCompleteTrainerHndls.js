const postCompleteTrainer = require("../../controllers/Trainers/postCompleteTrainer");

const postCompleteTrainerHdnls = async (req, res) => {
  const trainerId = req.params.id;
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
  } = req.body;

  try {
    const updatedTrainer = await postCompleteTrainer(
      trainerId,
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
      description
    );

    // Guardar los cambios
    await existingTrainer.save();
    res.status(200).json(updatedTrainer);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
};

module.exports = postCompleteTrainerHdnls;
