import style from './CreateExercise.module.css'
import { useState, useEffect } from 'react'
import UploadWidCloud from '../Cloudinary/UploadWidCloud'

const CreateExercise = () => {
  const [muscleInput, setMuscleInput] = useState("");

  const [exer,setExer] = useState({
      name:"",
      image:"",
      description:"",
      category:"",
      muscle_trained:[],
      estimatedDuration:0
  })
  
  //*manejo del envio al componente de cloudinary, y posterior ingreso al form
  const uploadImage = (img)=>{
    setExer(formPrevio => ({
        ...formPrevio,
        image:img
      }));
    }

    //*manejo de agregar los musculos en el array de muscle_trained
    const handleDeleteMuscle = (muscle) => {
      setExer(state => ({
         ...state,
         muscle_trained: state.muscle_trained.filter(m => m !== muscle)
      }));
     };

     const submitHandler = (e) => {
      e.preventDefault();
      setExer(state => ({
        ...state,
        muscle_trained: [...state.muscle_trained, muscleInput]
      }));
      setMuscleInput("");
   };
    return (
        <>
        <form onSubmit={submitHandler}>
        <div className={style.labelform1}>
                        <label className={style.label1}> Nombre del ejercicio</label>
                        <input 
                        placeholder=" Nombre" 
                        className={style.inputNom} 
                        name="name" 
                        onChange={changeHandler} />
                        {errors.name && <p className={style.p1}>{errors.name}</p>}
                    </div>
                    <div className={style.labelform1}>
                        <label className={style.label1}> Imagen, Gif, Video del ejercicio</label>
                     <UploadWidCloud uploadImage={uploadImage}/>
                      
                    </div>
                    <div className={style.labelDescription}>
                        <label className={style.label1}> Descripción</label>
                        <textarea 
                        placeholder=" Agrega una descripcion del ejercicio" 
                        type='string' 
                        className={style.inputDescription} 
                        name="description" 
                        onChange={handleChange} />
                        {errors.description && <p className={style.p1}>{errors.description}</p>}
                    </div>
                    <div className={style.labelform1}>
                            <label className={style.label1}> Categoria de ejercicio</label>
                          <select 
                          placeholder="Categoria" 
                          className={style.inputNom} 
                          name="category" 
                          onChange={handleChange}>
                            <option value="">Selecciona</option>
                        <option value="TS">Tren Superior</option>
                        <option value="TI">Tren Inferior</option>
                        <option value="CORE">Zona Media</option>
                            </select>
                        {errors.category && <p className={style.p1}>{errors.category}</p>}
                        </div>
                        <div>
                        <ul>
                           {exer.muscle_trained.map((muscle, index) => (
                             <li key={index}>
                               {muscle}
                               <button onClick={() => handleDeleteMuscle(muscle)}>x</button>
                             </li>
                           ))}
                         </ul>
                        </div>
                        <div className={style.labelform1}>
                        <label className={style.label1}> Duración Estimada </label>
                        <input 
                        placeholder=" Duracion en segundos" 
                        className={style.inputNom} 
                        name="estimatedDuration" 
                        onChange={changeHandler} />
                        {errors.duration && <p className={style.p1}>{errors.duration}</p>}
                    </div>
        </form>
        </>  
)
}

export default CreateExercise