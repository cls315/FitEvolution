const {Client}= require("../../db.js")

const getAllEmails= async(req,res)=>{
   try {
       
       const clients= await Client.findAll({
           attributes:['email']
       });

       const emails= clients.map(client=> client.email)
       return emails;
   } catch (error) {
    throw  new Error(`error al obtener emails de clientes: ${error.message}`)
   }



}
module.exports = getAllEmails