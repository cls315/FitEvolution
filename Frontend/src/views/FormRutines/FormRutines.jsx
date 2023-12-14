import { useState, useEffect } from "react";
import datos from "../../../../Backend/api/datos.json";
<<<<<<< HEAD
import style from "./FormRutine.module.css"

=======
//import axios from "axios";
>>>>>>> feature/form

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Enfoque seleccionado:", selectedEnfoque);
    console.log("Ejercicios seleccionados:", selectedExercises);
    console.log("Duración total:", totalDuration);
<<<<<<< HEAD
    setFormReset(true); // estado para reseater formulario luego de enviarlo
  };

=======

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
        "http://localhost:3001/fitevolution/routines/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            enfoque: selectedEnfoque,
            ejercicios: exercisesArray, // Usa el array modificado
            duracionTotal: totalDuration,
            imagen: selectedImage,
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
>>>>>>> feature/form
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
    <div className={style.formContainer}>
      <form onSubmit={handleSubmit}>
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
    </div>
  );
};
export default FormRoutines;
