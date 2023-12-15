import carritoimg from "../SVG/carrito.svg";
import styles from "./carrito.module.css";
import { useState,useRef,useEffect } from "react";

import { clearCart, deleteCarrito } from "../redux/actions/actions";
import { useSelector, useDispatch } from "react-redux";
import Pagos from "../Pagos/Pagos";
import Swal from 'sweetalert2'
import { Button } from "@mui/material";


const Carrito = ({setLoading}) => {
  const dispatch = useDispatch();
  const formRef=useRef()
  const [verpagos, setVerPagos] = useState(false);

  const [show, setShow] = useState(false);


  const carrito = useSelector((state) => state.carrito);
  const userstatus = useSelector((state) => state.userStatus)

  const handleClickOutsideForm = (event) => {
    // Verificar si el clic no ocurrió dentro del formulario
    if (formRef.current && !formRef.current.contains(event.target)) {
      // Hacer algo aquí, ya que el clic no ocurrió en el formulario
      console.log('El clic no ocurrió en el formulario');
      setShow(false);
      setVerPagos(false)
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutsideForm);

    // Limpiar el listener al desmontar el componente
    return () => {
      document.removeEventListener('click', handleClickOutsideForm);
    };
  }, []);

  let total = 0;

  for (let i = 0; i < carrito.length; i++) {
    total += carrito[i].precio;
  }

  const pagos = ()=>{
    if(userstatus === "invitado"){
      Swal.fire("Para abonar, debes iniciar sesion","","error");
      return;
    } else{
      setVerPagos(!verpagos)
    }
  }

  const vaciarCarrito = ()=>{
    dispatch(clearCart())
    !verpagos? Swal.fire("Carrito vaciado","","info"):"";
  }

  const borarCarrito = (option)=>{
    dispatch(deleteCarrito(option))
  }

  return (
    <div
      className={styles.carritoConteiner}
      ref={formRef}
     >
      <Button className={styles.btnCarrito} onClick={()=>{show===true?setShow(false):setShow(true)}}>
      <img src={carritoimg} className={styles.carrito} />
      <span className={styles.count}>{carrito.length}</span>
      </Button>
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

              <Button variant="contained" color="warning" onClick={()=>{vaciarCarrito()}} className={styles.btnvaciar}>Vaciar Carrito</Button>
        <Button variant="contained"onClick={()=>{pagos()}} className={styles.btnvaciar}>Pagar</Button>
        {verpagos ?
         (
          <Pagos setLoading={setLoading} vaciarCarrito={vaciarCarrito} setVerPagos={setVerPagos} setShow={setShow} total={total}/> 
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
