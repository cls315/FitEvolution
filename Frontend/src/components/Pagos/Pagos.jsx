import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
 import {URLSERVER} from "../../../configURL"
import axios from "axios";

const stripePromise = loadStripe(
  "pk_test_51OJh59EozKFdzJuVuFTShVCNgGjmaTewLi1dPffJwyt5UkYcxkHsuwZEyIGDLf5nMBzotOwCtymyc2AISKTcHCL3004qhvdKiA"
);



const CheckoutForm = ({total}) => {

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
        console.log(paymentMethod)
        const { id } = paymentMethod;

        const { data } = await axios.post(
          `${URLSERVER}/fitevolution/api/checkout`,
          {
            id,

            amount: {total},

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
    <form onClick={handleSubmit} className="card card-body p-0 w-100">
      <h3 className="text-center my-2">Price: 100$</h3>

      <div className="form-group">
        <CardElement className="form-control" />
      </div>

      <button type="submit" className="btn btn-success">Buy</button>
    </form>
  );
};

function Pagos(props) {
  const{total}=props
  return (
    <Elements stripe={stripePromise}>
      <div className="container p-4 ">
        <div className="row w-100 ">
          <div className=" flex justify-center p-8">
            <CheckoutForm  total={total}/>
          </div>
        </div>
      </div>
    </Elements>
  );
}

export default Pagos;
