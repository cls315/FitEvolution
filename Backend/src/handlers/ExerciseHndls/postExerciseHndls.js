const postExercise = require("../../controllers/Exercises/postExercise");

const postExerciseHndls = async (req, res) => {
  try {
    const {
      name,
      image,
      description,
      category,
      muscle_trained,
      estimatedDuration,
    } = req.body;
    console.log("Contenido de req.body:", req.body);

    const newExercise = await postExercise(
      name,
      image,
      description,
      category,
      muscle_trained,
      estimatedDuration
    );

    res.status(200).json(newExercise);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = postExerciseHndls;
