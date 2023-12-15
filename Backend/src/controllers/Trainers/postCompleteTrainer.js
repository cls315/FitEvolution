// postCompleteTrainer.js
const { Trainer } = require("../../db");
const { Routine } = require("../../db");

const postCompleteTrainer = async (
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
  description,
  status
) => {
  try {
    
    const existingTrainer = await Trainer.findByPk(trainerId);
    console.log(existingTrainer)
    if (!existingTrainer) {
      throw Error("Entrenador no encontrado");
    }

    // Actualizar datos
    existingTrainer.forename = forename || existingTrainer.forename;
    existingTrainer.surname = surname || existingTrainer.surname;
    existingTrainer.image = image || existingTrainer.image;
    existingTrainer.email = email || existingTrainer.email;
    existingTrainer.phoneN = phoneN || existingTrainer.phoneN;
    existingTrainer.nationality = nationality || existingTrainer.nationality;
    existingTrainer.dateOfBirth = dateOfBirth || existingTrainer.dateOfBirth;
    existingTrainer.dni = dni || existingTrainer.dni;
    existingTrainer.gender = gender || existingTrainer.gender;
    existingTrainer.focusTr = focusTr || existingTrainer.focusTr;
    existingTrainer.description = description || existingTrainer.description;
    existingTrainer.status = status || existingTrainer.status;
    // Actualizar rutinaPredeterminada si focusTr coincide
    if (
      [
        "Entrenamiento de fuerza",
        "Entrenamiento deportivo",
        "Entrenamiento Funcional",
        "entrenamiento cardiovascular",
      ].includes(existingTrainer.focusTr)
    ) {
      // Buscar la rutina correspondiente al focusTr

      const rutinaCorrespondiente = Routine.findAll({
          where: { enfoque: existingTrainer.focusTr },
      });
      console.log(rutinaCorrespondiente)

      // Actualizar rutinaPredeterminada
      existingTrainer.rutinaPredeterminada = rutinaCorrespondiente
        ? [rutinaCorrespondiente]
        : [];
    }

    return existingTrainer;
  } catch (error) {
    throw error;
  }
};

module.exports = postCompleteTrainer;
