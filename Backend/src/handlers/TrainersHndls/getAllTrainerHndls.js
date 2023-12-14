const allTrainer = require("../../controllers/Trainers/getAllTrainer");

const allTrainerHndls = async (req, res) => {
  try {
    const trainer = await allTrainer();

    return res.status(200).json(trainer);
  } catch (error) {
   
    res.status(500).json({ error: error.message });
  }
};


module.exports = allTrainerHndls;
