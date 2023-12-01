import { Link, useNavigate } from 'react-router-dom';
import style from './Select.module.css'
import { useParams } from 'react-router-dom';



const Select = (props) => {
    const {typeAccount}=useParams();
    const navigate = useNavigate()

    return (<div className={style.conteinerSelect}>
        <div className={style.select}>
            <div className={style.text}>
                <h2>Elije un rol</h2>
            </div>
            <div className={style.rolesSelect}>
                <div className={style.selectRol}>
                    <h1>Deportista </h1>
                    <button className={style.buttonSelect} name="Deportistas" onClick={(e) => { navigate(`/login/${e.target.name}`)}}>Registrarse</button>
                </div>
                <div className={style.selectRol}>
                    <h1>Entrenador</h1>
                    <button className={style.buttonSelect} name="Entrenadores" onClick={(e) => { navigate(`/login/${e.target.name}`) }}>Registrarse</button>
                </div>
            </div>
        </div>
    </div>
    )
}

export default Select;