import { useState,useEffect } from "react";
import {useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { userPerfil } from "../redux/actions/actions";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { URLSERVER } from "../../../configURL"
import axios from "axios";
import Swal from "sweetalert2";

const stripePromise = loadStripe(
  "pk_test_51OJh59EozKFdzJuVuFTShVCNgGjmaTewLi1dPffJwyt5UkYcxkHsuwZEyIGDLf5nMBzotOwCtymyc2AISKTcHCL3004qhvdKiA"
);



const CheckoutForm = ({ total, setShow, setVerPagos, vaciarCarrito, setLoading}) => {

  const navigate = useNavigate()
  const dispatch = useDispatch()

 
  const user = useSelector((state)=> state.usuario)
  const idState = useSelector((state)=> state.idsTrainers)
  const email = user.email
  const stripe = useStripe();
  const elements = useElements();



  const idTrainer = idState.filter(Boolean).filter((valor, índice, self) => self.indexOf(valor) === índice);
  console.log("ID STATE -------->",idState);
  console.log("ID TRAINER -------->",idTrainer);
  
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
        
        const { data } = await axios.post(`
          ${URLSERVER}/fitevolution/api/checkout`,
          {
            id,

            amount: { total },

            idTrainer: idTrainer,

            userEmail: {email}

          }
        );
        setLoading(false)  //detiene la carga del gif
        Swal.fire(data.message, "", "success").then((result) => {
          console.log(result); // Agrega esto para ver la estructura de result en la consola
        
          setShow(false);
          vaciarCarrito();
          setVerPagos(false);
          elements.getElement(CardElement).clear();
          dispatch(userPerfil(email));
          navigate("/detailusuario");
        });
      }
      
    }catch (error) {
      setLoading(false)  //detiene la carga del gif
      Swal.fire(error.message,"","error")
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