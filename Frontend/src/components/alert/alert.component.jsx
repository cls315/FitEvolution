import styles from './alert.module.css'
import { useState } from 'react';
import React from 'react';

export default function Alert(message) {
    const [showAlert, setShowAlert] = useState(true);

    const closeAlert = () => {
        setShowAlert(false)
       
    };

    return showAlert ? (
        <div className={styles.DIvcontenedor }>
            <div className={styles.DivCard}>
                <div className={styles.buttonAlert}>
                    <p>{message}</p>
                    <button onClick={closeAlert}>Aceptar</button>
                </div>
            </div>
        </div>
    ) : null;
}

