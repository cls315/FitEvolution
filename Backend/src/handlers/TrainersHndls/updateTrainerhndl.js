const updateTr = require('../../controllers/Trainers/updateTrainercont')
const updateTrainer = async (req, res) => {
  const { id } = req.params;
  const {role} = req.body; // Los datos actualizados se encuentran en el cuerpo de la solicitud

  try {
    // Lógica para actualizar el entrenador en la base de datos
    // Ejemplo:
   const trainer = await updateTr(id,role)
        res.status(200).json(trainer);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error.message });

  }
};

module.exports = { updateTrainer };