const express = require("express");
const Stripe = require("stripe");
const cors = require("cors");
const { WEB_APP_URL } = process.env;

const app = express();

const stripe = new Stripe(
  "sk_test_51OFhTFEPwEDVOkZID6pJaLBw622WXm02CYoaaVqITgtL5iV1am5OoVrzUL2ycG0W1XTHT9LfHQsigxBu8IJ2yJl400RVo9vsDM"
);

app.use(cors("http://localhost:5173"));
app.use(express.json());

app.post("/api/checkout", async (req, res) => {
  try {
    const { id, amount } = req.body;

    const payment = await stripe.paymentIntents.create({
      amount,
      currency: "USD",
      payment_method: id,
      confirm: true,
      return_url: "http://localhost:3000/success",
    });
    console.log(payment);
    res.send({ message: "Succesfull payment" });
  } catch (error) {
    console.log(error);
    res.json({ message: error.raw.message });
  }
});
