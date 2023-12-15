import style from './CreateExercise.module.css'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import UploadWidCloud from '../Cloudinary/UploadWidCloud'
import validate from './validate'
import MuscleInput from './MuscleInput'
import axios from "axios";
import Swal from 'sweetalert2'
import { URLSERVER } from '../../../configURL';
import { Container, Button,MenuItem, FormControl, Input,InputLabel,FormHelperText, Grid, Typography ,TextField,Select, Chip } from '@mui/material';
import { CloudUpload as CloudUploadIcon, Grid3x3 } from '@mui/icons-material'
import { Box } from '@mui/material';


// const CreateExercise = () => {
//   const navigate = useNavigate();
//   const [muscleInput, setMuscleInput] = useState("");

//   const [exer,setExer] = useState({
//       name:"",
//       image:"",
//       description:"",
//       category:"",
//       muscle_trained:[],
//       estimatedDuration:0
//   })
  
//   const [errors,setErrors] = useState({})
//   //*manejo del envio al componente de cloudinary, y posterior ingreso al form
//   const uploadImage = (img)=>{
//     setExer(formPrevio => ({
//         ...formPrevio,
//         image:img
//       }));
//     }

//     //*manejo de agregar los musculos en el array de muscle_trained
//     const handleDeleteMuscle = (muscle) => {
//       setExer(state => ({
//          ...state,
//          muscle_trained: state.muscle_trained.filter(m => m !== muscle)
//       }));
//      };
//      const handleAddMuscle = (muscle) => {
//       setExer((state) => ({
//         ...state,
//         muscle_trained: [...state.muscle_trained, muscle],
//       }));
//     };

//      const changeHandler = (e) => {
//       const property = e.target.name
//       const value = e.target.value;

//       setExer((previo) => {
//           const newS = {
//               ...previo,
//               [property]: value
//           };
//           setErrors(validate(newS));
//           return newS;
//       });

//   };

//      const submitHandler = async (e) => {
//       e.preventDefault();
//       setExer(state => ({
//         ...state,
//         muscle_trained: [...state.muscle_trained, muscleInput]
//       }));
//       setMuscleInput("");
//       const checkErr = validate(exer)
//         if (Object.values(exer).some(inp => inp==="")) {  
//             Swal.fire('DEBÉS COMPLETAR TODOS LOS CAMPOS!');
//             return;
//         }
//         if (Object.values(checkErr).some(error => error)) {
//             Swal.fire('LA CRECION DE EJERCICIOS CONTIENE ERRORES!');
//             return;
//         }
//         const result = await Swal.fire({
//           title: `¿Seguro que quiere crear el Ejercicio ${exer.name} ${""}?`,
//           icon: 'question',
//           showCancelButton: true,
//           confirmButtonColor: '#3085d6',
//           cancelButtonColor: '#d33',
//           confirmButtonText: 'Sí, crearlo'
//       });
//       if(result.isConfirmed){
//         try {
//           Swal.fire(`Ejercicio ${exer.name} registrado con éxito`, '', 'success')
//           axios.post(`${URLSERVER}/fitevolution/exercises}`,exer)
//           navigate('/adm')
//         } catch (error) {
//           Swal.fire({
//             icon: 'error',
//             title: 'Error al enviar el ejercicio',
//             text: `Error: ${error.message}`,
//         });
//         }
//       }
//    };
//     return (
//       <Container className={style.Container}>
//         <br />
        
//                 <FormControl >
//                         <InputLabel htmlFor="name"> Nombre del ejercicio</InputLabel>
//                         <Input id="name" type="name" aria-describedby="my-helper-text" />
//                         <FormHelperText id="my-helper-text" onChange={changeHandler} >Completar campo</FormHelperText>
//                     </FormControl>
//                     <Grid >
//                     <Grid>
//                   < UploadWidCloud uploadImage={uploadImage}/>
//                    </Grid>
//                    </Grid>
//                    <br></br>
//                     <Grid>
//                         <InputLabel htmlFor="descripcion" > Descripción</InputLabel>
//                         <TextField
//                         placeholder=" Agrega una descripcion del ejercicio" 
//                         type='string' 
//                         className={style.inputDescription} 
//                         name="description" 
//                         onChange={changeHandler} />
//                         {errors.description && <p className={style.p1}>{errors.description}</p>}
//                     </Grid>
//                     <br></br>
//                     <Grid>
//                           <InputLabel id= "Categoria">Categoria de ejercicio</InputLabel>
//                           <Select
//                           labelId="Categoria" 
//                           id="categ" 
//                           label="Seleccionar Tipo"
//                           onChange={changeHandler}>
                          
//                             <MenuItem value="">Selecciona</MenuItem>
//                             <MenuItem value="TS">Tren Superior</MenuItem>
//                             <MenuItem value="TI">Tren Inferior</MenuItem>
//                             <MenuItem value="CORE">Zona Media</MenuItem>
//                             </Select>
//                         </Grid>
//                         <br></br>
                            
//                         <Grid>
                          
//                         <MuscleInput onAdd={handleAddMuscle}/>

//                         </Grid>
//                         <br></br>
//                         <Grid>

//                         <FormControl >
//                                 <InputLabel htmlFor="duration">Duracion estimada</InputLabel>
//                                 <Input id="duration" type="muscle" aria-describedby="my-helper-text" />
//                                 <FormHelperText id="my-helper-text">Duracion en segundos</FormHelperText>
//                         </FormControl>
//                     </Grid>
                  
//                       <Button type="submit" className={style.btCreateAccount} > Crear Ejercicio</Button>
//                       </Container>
//     )}




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
  console.log(exer)
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
            Swal.fire('LA CREACION DE EJERCICIO CONTIENE ERRORES!');
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
        console.log(exer)
          await axios.post(`${URLSERVER}/fitevolution/exercises`,exer)
          Swal.fire(`Ejercicio ${exer.name} registrado con éxito`, '', 'success')
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
      <Container className={style.Container}>
        <>
        <form onSubmit={submitHandler}>
        
  <InputLabel htmlFor="name">Nombre del ejercicio</InputLabel>
  <TextField
    id="name"
    placeholder='Nombre del ejercicio'
    type="text"
    error={!!errors.name}
    onChange={changeHandler}
    name="name"  
    helperText={errors.name}
    style={{ width: '35%' }}
  />
 

    
                    <div >
                    <InputLabel >
    Imagen, Gif, Video del ejercicio
  </InputLabel>
                     <UploadWidCloud uploadImage={uploadImage}/>
                      
                    </div>
                    <Grid>
  <InputLabel htmlFor="descripcion">Descripción</InputLabel>
  <TextField
    multiline
    rows={2}
    placeholder="Agrega una descripción del ejercicio"
    className={style.inputDescription}
    name="description"
    onChange={changeHandler}
    error={!!errors.description}
    helperText={errors.description}
    style={{ width: '35%' }} 
  />
  <br></br> 
</Grid>

<Grid>
  <InputLabel id="categoria">Categoría de ejercicio</InputLabel>
  <Select
    labelId="categoria"
    id="categ"
    label="Seleccionar Tipo"
    className={style.inputNom}
    name="category"
    onChange={changeHandler}
    value={exer.category}
    error={!!errors.category}
    displayEmpty
    style={{ width: '35%' }} 

  >
    <MenuItem value="" disabled>
      Selecciona
    </MenuItem>
    <MenuItem value="TS">Tren Superior</MenuItem>
    <MenuItem value="TI">Tren Inferior</MenuItem>
    <MenuItem value="CORE">Zona Media</MenuItem>
  </Select>
  {errors.category && <FormHelperText sx={{textAlign: 'center'}}error>{errors.category}</FormHelperText>}
  
</Grid>

<Box mb={4}> 
  <MuscleInput onAdd={handleAddMuscle} />

  <Grid container spacing={0} justifyContent='center'>
        {exer.muscle_trained.map((muscle, index) => (
          <Grid item key={index}>
            <Chip
            key={index}
            label={muscle}    
            onDelete={() => handleDeleteMuscle(muscle)}
            className={style.muscle}
            color="primary"  />
          </Grid>
        ))}
      </Grid>

</Box>

<Grid>
  <TextField
    id="duration"
    label="Duración Estimada en segundos"
    type="number"
    placeholder="Duracion en segundos"
    className={style.inputNom}
    name="estimatedDuration"
    onChange={changeHandler}
    value={exer.estimatedDuration}
    error={!!errors.duration}
    helperText={errors.duration}
  />
</Grid>

                    <Button variant="contained" color="primary" size="small"type="submit" className={style.btCreateAccount} > Crear Ejercicio</Button>
        </form>
        </> 
        </Container> 
)
}

export default CreateExercise