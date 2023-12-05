import carritoimg from "../SVG/carrito.svg";
import styles from "./carrito.module.css";
import { useState } from "react";

import { clearCart, deleteCarrito } from "../redux/actions/actions";
import { useSelector, useDispatch } from "react-redux";
import Pagos from "../Pagos/Pagos";


const Carrito = () => {
  const dispatch = useDispatch();

  const [verpagos, setVerPagos] = useState(false);

  const [show, setShow] = useState(false);


  const carrito = useSelector((state) => state.carrito);

  let total = 0;

  for (let i = 0; i < carrito.length; i++) {
    total += carrito[i].precio;
  }

  const seteo = () => {
    setShow(!show);
  };

  const pagos = ()=>{
    setVerPagos(!verpagos)
  }

  const vaciarCarrito = ()=>{
    dispatch(clearCart())
  }

  const borarCarrito = (option)=>{
    dispatch(deleteCarrito(option))
  }

  return (
    <div
      className={styles.carritoConteiner}
     >
      <img  onClick={()=>{show===true?setShow(false):setShow(true)}}
     src={carritoimg} className={styles.carrito} />
      <span className={styles.count}>{carrito.length}</span>
      {show ? (
        <div className={styles.menu}>
          {carrito.length > 0 ? (
            <div>
              <div className={styles.header}>
                <h3>Tipo de entrenamiento</h3>
                <h3>Dias</h3>
                <h4>Precio</h4>
              </div>
              {carrito.map((pack, index) => (
                <div className={styles.packinfo} key={index}>
                  <h2>{pack.enfoque}</h2>
                  <h3>{pack.totalDuration}</h3>
                  <h4>${pack.precio}</h4>
                  <h5 onClick={()=>{borarCarrito(pack.id)}}>X</h5>
                </div>
              ))}
              <div className={styles.total}>
                <h5>Total</h5>
                <h6>${total}</h6>
              </div>

              <button onClick={()=>{vaciarCarrito()}} className={styles.btnvaciar}>Vaciar Carrito</button>
        <button onClick={()=>{pagos()}} className={styles.btnvaciar}>Pagar</button>
        {verpagos ?
         (
          <Pagos total={total}/> 
         )
         : ""} 
            </div>
          ) : (
            <div className={styles.packinfo}>
              <h2>El carrito esta vacio</h2>
            </div>
          )}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Carrito;
