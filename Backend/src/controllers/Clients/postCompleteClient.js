// postCompleteClient.js
const { Client } = require("../../db");

const postCompleteClient = async (
  clientId,
  forename,
  surname,
  image,
  email,
  phoneN,
  nationality,
  dateOfBirth,
  dni,
  gender
) => {
  try {
    const existingClient = await Client.findByPk(clientId);

    if (!existingClient) {
      throw Error("Cliente no encontrado");
    }

    // Actualizar datos
    existingClient.forename = forename || existingClient.forename;
    existingClient.surname = surname || existingClient.surname;
    existingClient.image = image || existingClient.image;
    existingClient.email = email || existingClient.email;
    existingClient.phoneN = phoneN || existingClient.phoneN;
    existingClient.nationality = nationality || existingClient.nationality;
    existingClient.dateOfBirth = dateOfBirth || existingClient.dateOfBirth;
    existingClient.dni = dni || existingClient.dni;
    existingClient.gender = gender || existingClient.gender;

    // Devolver el cliente actualizado
    return existingClient;
  } catch (error) {
    throw error;
  }
};

module.exports = postCompleteClient;
