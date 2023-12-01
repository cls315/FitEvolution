import React from 'react';
import './TrainerSearchbar.css';
import { useNavigate } from 'react-router-dom';

const TrainerSearchbar = () => {
  return (
    <div>
      <form className='w-100 d-flex flex-row justify-content-center pb-3'>
        <div className='d-flex flex-column mx-5'>
          <label htmlFor='select1'>Mostrar</label>
          <select
            class='form-select-sm bg-light text-dark '
            name='select1'
            id=''>
            <option value='option1'>Opción 1</option>

            <option value='option2'>Opción 2</option>

            <option value='option3'>Opción 3</option>
          </select>
        </div>
        <div className='d-flex h-25 align-items-center'>
          <input
            class=' form-control-xl no-outline h-25 mt-4 bg-light text-dark py-1 rounded-2 me-3 '
            placeholder='Buscar deportista'
            type='text'
          />
          <button class='btn btn-primary h-25 mt-4 btn-sm px-3 py-1 bg-warning text-dark fs-6 border-0'>
            Buscar
          </button>
        </div>
        <div className='d-flex flex-column'>
          <label htmlFor='select2'>Filtrar por:</label>
          <select
            class='form-select-sm bg-light text-dark mx-5'
            name='select2'
            id=''>
            <option value='option1'>Opción 1</option>

            <option value='option2'>Opción 2</option>

            <option value='option3'>Opción 3</option>
          </select>
        </div>
      </form>
      <div></div>
    </div>
  );
};

export default TrainerSearchbar;
