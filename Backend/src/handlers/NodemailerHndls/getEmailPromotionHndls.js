const getEmailPromotion = require ("../../controllers/Nodemailer/getEmailPromotion.js")



const getAllEmailHndls=async (req,res) =>{

    try {
        
     const email= await getEmailPromotion();
     return res.status(200).json(email)   



    } catch (error) {
        res.status(400).json({message: error.message})
    }
};


module.exports= getAllEmailHndls;