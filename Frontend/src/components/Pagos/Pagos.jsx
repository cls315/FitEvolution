import { useState,useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { URLSERVER } from "../../../configURL"
import axios from "axios";

const stripePromise = loadStripe(
  "pk_test_51OJh59EozKFdzJuVuFTShVCNgGjmaTewLi1dPffJwyt5UkYcxkHsuwZEyIGDLf5nMBzotOwCtymyc2AISKTcHCL3004qhvdKiA"
);



const CheckoutForm = ({ total, setShow, setVerPagos, vaciarCarrito, setLoading }) => {

  const stripe = useStripe();
  const elements = useElements();
  
  const handleSubmit = async (e) => {
    e.preventDefault();

   setLoading(true)
  
    try {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardElement),
      });

      if (!error) {

        console.log(paymentMethod)
        const { id } = paymentMethod;

        const { data } = await axios.post(
          `${URLSERVER}/fitevolution/api/checkout`,
          {
            id,

            amount: { total },

          }
        );
        console.log(data.message);
        setLoading(false)  //detiene la carga del gif
        alert(data.message)
        setShow(false)
        setVerPagos(false)
        vaciarCarrito()
        elements.getElement(CardElement).clear();
      }

    }catch (error) {
      setLoading(false)  //detiene la carga del gif
      alert(error)
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card card-body p-0 w-100">
      <h3 className="text-center my-2">Price: 100$</h3>

      <div className="form-group">
        <CardElement  className="form-control" />
      </div>

      <button type="submit" className="btn btn-success">Buy</button>
    </form>
  );
};

function Pagos(props) {
  const { total, setShow, setVerPagos, vaciarCarrito, setLoading } = props
  return (<>
    <Elements stripe={stripePromise}>
      <div className="container p-4 ">
        <div className="row w-100 ">
          <div className=" flex justify-center p-8">
            <CheckoutForm setLoading={setLoading} vaciarCarrito={vaciarCarrito} setVerPagos={setVerPagos} setShow={setShow} total={total} />
          </div>
        </div>
      </div>
    </Elements>
  </>);
}

export default Pagos;
