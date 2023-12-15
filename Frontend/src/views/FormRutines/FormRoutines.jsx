import { useState, useEffect } from "react";
import datos from "../../../../Backend/api/datos.json";
import {URLSERVER} from "../../../configURL"
//import axios from "axios";
import style from "./FormRoutine.module.css";
import { Link } from "react-router-dom";

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
    <div className={style.formContainer}>
      <form onSubmit={handleSubmit}>
        <div className={style.clientes}>
          <label>Seleccionar cliente:</label>
          <select
            onChange={(event) => setSelectedClient(event.target.value)}
            value={selectedClient}
          >
            <option value="" disabled>
              Selecciona un cliente
            </option>
            { clientList && clientList.map((cliente) => (
              <option key={cliente.id} value={cliente.id}>
                {cliente.forename} {cliente.surname}
              </option>
            ))}
          </select>
        </div>

        <div className={style.formGroup}>
          <label>Seleccionar enfoque:</label>
          <select
            onChange={(event) => setSelectedEnfoque(event.target.value)}
            value={selectedEnfoque}
          >
            <option value="" disabled>
              Selecciona un enfoque
            </option>
            <option value="Entrenamiento deportivo">
              Entrenamiento deportivo
            </option>
            <option value="Entrenamiento funcional">
              Entrenamiento funcional
            </option>
            <option value="Entrenamiento cardiovascular">
              Entrenamiento cardiovascular
            </option>
            <option value="Entrenamiento de fuerza">
              Entrenamiento de fuerza
            </option>
          </select>
        </div>

        <div>
          <label>Seleccionar ejercicios:</label>
          <select onChange={handleSelectChange} value={""}>
            <option value="" disabled>
              Selecciona un ejercicio
            </option>
            {exercises.map((exercise) => (
              <option key={exercise.id} value={exercise.id}>
                {exercise.name}
              </option>
            ))}
          </select>
        </div>

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
                  <button
                    type="button"
                    onClick={() => handleRemoveExercise(exerciseId)}
                  >
                    Eliminar
                  </button>
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

        <button type="submit">Crear Rutina</button>
      </form>
      <div className={style.goBack}>
        <Link to="/dashboardtr">
          <span className={style.backArrow}>{"<"}</span> Atrás
        </Link>
      </div>
    </div>
  );
};

export default FormRoutines;
