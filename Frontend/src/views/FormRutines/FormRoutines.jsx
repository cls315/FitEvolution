import { useState, useEffect } from "react";
import datos from "../../../../Backend/api/datos.json";
import {URLSERVER} from "../../../configURL"
//import axios from "axios";
import style from "./FormRoutine.module.css";
import { Link } from "react-router-dom";
import { Grid,FormControl, InputLabel,Select, MenuItem, Button } from "@mui/material";
import { border } from "@mui/system";
import DeleteIcon from '@mui/icons-material/Delete'

const FormRoutines = () => {

  const [selectedExercises, setSelectedExercises] = useState([]);
  const [totalDuration, setTotalDuration] = useState(0);
  const [selectedEnfoque, setSelectedEnfoque] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  // para resetear el estado a 0
  const [formReset, setFormReset] = useState(false);
  //estado para clientes
  const [clientList, setClientList] = useState([]);
  const [selectedClient, setSelectedClient] = useState("");

  // array de ejercicios
  const exercises = datos.ejercicios || [];

  // useEffect para traer clientes
  useEffect(() => {
    console.log("Client List en el render:", clientList);
    const fetchClientes = async () => {
      try {
        const response = await fetch(
          `${URLSERVER}/fitevolution/clients/`
        );
        if (response.ok) {
          const data = await response.json();
          console.log("Data de clientes:", data);
          setClientList(data);
        } else {
          console.error("Error al obtener la lista de clientes");
        }
      } catch (error) {
        console.error("Error en la solicitud:", error);
      }
    };
    fetchClientes();
  }, []);

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Enfoque seleccionado:", selectedEnfoque);
    console.log("Ejercicios seleccionados:", selectedExercises);
    console.log("Duración total:", totalDuration);
    console.log("Selected Client en el submit:", selectedClient);
    setFormReset(true); // estado para resetear formulario luego de enviarlo

    const exercisesArray = selectedExercises.map((exerciseId) => {
      const selectedExercise = exercises.find(
        (exercise) => exercise.id === exerciseId
      );

      // Asegúrate de que selectedExercise tenga la estructura correcta
      return {
        id: selectedExercise.id,
        name: selectedExercise.name,
        estimatedDuration: selectedExercise.estimatedDuration,
        // ... otras propiedades necesarias
      };
    });

    try {
      const response = await fetch(
        `${URLSERVER}/fitevolution/routines/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            cliente: selectedClient,
            enfoque: selectedEnfoque,
            exerc: exercisesArray, // Usa el array modificado
            totalDuration: totalDuration,
            image: selectedImage,
          }),
        }
      );

      if (response.ok) {
        console.log("Rutina creada exitosamente");
      } else {
        console.error("Error al crear la rutina");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
    
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
      setSelectedClient("");
      setFormReset(false);
    }
  }, [formReset]);

  return (
    <div className={style.Form}>
    <h1>Crear Rutinas</h1>
    <Grid sx={{backgroundColor: 'rgba(255, 255, 255, 0.5)', borderRadius:15, border:2, marginTop:3,marginLeft:20,marginRight:20}}>

      <FormControl onSubmit={handleSubmit} sx={{ m: 6, minWidth: 80 }}>
       
        
        <InputLabel id="Cliente">Seleccionar Cliente</InputLabel>
          <Select
            onChange={(event) => setSelectedClient(event.target.value)}
            value={selectedClient}
            labelId="Cliente"
            label="Seleccionar Cliente"
            >
            <MenuItem value="" disabled>
              Selecciona un cliente
            </MenuItem>
            { clientList && clientList.map((cliente) => (
              <MenuItem key={cliente.id} value={cliente.id}>
                {cliente.forename} {cliente.surname}
              </MenuItem>
            ))}
          </Select>
        
        
         

      <FormControl sx={{ m:6, minWidth: 80 }}>

          <InputLabel id="enfoque">Seleccionar enfoque:</InputLabel>
          <Select
            onChange={(event) => setSelectedEnfoque(event.target.value)}
            value={selectedEnfoque}
            labelId="enfoque"
            label="Seleccionar enfoque"
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
      
            </FormControl>
        
        <FormControl>
          <InputLabel id="ejercicios">Seleccionar ejercicios:</InputLabel>
          <Select onChange={handleSelectChange} value={""} labelId="ejercicios" label="Seleccionar ejercicios">
            <MenuItem value="" disabled>
              Selecciona un ejercicio
            </MenuItem>
            {exercises.map((exercise) => (
              <MenuItem key={exercise.id} value={exercise.id}>
                {exercise.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <div>
          <p>Ejercicios seleccionados:</p>
          <ul>
            {selectedExercises.map((exerciseId) => {
              const selectedExercise = exercises.find(
                (exercise) => exercise.id === exerciseId
                );
                
                console.log("Ejercicio seleccionado:", selectedExercise);
                
                return (
                <li key={exerciseId}>
                  {selectedExercise?.name}
                  <Button variante="outlined" startIcon={<DeleteIcon/>}
                    
                    onClick={() => handleRemoveExercise(exerciseId)}
                    >
                    Eliminar
                  </Button>
                </li>
              );
            })}
          </ul>
        </div>

        <div>
          <label>Seleccionar imagen :</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />

          {selectedImage && (
            <div>
              <p>Vista previa de la imagen seleccionada:</p>
              <img
                src={selectedImage}
                alt="Selected"
                style={{ maxWidth: "200px" }}
                />
            </div>
          )}
        </div>

        <div>
          <p>Duración total de los ejercicios: {totalDuration} minutos</p>
        </div>

        <Button variant="contained" disableElevation type="submit">Crear Rutina</Button>
      </FormControl>
      <div className={style.goBack}>
        <Link to="/dashboardtr">
          <span className={style.backArrow}>{"<"}</span> Atrás
        </Link>
      </div>
    </Grid>
  </div>
  );
};

export default FormRoutines;
