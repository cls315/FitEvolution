const Stripe = require("stripe")
require("dotenv").config();
const { SECRET_KEY_STRIPE } = process.env;

 const paymentsHndls= async(req, res) => {
 const{id,amount}=req.body

 const stripe= new Stripe(`${SECRET_KEY_STRIPE}`)
  try {
    const payment=await stripe.paymentIntents.create({
        amount:amount.total,
        currency:"USD",
        description:"plan de entrenamineto",
        payment_method:id,
        confirm:true
    })
    console.log(payment)

    res.status(200).send({message: "compra exitosa"})

  } catch (err) {
    console.log(err.message);
    res.status(404).json({ err: "Ocurrió un error" });
  }
}

module.exports = paymentsHndls;