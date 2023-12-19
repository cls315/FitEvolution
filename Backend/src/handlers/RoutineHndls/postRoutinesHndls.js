const postRoutines = require("../../controllers/Routine/postRotuines");

const postRoutinesHndls = async (req, res) => {
  try {
    const {  exerc, enfoque, totalDuration, image} = req.body;
    console.log("Contenido de req.body:", req.body);
    console.log("Valor de la imagen:", image);
    const newRoutine = await postRoutines( exerc, enfoque, totalDuration, image);

    res.status(200).json(newRoutine);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = postRoutinesHndls;
