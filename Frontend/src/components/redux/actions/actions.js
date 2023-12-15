import { ejemplo, TRAINER, USUARIO_LOGED,GUARDAR_IDTRAINERS, GET_DEPORTISTAS, GET_TRAINERS, RUTINAS, SEARCH, FILTER_FOCUS, FILTER_SCORE, QUITAR_FILTROS, SOBRE_SCORE, GET_ROUTINES, SOBRE_FOCUS, AGREGAR_CARRITO, CLEAR_CART, DELETE_CART, SET_USER, USER, BANER } from "./types";

import axios from 'axios';
import { URLSERVER } from '../../../../configURL';
import { MENU_TRAINERS } from '../actions/types'
import { get } from "react-hook-form";

export const usuariologed = (data) => {
  console.log(data);
  return {
    type: USUARIO_LOGED,
    payload: data,
  };
};

export const getTrainers = (data) => {
  if (data && data.length > 0) {
    return {
      type: GET_TRAINERS,
      payload: data,
    };
  }

  return async function (dispatch) {
    try {
      let json = await axios(`${URLSERVER}/fitevolution/trainers/allTrainer`);
      console.log(json.data);
      dispatch({
        type: GET_TRAINERS,
        payload: json.data,
      });
    } catch (error) {
      throw new Error(error.message);
    }
  };
};

export const getDeportistas = (data) => {
  if (data && data.length > 0) {
    return {
      type: GET_DEPORTISTAS,
      payload: data,
    };
  }
  return async function (dispatch) {
    try {
      let json = await axios(`${URLSERVER}/fitevolution/clients`);
      dispatch({
        type: GET_DEPORTISTAS,
        payload: json.data,
      });
    } catch (error) {
      throw new Error(error.message);
    }
  };
};

//cambiar menus en el panel del entrenador
export const cambiarMenuTrainer = (data) => {
  return function (dispatch) {
    return dispatch({
      type: MENU_TRAINERS,
      payload: [data],
    });
  };
};

export const filterFocus = (option) => {
  return async function (dispatch) {
    try {
      const json = await axios(
        `${URLSERVER}/fitevolution/trainers/filter?focus=${option}`
      );
      return dispatch({
        type: FILTER_FOCUS,
        payload: json.data,
      });
    } catch (error) {
      throw new Error(error.message);
    }
  };
};

export const filterScore = (option) => {
  return async function (dispatch) {
    try {
      const json = await axios(
        `${URLSERVER}/fitevolution/trainers/filter?score=${option}`
      );
      console.log("data", json.data);
      return dispatch({
        type: FILTER_SCORE,
        payload: json.data,
      });
    } catch (error) {
      throw new Error(error.message);
    }
  };
};

export const sobreScore = (option) => {
  return function (dispatch) {
    return dispatch({
      type: SOBRE_SCORE,
      payload: option,
    });
  };
};

export const sobreFocus = (option) => {
  console.log("sobre focus", option);
  return function (dispatch) {
    return dispatch({
      type: SOBRE_FOCUS,
      payload: option,
    });
  };
};

export const quitarFiltros = () => {
  return function (dispatch) {
    return dispatch({
      type: QUITAR_FILTROS,
      payload: [],
    });
  };
};

export const agregarCarrito = (option) => {
  return function (dispatch) {
    return dispatch({
      type: AGREGAR_CARRITO,
      payload: option,
    });
  };
};

export const clearCart = () => {
  return function (dispatch) {
    return dispatch({
      type: CLEAR_CART,
    });
  };
};

export const getRoutines = () => {
  return async function (dispatch) {
    try {
      const json = await axios(
        `${URLSERVER}/fitevolution/routines/allRoutines`
      );
      return dispatch({
        type: GET_ROUTINES,
        payload: json.data,
      });
    } catch (error) {
      throw new Error(error.message);
    }
  };
};
export const getEntreno = () => {
  return async function (dispatch) {
    const entreno = await axios(
      "http://localhost:3001/fitevolution/routines/allRoutines"
    );
    console.log(entreno, "actions");
    const rutinas = entreno.data;
    dispatch({
      type: RUTINAS,
      payload: rutinas,
    });
  };
};

export const search = (input) => {
  return {
    type: SEARCH,
    payload: input,
  };
};

export const deleteCarrito = (option) => {
  return function (dispatch) {
    return dispatch({
      type: DELETE_CART,
      payload: option,
    });
  };
};

export const setusuario = (option) => {
  return function (dispatch) {
    return dispatch({
      type: SET_USER,
      payload: option,
    });
  };
};

export const userPerfil = (option) => {
  return async function (dispatch) {
    try {
      
      const json = await axios(`${URLSERVER}/fitevolution/clients`);
      const allClients = json.data;
      const client = allClients.find((client) => client.email == option);
      console.log("action client", client);
      return dispatch({
        type: USER,
        payload: client
      })
    } catch (error) {
      throw new Error(error.message)
    }
  }

}

export const trainerPerfil = (option)=>{
  return async function(dispatch){
    try {
      
      const json = await axios(`${URLSERVER}/fitevolution/trainers/allTrainer`)
      const allTrainers = json.data
      const trainer = allTrainers.find((trainer) => trainer.email == option)
      console.log("action trainer",trainer);
      return dispatch({
        type: TRAINER,
        payload: trainer
      });
    } catch (error) {
      throw new Error(error.message)
    }
  }
}

export const postRutines = () => {
  return async function (dispatch) {
    try {
      const json = await axios(`${URLSERVER}/fitevolution/routines/`);
      return dispatch({
        type: POST_RUTINES,
        payload: json.data,
      });
    } catch (error) {
      throw new Error(error.message);
    }
  };
};

export const getBaner =async(id,data)=>{
  console.log(data,id)
 try {
   const {data:info} = await axios.put(`${URLSERVER}/fitevolution/clients/${id}/banned`, data)
    console.log(info)
  
 } catch (error) {
  console.log(error)
 }
      
    }

export const saveIdTrainer = (id)=>{
  const numberParset = parseInt(id)
  return function(dispatch){
   return dispatch({
     type: GUARDAR_IDTRAINERS,
     payload: numberParset,
   })
  }
}

export const enviarPuntaje = (id, puntaje) => {
return async function () {
  try {
  const pusheo = await axios.post(`${URLSERVER}/fitevolution/trainers/${id}/puntuacion`, 
    {
      puntuaciones: puntaje
    })
    console.log(pusheo);
  } catch (error) {
    console.log(error);
    throw new Error(error.message)
  }
}
}