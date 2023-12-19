
const {emailPromotion} = require("../../../configNodemailer/emailPromotion")
const getEmailPromotion= require("../../controllers/Nodemailer/getEmailPromotion")

const postEmailPromotion= async(emailsFilter,imgLink,message)=>{
 try {

    for(const {email, forename,surname,}of emailsFilter){
      
        await emailPromotion(email,forename,surname,imgLink,message);
    }




 } catch (error) {
    throw new Error(`Error de solicitud: ${error.message}`)
 }

}


module.exports = postEmailPromotion