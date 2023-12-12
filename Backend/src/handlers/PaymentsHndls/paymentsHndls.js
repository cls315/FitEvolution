const Stripe = require("stripe");
require("dotenv").config();
const { SECRET_KEY_STRIPE } = process.env;
const backupPayment = require("../../controllers/Stripe/backupPayment");
const { Trainer } = require("../../db");
const { Client } = require("../../db");
const paymentsHndls = async (req, res) => {
  const { id, amount, idTrainer, userEmail } = req.body;

  const stripe = new Stripe(`${SECRET_KEY_STRIPE}`);
  try {
    const payment = await stripe.paymentIntents.create({
      amount: amount.total,
      currency: "USD",
      description: "plan de entrenamiento",
      payment_method: id,
      confirm: true,
      receipt_email: userEmail.email,
      return_url: "https://www.example.com",
    });

    const amountpayment = payment.amount;

    const {
      receipt_email,
      currency,
      description,
      payment_method_types,
      payment_method,
    } = payment;

    // Guardar recibo de pago en la propiedad backups del modelo cliente
    const client = await Client.findOne({where: {email: userEmail.email }});
    if (client) {
      client.dataValues.backups.push({
        receipt_email,
        amountpayment,
        currency,
        description,
        payment_method_types,
        payment_method,
      });
      await client.save();
    }

    // Guardar objeto trainer en la propiedad mytrainers del modelo cliente
    const trainer = await Trainer.findByPk(idTrainer.idTrainer);
    if (trainer) {
      client.dataValues.myTrainers.push({
        trainerId: trainer.id,
        trainerName: trainer.forename + " " + trainer.surname,
        focusTr: trainer.focusTr,
        defaultRoutine: trainer.rutinaPredeterminada,
        score: trainer.score,
        // Agrega otras propiedades del objeto trainer que quieras incluir
      });

      // Agregar todas las propiedades del cliente al array subscribers del entrenador
      trainer.subscribers.push({
        ...client // Agrega todas las propiedades del cliente
      });

      await client.save();
      await trainer.save();
    }

    // Llama a la función backupPayment para manejar la lógica adicional
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
    res.status(404).json({ err: "Ocurrió un error en el pago" });
  }
};

module.exports = paymentsHndls;
