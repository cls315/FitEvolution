import style from './CreateExercise.module.css'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import UploadWidCloud from '../Cloudinary/UploadWidCloud'
import validate from './validate'
import MuscleInput from './MuscleInput'
import axios from "axios";
import Swal from 'sweetalert2'
import { URLSERVER } from '../../../configURL';
import { Container, Button } from '@mui/material';



const CreateExercise = () => {
  const navigate = useNavigate();
  const [muscleInput, setMuscleInput] = useState("");

  const [exer,setExer] = useState({
      name:"",
      image:"",
      description:"",
      category:"",
      muscle_trained:[],
      estimatedDuration:0
  })
  
  const [errors,setErrors] = useState({})
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
     const handleAddMuscle = (muscle) => {
      setExer((state) => ({
        ...state,
        muscle_trained: [...state.muscle_trained, muscle],
      }));
    };

     const changeHandler = (e) => {
      const property = e.target.name
      const value = e.target.value;

      setExer((previo) => {
          const newS = {
              ...previo,
              [property]: value
          };
          setErrors(validate(newS));
          return newS;
      });

  };

     const submitHandler = async (e) => {
      e.preventDefault();
      setExer(state => ({
        ...state,
        muscle_trained: [...state.muscle_trained, muscleInput]
      }));
      setMuscleInput("");
      const checkErr = validate(exer)
        if (Object.values(exer).some(inp => inp==="")) {  
            Swal.fire('DEBÉS COMPLETAR TODOS LOS CAMPOS!');
            return;
        }
        if (Object.values(checkErr).some(error => error)) {
            Swal.fire('LA CRECION DE EJERCICIOS CONTIENE ERRORES!');
            return;
        }
        const result = await Swal.fire({
          title: `¿Seguro que quiere crear el Ejercicio ${exer.name} ${""}?`,
          icon: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Sí, crearlo'
      });
      if(result.isConfirmed){
        try {
          Swal.fire(`Ejercicio ${exer.name} registrado con éxito`, '', 'success')
          axios.post(`${URLSERVER}/fitevolution/exercises}`,exer)
          navigate('/adm')
        } catch (error) {
          Swal.fire({
            icon: 'error',
            title: 'Error al enviar el ejercicio',
            text: `Error: ${error.message}`,
        });
        }
      }
   };
    return (
      <Container>
        <div className={style.container}>
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
                        onChange={changeHandler} />
                        {errors.description && <p className={style.p1}>{errors.description}</p>}
                    </div>
                    <div className={style.labelform1}>
                            <label className={style.label1}> Categoria de ejercicio</label>
                          <select 
                          placeholder="Categoria" 
                          className={style.inputNom} 
                          name="category" 
                          onChange={changeHandler}>
                            <option value="">Selecciona</option>
                        <option value="TS">Tren Superior</option>
                        <option value="TI">Tren Inferior</option>
                        <option value="CORE">Zona Media</option>
                            </select>
                        {errors.category && <p className={style.p1}>{errors.category}</p>}
                        </div>
                        <div>
                        <MuscleInput onAdd={handleAddMuscle}/>
                        
                           {exer.muscle_trained.map((muscle, index) => (
                             <span className={style.muscle} key={index}>
                               {muscle}
                               <button className={style.buttonX} onClick={() => handleDeleteMuscle(muscle)}>x</button>
                             </span>
                           ))}
                         
                        </div>
                        <div className={style.labelform1}>
                        <label className={style.label1}> Duración Estimada </label>
                        <input 
                        type="number"
                        placeholder=" Duracion en segundos" 
                        className={style.inputNom} 
                        name="estimatedDuration" 
                        onChange={changeHandler} />
                        {errors.duration && <p className={style.p1}>{errors.duration}</p>}
                    </div>
                    <div>
                      <Button type="submit" className={style.btCreateAccount} > Crear Ejercicio</Button>
                    </div>
        </form>
        </div> 
        </Container> 
)
}

export default CreateExercise