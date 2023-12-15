const {Client}= require("../../db.js")
const {Trainer}= require("../../db.js")

const getAllEmails= async(req,res)=>{
   try {
       
       const clients= await Client.findAll({
           attributes:['email', 'forename', 'surname','role']
       });

       const trainers= await Trainer.findAll({
        attributes:['email', 'forename', 'surname','role']
    });

       //const emails= clients.map(client=> client.email)
       const emailsCli= clients.map((client) =>({
        email: client.email,
        forename: client.forename,
        surname: client.surname,
        role:client.role
       }))

       const emailsTri= trainers.map((client) =>({
        email: client.email,
        forename: client.forename,
        surname: client.surname,
        role:client.role
       }))

       const emails=[...emailsCli,...emailsTri]
       return emails;
   } catch (error) {
    throw  new Error(`error al obtener emails de clientes: ${error.message}`)
   }



}
module.exports = getAllEmails