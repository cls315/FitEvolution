const {Client}= require("../../db.js")

const getAllEmails= async(req,res)=>{
   try {
       
       const clients= await Client.findAll({
           attributes:['email', 'forename', 'surname']
       });

       //const emails= clients.map(client=> client.email)
       const emails= clients.map((client) =>({
        email: client.email,
        forename: client.forename,
        surname: client.surname
       }))
       return emails;
   } catch (error) {
    throw  new Error(`error al obtener emails de clientes: ${error.message}`)
   }



}
module.exports = getAllEmails