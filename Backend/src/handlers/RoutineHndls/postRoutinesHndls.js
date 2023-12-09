const postRoutines = require("../../controllers/Routine/postRotuines");

const postRoutinesHndls = async (req, res) => {
  try {
    const { exerc, enfoque, precio } = req.body;
    console.log("Contenido de req.body:", req.body);

    const newRoutine = await postRoutines(exerc, enfoque, precio);

    res.status(200).json(newRoutine);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = postRoutinesHndls;
