
const {emailPromotion} = require("../../../configNodemailer/emailPromotion")
const getEmailPromotion= require("../../controllers/Nodemailer/getEmailPromotion")

const postEmailPromotion= async( req, res)=>{
 try {

    const emails= await getEmailPromotion();

    for(const {email, forename,surname}of emails){
        await emailPromotion(email,forename,surname);
    }




 } catch (error) {
    throw new Error(`Error de solicitud: ${error.message}`)
 }

}


module.exports = postEmailPromotion