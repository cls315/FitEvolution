const getExercise = require("../../controllers/Exercises/getExercise");

const getAllExerciseHndls = async (req, res) => {
  try {
    const exercise = await getExercise();

    return res.status(200).json(exercise);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = getAllExerciseHndls;
