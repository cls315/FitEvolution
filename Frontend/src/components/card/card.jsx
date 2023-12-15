import styles from "../card/card.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {Link} from "react-router-dom"

import sinimagen from "../../images/sinimagen.png"
import StarRating from "../starRating/starRating"
import { Button } from "@mui/material";

const Card = ({profe}) => {

  return (
    <div className={styles.cardconteiner} key={profe.id}>
      <img src={profe.image || sinimagen} className={styles.perfil}/>
      <h2 className={styles.name}>{profe.forename} {profe.surname}</h2>
      <h3 className={styles.enfoque}>{profe.focusTr}</h3>
      <StarRating rating={profe.score}/>
      <Link to={`/teacher/${profe.id}`}>
      <Button variant="contained" size="small" >Seleccionar Entrenador</Button>
      </Link>
    </div>
  );
};

export default Card;
