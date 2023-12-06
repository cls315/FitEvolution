import { Link } from "react-router-dom";

import Carrito from "../../components/carrito/carrito";
import imageLogo from "../../images/imageLogo.jpg";
import styles from "./navdetail.module.css";

const Navdetail = ({setLoading}) => {
  return (
    <div className={styles.nav}>
      <img src={imageLogo} className={styles.logo} />
      <div className={styles.conteiner}>
        <Link to="/homeusuario">
          <button className={styles.btn}>Volver a seleccionar</button>
        </Link>
        <Carrito setLoading={setLoading}/>
      </div>
    </div>
  );
};

export default Navdetail;
