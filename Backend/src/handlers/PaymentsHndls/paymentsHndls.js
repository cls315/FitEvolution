const Stripe = require("stripe");

require("dotenv").config();
const { SECRET_KEY_STRIPE } = process.env;
const backupPayment = require("../../controllers/Stripe/backupPayment");

const paymentsHndls = async (req, res) => {
  const { id, amount, idTrainer, userEmail } = req.body;

  const stripe = new Stripe(`${SECRET_KEY_STRIPE}`);
  try {
    const payment = await stripe.paymentIntents.create({
      amount: amount.total,
      currency: "USD",
      description: "plan de entrenamineto",
      payment_method: id,
      confirm: true,
      receipt_email: userEmail,
      return_url: "https://www.example.com",
    });

    const amountpayment = payment.amount; //entra en conflicto con req.query

    const {
      receipt_email,
      currency,
      description,
      payment_method_types,
      payment_method,
    } = payment;

    await backupPayment(
      receipt_email,
      amountpayment,
      currency,
      description,
      payment_method_types,
      payment_method
    );

    res.status(200).send({ message: "compra exitosa" });
  } catch (err) {
    console.log(err.message);
    res.status(404).json({ err: "Ocurrió un error el pago" });
  }
};

module.exports = paymentsHndls;
