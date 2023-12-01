import giftLoading from '../../images/car-loading-gif-34.gif'
import styles from './loading.module.css'

export default function LoadingComponent() {
  
    return (
      <div  className={styles.containerLoading}>
        <div className={styles.center}>
        <img src={giftLoading} alt="loading"></img>
        </div>
      </div>
    );
  }

