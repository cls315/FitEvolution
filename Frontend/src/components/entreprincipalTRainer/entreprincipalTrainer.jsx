import style from "../entreprincipalTRainer/entreprincipalTrainer.module.css"
import { useEffect, useState } from "react";
import {  useDispatch, useSelector } from "react-redux";
import { getEntreno, search } from "../redux/actions/actions";
import { Button } from "@mui/material";


export default function EntrePrincipalTrainer (){
  const[input, setInput] = useState("")
  
  const entreno= useSelector((state)=>state.rutinas)
console.log(entreno)
  
const dispatch = useDispatch()

useEffect(()=>{
 dispatch(getEntreno())
},[])
const handlerChange=(event)=>{

  event.preventDefault()
  const value= event.target.value
  if(value.length==0){
   dispatch(getEntreno())
  }
 
 setInput(value)

}
  const busqueda=(event)=>{
   
   event.preventDefault()
   dispatch(search(input))
   


  }

    return(<div >
        <div className='d-flex flex-column text-right'>
          <h3>Bienvenido la seccion de Entrenamientos</h3>
          <div>
          <input
          value= {input}
          type="text"
          className={style.input} 
          onChange={handlerChange}
          />
          <br></br>
          <Button variant="contained" color="primary" type="button" onClick={busqueda}>Search</Button>
          <br />
          <div className={style.estilo}>
            {entreno?.map((item,key)=>
            
              <div className={style.card}>
              <h3>Rutinas</h3>
              <p>Enfoque: {item.enfoque}</p>
              <p>Ejercicios: {item?.exerc?.map((nombre)=>
                <spam>{nombre.name}, </spam>
               )
               }
              </p>
              <p>Tiempo aproximado de duración: {item.totalDuration}{" "}minutos</p>

            </div>
            )}
            </div>
          </div>

        </div>
      </div>
    )
}