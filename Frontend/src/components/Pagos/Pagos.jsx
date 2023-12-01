import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
// import {URLSERVER} from "../../../configURL"
import axios from "axios";

const stripePromise = loadStripe(
  "pk_test_51OFhTFEPwEDVOkZIc5g7SBFDDufIoqCMOUPZk9tye7BBDjxK1wO76eUPLurnxieWliXSClaW2eq8DJmbBuoP9rY500PekWUykm"
);

<<<<<<< HEAD
console.log(stripePromise);

const CheckoutForm = () => {
=======
const CheckoutForm = ({total}) => {
>>>>>>> 8d7419f56b1776867a6295c29da3073a6a18c06b
  const stripe = useStripe();
  const elements = useElements();
  //const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });
    if (!error) {
      try {
        const { id } = paymentMethod;

        const { data } = await axios.post(
          "https://pf-fit-evolution.vercel.app/api/checkout",
          {
            id,
<<<<<<< HEAD
=======
            amount: {total},
>>>>>>> 8d7419f56b1776867a6295c29da3073a6a18c06b
          }
        );
        console.log(data);

        elements.getElement(CardElement).clear();
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card card-body p-0 w-100">
      <h3 className="text-center my-2">Price: 100$</h3>

      <div className="form-group">
        <CardElement className="form-control" />
      </div>

      <button className="btn btn-success">Buy</button>
    </form>
  );
};

function Pagos() {
  return (
    <Elements stripe={stripePromise}>
      <div className="container p-4 ">
        <div className="row w-100 ">
          <div className=" flex justify-center p-8">
            <CheckoutForm />
          </div>
        </div>
      </div>
    </Elements>
  );
}

export default Pagos;
