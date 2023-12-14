//Components
import Landing from './views/landing/landing.component'
import About from './views/About/About';
import Select from './views/Select/Select';
import RegisterUser from './views/registerUser/registerUser.component';
import RegisterTrainer from './views/registerTrainer/registerTrainer.component';
import FormSesion from './views/Sesion/Sesion';
import DashboardTrainer from './views/DashboardTrainer/DashboardTrainer';
import Homeusuario from './views/HomeUsuario/homeusuario';
import Detail from './views/TeacherDetail/detail';
import ForgotPassword from './views/ForgotPassword/forgotPassword';
import SessionAdmin from './views/SessionAdmin/SessionAdmin';
import Admin from './views/Admin/Admin'
import CreateExercise from './components/createExercise/CreateExercise';
import SuperAdmin from './views/SuperAdmin/SuperAdmin';
import DetailUsuario from './views/DetailUsuario/DetailUsuario';
import Checkout from './views/CheckoutTrainer/Checkout'
import FormRoutines from './views/FormRutines/FormRoutines';
import LoginForm from './views/LogSuper/LogSuper';
//Commons imports
import { Route, Routes, useLocation } from 'react-router-dom';

//Styles
import './App.css'



function App() {
  const location = useLocation();

    

  return (
    <>
      <Routes>
        <Route
          path='/'
          element={<Landing />}
        />
        <Route
          path='/about'
          element={<About />}
        />
        <Route
          path='/select/'
          element={<Select />}
        />
        <Route
          path='/registeruser'
          element={<RegisterUser />}
        />
         <Route
          path='/registertrainer'
          element={<RegisterTrainer />}
        />
         <Route
          path='/login/:typeSession'
          element={<FormSesion />}
        />
        <Route
          path='/checkoutTrainer'
          element={<Checkout />}
        />
         <Route
          path='/dashboardtr'
          element={<DashboardTrainer />}
        />
        <Route
         path='/homeusuario'
          element={<Homeusuario />}/>
        <Route 
        path='/teacher/:id'
        element={<Detail/>}/>
        <Route
        path='/forgot_Password'
        element={<ForgotPassword/>}
        />
         <Route
        path='/sessionadm'
        element={<SessionAdmin/>}
        />
         <Route
        path='/adm'
        element={<Admin/>}
        />
           <Route
        path='/createEj'
        element={<CreateExercise/>}
        />

        <Route
        path='/owner'
        element={<SuperAdmin/>}
        />

        <Route
        path='/detailusuario'
        element={<DetailUsuario/>}
        />
        
        <Route
        path='/createRoutine'
        element={<FormRoutines/>}
        
        />
        <Route
        path='/LoginOwner'
        element={<LoginForm/>}
        
        />
       
      </Routes>
    </>
  );
}

export default App
