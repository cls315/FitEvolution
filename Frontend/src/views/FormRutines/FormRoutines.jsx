import { useState, useEffect } from "react";
import axios from 'axios';
import datos from "../../../../Backend/api/datos.json";

const FormRoutines = () => {
  const [selectedExercises, setSelectedExercises] = useState([]);
  const [totalDuration, setTotalDuration] = useState(0);
  const [selectedEnfoque, setSelectedEnfoque] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const exercises = datos.ejercicios || [];

  useEffect(() => {
    const duration = selectedExercises.reduce((total, exerciseId) => {
      const selectedExercise = exercises.find(exercise => exercise.id === exerciseId);
      return total + (selectedExercise?.estimatedDuration || 0);
    }, 0);
    setTotalDuration(duration);
  }, [selectedExercises, exercises]);

  const handleSelectChange = (event) => {
    console.log("Evento onChange:", event);
    const selectedExerciseId = Number(event.target.value);
    if (!selectedExercises.includes(selectedExerciseId)) {
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

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Enfoque seleccionado:", selectedEnfoque);
    console.log("Ejercicios seleccionados:", selectedExercises);
    console.log("Duración total:", totalDuration);

    try {
      const response = await axios.post('http://localhost:3001/api/rutinas', {
        enfoque: selectedEnfoque,
        exerc: selectedExercises,
        totalDuration: totalDuration,
        image:selectedImage,
      });

      if (response.status === 200) {
        console.log('Rutina almacenada exitosamente');
       
      } else {
        console.error('Error al almacenar la rutina');
      }
    } catch (error) {
      console.error('Error en la solicitud POST:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
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