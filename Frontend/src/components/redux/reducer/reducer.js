import { ejemplo ,POST_RUTINES,GUARDAR_IDTRAINERS, USUARIO_LOGED,GET_DEPORTISTAS,GET_TRAINERS,MENU_TRAINERS,RUTINAS, SEARCH,FILTER_FOCUS, FILTER_SCORE, QUITAR_FILTROS, SOBRE_SCORE, SOBRE_FOCUS,CLEAR_CART, AGREGAR_CARRITO, GET_ROUTINES, DELETE_CART, SET_USER, USER,TRAINER} from "../actions/types"


const initialState = {
    allTrainers: [],
    allDeportistas: [],
    filterTrainers: [],
    status: "",
    carrito: [],
    routines: [],
    rutinas:[],
    rutinas2:[],
    userStatus: "",
    usuario:[],
    trainer:[],
    banerExit:null,
    banerError:null,
    idsTrainers: [],
}

const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_TRAINERS:
      console.log("trainerss");
      return { ...state, allTrainers: payload };
    case GET_DEPORTISTAS:
      return { ...state, allDeportistas: payload };
    case MENU_TRAINERS:
      return {
        ...state,
        menuTrainer: payload,
      };
    case FILTER_FOCUS:
      return {
        ...state,
        filterTrainers: payload,
        status: "focus",
      };
    case FILTER_SCORE:
      return {
        ...state,
        filterTrainers: payload,
        status: "score",
      };
    case SOBRE_SCORE:
      const newFilter = state.filterTrainers.filter(
        (trainer) => trainer.focusTr === payload
      );
      return {
        ...state,
        filterTrainers: newFilter,
        status: "focus",
      };
    case SOBRE_FOCUS:
      console.log(payload);
      const byStars = state.filterTrainers.filter(
        (trainer) => trainer.score.toString() === payload.toString()
      );
      console.log("stars", byStars);
      return {
        ...state,
        filterTrainers: byStars,
        status: "score",
      };
    case QUITAR_FILTROS:
      return {
        ...state,
        filterTrainers: [],
        status: "",
      };
    case AGREGAR_CARRITO:
      return {
        ...state,
        carrito: [...state.carrito, payload],
      };
    case CLEAR_CART:
      return {
        ...state,
        carrito: [],
        idsTrainers: [],
      };
    case GET_ROUTINES:
      return {
        ...state,
        routines: payload,
      };
    case DELETE_CART:
      const newArr = state.carrito.filter((item) => item.id !== payload);
      return {
        ...state,
        carrito: newArr,
      };
    case RUTINAS:
      console.log("reducer!");
      return {
        ...state,
        rutinas: payload,
        rutinas2: payload,
      };
    case SEARCH:
      const busqueda = state.rutinas2.filter((i) =>
        i.enfoque.includes(payload)
      );
      console.log(state.rutinas2, "search");
      return {
        ...state,
        rutinas: busqueda,
      };
    case SET_USER:
      return {
        ...state,
        userStatus: payload,
      };
    case USER:
      return {
        ...state,
        usuario: payload,
      };
    case TRAINER:
      return {
        ...state,
        trainer: payload,
      };
    case POST_RUTINES:
      return {
        ...state,
        postRutines: payload,
      };
    case GUARDAR_IDTRAINERS:
      const anterior = state.idsTrainers
      return{
        ...state, idsTrainers: [...anterior, payload]
      }
    default:
      return { ...state };
  }
};

export default rootReducer  