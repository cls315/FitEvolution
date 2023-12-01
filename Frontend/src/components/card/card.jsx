import styles from "../card/card.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {Link} from "react-router-dom"

import sinimagen from "../../images/sinimagen.png"
import StarRating from "../starRating/starRating"

const Card = ({profe}) => {

  return (
    <div className={styles.cardconteiner} key={profe.id}>
      <img src={profe.image || sinimagen} className={styles.perfil}/>
      <h2 className={styles.name}>{profe.forename} {profe.surname}</h2>
      <h3 className={styles.enfoque}>{profe.focusTr}</h3>
      <StarRating rating={profe.score}/>
      <Link to={`/teacher/${profe.id}`}>
      <button className={styles.btnselect}>Seleccionar Entrenador</button>
      </Link>
    </div>
  );
};

export default Card;
