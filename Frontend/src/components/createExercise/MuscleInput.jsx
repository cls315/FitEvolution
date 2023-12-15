// MuscleInput.js
import { useState } from 'react';
import style from './CreateExercise.module.css'
import { Box, FormControl, IconButton, Input, InputAdornment, TextField, Typography } from '@mui/material';
import { AddBoxSharp } from '@mui/icons-material';
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
  const handleButtonClick = (e)=>{
    onAdd(muscle.trim());
    setMuscle('')
  }

  return (
    <Box>
    <FormControl>
  <Typography variant="body1" gutterBottom>
    Agregar músculo involucrado:
  </Typography>
  <TextField
    type="text"
    placeholder="Agregar músculo"
    value={muscle}
    onChange={handleInputChange}
    onKeyDown={handleKeyDown}
    InputProps={{
      endAdornment: (
        <InputAdornment position="end">
          <IconButton onClick={handleButtonClick} edge="end">
            <AddBoxSharp />
          </IconButton>
        </InputAdornment>
      ),
    }}
  />
</FormControl>
</Box>
  );
};

export default MuscleInput;
