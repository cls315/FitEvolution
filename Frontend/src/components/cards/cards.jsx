import { useState,useEffect } from "react";
import Card from "../card/card"
import styles from "./cards.module.css"
import "bootstrap/dist/css/bootstrap.min.css";
import Pagination from "./pagination/Pagination";
const Cards = ({profes, currentPage, setCurrentPage})=>{
  
  const cardsPerPage = 5;
  const cardsPerRow = 5;
  const totalPages = Math.ceil(profes.length / cardsPerPage);

  const handleNext = () => {
    setCurrentPage((prevPage) => (prevPage + 1) % totalPages);
  };

  const handlePrev = () => {
    setCurrentPage((prevPage) => (prevPage - 1 + totalPages) % totalPages);
  };

  useEffect(()=>{
    setCurrentPage(0)
    },[totalPages])


  const startIndex = currentPage * cardsPerPage;
  const endIndex = startIndex + cardsPerPage;


    return(
      <div>

            <div className={styles.midconteiner}>
             <svg onClick={handlePrev} xmlns="http://www.w3.org/2000/svg" style={{ cursor: 'pointer' }} width="40" height="40" fill="#1976D2" class="bi bi-arrow-left-square" viewBox="0 0 16 16">

<path fill-rule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm11.5 5.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"/>
</svg>
              <div className={styles.cardsconteiner}>
                {profes?.slice(startIndex, endIndex).map((profe)=>(<Card profe={profe} key={profe.id} />))}
               </div>
               <svg onClick={handleNext} xmlns="http://www.w3.org/2000/svg" style={{ cursor: 'pointer' }} width="40" height="40" fill="#1976D2" class="bi bi-arrow-right-square" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"/>
</svg>
            </div>
            <div className={styles.paginado}>
              <Pagination total={totalPages} current={currentPage} set={setCurrentPage}/>
            </div>
               
      </div>
    )
}

export default Cards;