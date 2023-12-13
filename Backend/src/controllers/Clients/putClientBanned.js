const { Client } = require("../../db");


const putClients = async (req, res) => {
  try {

        const { id } = req.params;
        const { banned } = req.body;
        console.log(banned)
        
      const clientDb = await Client.findByPk(id)
      console.log(id)
      
        if (!clientDb) {
          throw new Error("cliente no encontrado");
        }
    
        


        const clientupDate= await Client.update({banned},{where:{id:id}})
        clientDb.banned = banned.toLowerCase() ;
        return await clientDb.save();
  

    
      } catch (error) {
   
            throw new Error(`Error en la solicitud : ${error.message}`);
          }
        
        
};

module.exports = putClients;
