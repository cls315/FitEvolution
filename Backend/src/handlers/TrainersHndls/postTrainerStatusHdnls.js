const { Trainer } = require("../../db");

const postTrainerStatus = require("../../controllers/Trainers/postTrainerStatus");

const postTrainerStatusHdnls = async (req, res) => {
  const entrenadorId = req.params.id;
  console.log(entrenadorId);
  const nuevoStatus = req.body.status;
  try {
    // Buscar el entrenador por ID
    const entrenador = await Trainer.findByPk(entrenadorId);

    if (!entrenador) {
      return res
        .status(404)
        .json({ success: false, message: "Entrenador no encontrado" });
    }

    // Ejecutar la función postTrainerPuntuacion y esperar las nuevas puntuaciones
    const statusActualizado = await postTrainerStatus(entrenador, nuevoStatus);

    // Actualizar el array de puntuaciones del entrenador
    entrenador.status = statusActualizado;

    // Guardar los cambios en la base de datos
    await entrenador.save();

    res.json({ success: true, message: "Puntuaciones agregadas exitosamente" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Error interno del servidor" });
  }
};

module.exports = postTrainerStatusHdnls;
