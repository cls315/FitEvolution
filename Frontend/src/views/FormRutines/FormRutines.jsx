import { useState, useEffect } from "react";
import datos from "../../../../Backend/api/datos.json";
import style from "./FormRutine.module.css"
import {TextField, Button, Typography, Paper,List,Input ,Avatar,ListItem, Grid,FormControl,InputLabel,Select, MenuItem } from '@mui/material';
import { Container, width } from "@mui/system";

const FormRoutines = () => {
  const [selectedExercises, setSelectedExercises] = useState([]);
  const [totalDuration, setTotalDuration] = useState(0);
  const [selectedEnfoque, setSelectedEnfoque] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  // pare resetear el estado a 0 
  const [formReset, setFormReset] = useState(false);

 // array de ejercicios
  const exercises = datos.ejercicios || [];

  useEffect(() => {
    const duration = selectedExercises.reduce((total, exerciseId) => {
      const selectedExercise = exercises.find(
        (exercise) => exercise.id === exerciseId
      );
      return total + (selectedExercise?.estimatedDuration || 0);
    }, 0);
    setTotalDuration(duration);
  }, [selectedExercises, exercises]);

  const handleSelectChange = (event) => {
    console.log("Evento onChange:", event);
    const selectedExerciseId = Number(event.target.value);
    if (
      selectedExerciseId !== 0 &&
      !selectedExercises.includes(selectedExerciseId)
    ) {
      setSelectedExercises((prevSelected) => [
        ...prevSelected,
        selectedExerciseId,
      ]);
    }
  };

  const handleRemoveExercise = (exerciseId) => {
    setSelectedExercises((prevSelected) =>
      prevSelected.filter((id) => id !== exerciseId)
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Enfoque seleccionado:", selectedEnfoque);
    console.log("Ejercicios seleccionados:", selectedExercises);
    console.log("Duración total:", totalDuration);
    setFormReset(true); // estado para reseater formulario luego de enviarlo
  };

  // handler para imagen local
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    console.log("Evento de cambio de imagen:", event);
    if (file) {
      console.log("Archivo de imagen seleccionado:", file);
      setSelectedImage(URL.createObjectURL(file));
    }
  };
 // useEffect para resetear formulario luego de enviarlo
  useEffect(() => {
    if (formReset) {
      setSelectedExercises([]);
      setTotalDuration(0);
      setSelectedEnfoque("");
      setSelectedImage(null);
      setFormReset(false); 
    }
  }, [formReset]);

  return (
    <Container className={style.conteiner}>
<h1 className={style.text}>Crear Rutinas</h1>
       <FormControl>
        <Grid>
         <Typography>Seleccionar Entrenamiento</Typography>
          <Select
            labelId="select-label"
            id="select"
            value={selectedEnfoque}
            onChange={(event) => setSelectedEnfoque(event.target.value)}
            label="Seleccionar"
            sx={{ width: '150px' }} 
          >
            <MenuItem value="" disabled>
              Selecciona un enfoque
            </MenuItem>
            <MenuItem value="Entrenamiento deportivo">
              Entrenamiento deportivo
            </MenuItem>
            <MenuItem value="Entrenamiento funcional">
              Entrenamiento funcional
            </MenuItem>
            <MenuItem value="Entrenamiento cardiovascular">
              Entrenamiento cardiovascular
            </MenuItem>
            <MenuItem value="Entrenamiento de fuerza">
              Entrenamiento de fuerza
            </MenuItem>
          </Select>
        </Grid>
        <br></br>

        <Grid>
       <Typography>Ejercicio</Typography>
          <Select 
          Text="ejer"
          onChange={handleSelectChange}
          value={""}
          label="Seleccionar"
          sx={{ width: '150px', color:'#007bff'}} 
          
          >
            <MenuItem value="" disabled>
              Selecciona un ejercicio
            </MenuItem>
            {exercises.map((exercise) => (
              <MenuItem key={exercise.id} value={exercise.id} sx={{color:"#0056b3"}}>
                {exercise.name}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <br></br>

        <Grid>
        <Typography>Ejercicio seleccionado:</Typography>
        <List>
      {selectedExercises.map((exerciseId) => {
        const selectedExercise = exercises.find((exercise) => exercise.id === exerciseId);

        console.log("Ejercicio seleccionado:", selectedExercise);

        return (
          <ListItem key={exerciseId}>
            {selectedExercise?.name}
            <Button
              type="button"
              onClick={() => handleRemoveExercise(exerciseId)}
              variant="outlined"
              color="secondary"
            >
              Eliminar
            </Button>
          </ListItem>
        );
      })}
    </List>
        </Grid>
        <br></br>

        <Grid  sx={{ padding: '10px'}}>

          <Typography>Seleccionar Imagen</Typography>
          <Input type="file" accept="image/*" onChange={handleImageChange} />

             {selectedImage && (
            <Grid>
            
              <Avatar
                src={selectedImage}
                alt="Selected"
                sx={{width:'120px',height:'120px', marginLeft: '25%',marginTop:'10px'}}>
              </Avatar>
           
              </Grid>  
          
               )}


          </Grid>
       
        <br></br>
        <Grid>
        
          <Typography>Duración total de los ejercicios: {totalDuration} minutos</Typography>       
        </Grid>
        <Button style={{color:"#fff"}} type="submit"variant="contained">Crear Rutina</Button>
       </FormControl>
    </Container>


      //  <label>Seleccionar imagen :</label>
//           <input type="file" accept="image/*" onChange={handleImageChange} />

//           {selectedImage && (
//             <div>
//               <p>Vista previa de la imagen seleccionada:</p>
//               <img
//                 src={selectedImage}
//                 alt="Selected"
//                 style={{ maxWidth: "200px" }}
//               />
//             </div>
//           )}
//         </div> */}









   
//       <FormControl >
//         <Grid>
//         <InputLabel id="select-label">Seleccionar</InputLabel>
//         <Select
//           labelId="select-label"
//           id="select"
//           value={selectedEnfoque}
//           onChange={(event) => setSelectedEnfoque(event.target.value)}
//           label="Seleccionar"
//         >
    
//             <option value="" disabled>
//               Selecciona un enfoque
//             </option>
//             <option value="Entrenamiento deportivo">
//               Entrenamiento deportivo
//             </option>
//             <option value="Entrenamiento funcional">
//               Entrenamiento funcional
//             </option>
//             <option value="Entrenamiento cardiovascular">
//               Entrenamiento cardiovascular
//             </option>
//             <option value="Entrenamiento de fuerza">
//               Entrenamiento de fuerza
//             </option>
//           </Select>
//         </Grid>
//              <br></br>
//         <Grid>
//           <InputLabel>Seleccionar ejercicios:</InputLabel>
//           <Select onChange={handleSelectChange} value={""}>
//             <option value="" disabled>
//               Selecciona un ejercicio
//             </option>
//             {exercises.map((exercise) => (
//               <option key={exercise.id} value={exercise.id}>
//                 {exercise.name}
//               </option>
//             ))}
//           </Select>
//         </Grid>

//         <div>
//           <p>Ejercicios seleccionados:</p>
//           <ul>
//             {selectedExercises.map((exerciseId) => {
//               const selectedExercise = exercises.find(
//                 (exercise) => exercise.id === exerciseId
//               );

          
//               console.log("Ejercicio seleccionado:", selectedExercise);

//               return (
//                 <li key={exerciseId}>
//                   {selectedExercise?.name}
//                   <Button
//                     type="button"
//                     onClick={() => handleRemoveExercise(exerciseId)}
//                   >
//                     Eliminar
//                   </Button>
//                 </li>
//               );
//             })}
//           </ul>
//         </div>
//         <div>
//           <label>Seleccionar imagen :</label>
//           <input type="file" accept="image/*" onChange={handleImageChange} />

//           {selectedImage && (
//             <div>
//               <p>Vista previa de la imagen seleccionada:</p>
//               <img
//                 src={selectedImage}
//                 alt="Selected"
//                 style={{ maxWidth: "200px" }}
//               />
//             </div>
//           )}
//         </div>
//         <div>
//           <p>Duración total de los ejercicios: {totalDuration} minutos</p>
//         </div>

//         <Button type="submit">Crear Rutina</Button>
//       </FormControl>
//     </div>
//   );
// };
  )}
export default FormRoutines;
