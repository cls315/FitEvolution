const { Client } = require("../../db");


const putClients = async (req, res) => {
  try {
    // const clientDb = await Client.findByPk(id);
    const { id } = req.params;
    const { banned } = req.body;
    console.log(banned)
    
  const clientDb = await Client.findByPk(id)
  console.log(id)
  
    if (!clientDb) {
      throw new Error("cliente no encontrado");
    }

    // comprobacion si se setea un valor distinto de on o off
    // if(banned.toLowerCase() !== "On" && banned.toLowerCase() !== "Off"){
    //   throw new Error("El estado 'banned' debe ser 'On' o 'Off'");
    // }

       // Comprobación si se intenta poner el mismo estado, lanzar un error
    // if (banned.toLowerCase() === clientDb.banned.toLowerCase()) {
    //   throw new Error(`El cliente ya está en estado '${banned}'`);
    // }
    
    // actualizo el estado del cliente
    const clientupDate= await Client.update({banned},{where:{id:id}})
  clientDb.banned = banned.toLowerCase() ;

  
    return await clientDb.save();

  } catch (error) {
   
    throw new Error(`Error en la solicitud : ${error.message}`);
  }
};

module.exports = putClients;
