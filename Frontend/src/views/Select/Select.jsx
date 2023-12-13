import { Link, useNavigate } from 'react-router-dom';
import style from './Select.module.css'
import { useParams } from 'react-router-dom';
import { Button, Typography } from '@mui/material';



const Select = (props) => {
    const {typeAccount}=useParams();
    const navigate = useNavigate()

    return (<div className={style.conteinerSelect}>
        <div className={style.select}>
            <div className={style.text}>
                <Typography variant="h3">Elije un rol</Typography>
            </div>
            <div className={style.rolesSelect}>
                <div className={style.selectRol}>
                    <h1>Deportista </h1>
                    <Button variant="contained" color="primary" size="small" className={style.buttonSelect} name="Deportistas" onClick={(e) => { navigate(`/login/${e.target.name}`)}}>Registrarse</Button>
                </div>
                <div className={style.selectRol}>
                    <h1>Entrenador</h1>
                    <Button variant="contained" color="primary" size="small" className={style.buttonSelect} name="Entrenadores" onClick={(e) => { navigate(`/login/${e.target.name}`) }}>Registrarse</Button>
                </div>
            </div>
        </div>
    </div>
    )
}

export default Select;