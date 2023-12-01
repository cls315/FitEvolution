import {useEffect} from 'react'

const Pagination = ({total, current,set}) => {
   
  return (
    <div>
      
      <p>Pagina {current+1} de {total}</p>
     
      </div>
  )
}
export default Pagination