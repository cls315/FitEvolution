import "./App.css";
import "bootswatch/dist/lux/bootstrap.min.css";
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { URLSERVER } from "../../../configURL";
const stripePromise = loadStripe(
  "pk_test_51OFhTFEPwEDVOkZIc5g7SBFDDufIoqCMOUPZk9tye7BBDjxK1wO76eUPLurnxieWliXSClaW2eq8DJmbBuoP9rY500PekWUykm"
);

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

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
          `${URLSERVER}/api/checkout`,
          {
            id,
            amount: 10000,
          }
        );
        console.log(data);

        elements.getElement(CardElement).clear();
      } catch (error) {
        console.log(error);
      }

      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card card-body">
      <h3 className="text-center my-2">Price: 100$</h3>

      <div className="form-group">
        <CardElement className="form-control" />
      </div>

      <button className="btn btn-success">
        {loading ? (
          <div className="spinner-border text-light" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        ) : (
          "Buy"
        )}
      </button>
    </form>
  );
};

function App() {
  return (
    <Elements stripe={stripePromise}>
      <div className="container p-4">
        <div className="row">
          <div className="col-md-4 offset-md-4">
            <CheckoutForm />
          </div>
        </div>
      </div>
    </Elements>
  );
}

export default App;
