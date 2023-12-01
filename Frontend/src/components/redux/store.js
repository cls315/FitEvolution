import { createStore,applyMiddleware,compose } from "redux";
import thunk from 'redux-thunk';
import rootReducer from "./reducer/reducer";
import { loadState, saveState } from "../localStorage/localStorage";

const composeEnhancer=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // esta linea nos permite usar la extension de redux del navegador

const initialData = loadState()

const store=createStore(
    rootReducer,
    initialData,
    composeEnhancer(applyMiddleware(thunk)) // esta linea es para hacer peticiones al server
)

store.subscribe( function () {
    const state = store.getState()
    saveState(state)
  })

export default store;