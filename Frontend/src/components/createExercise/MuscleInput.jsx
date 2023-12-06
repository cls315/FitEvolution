// MuscleInput.js
import { useState } from 'react';
import style from './CreateExercise.module.css'
const MuscleInput = ({ onAdd }) => {
  const [muscle, setMuscle] = useState('');

  const handleInputChange = (e) => {
    setMuscle(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && muscle.trim() !== '') {
      e.preventDefault(); 
      onAdd(muscle.trim());
      setMuscle('');
    }
  };

  return (
    <div className={style.labelform1}>
      <label htmlFor="muscleInput">Agregar músculo:{''} </label>
      <input
        type="text"
        placeholder="Agregar músculo"
        value={muscle}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}

      />
    </div>
  );
};

export default MuscleInput;
