import { Link } from "react-router-dom";

import Carrito from "../../components/carrito/carrito";
import imageLogo from "../../images/imageLogo.jpg";
import styles from "./navdetail.module.css";
import { Button } from "@mui/material";

const Navdetail = ({setLoading}) => {
  return (
    <div className={styles.nav}>
      <img src={imageLogo} className={styles.logo} />
      <div className={styles.conteiner}>
        <Link to="/homeusuario">
          <Button variant="outlined">Volver a seleccionar</Button>
        </Link>
        <Carrito setLoading={setLoading}/>
      </div>
    </div>
  );
};

export default Navdetail;
