import NavPerfil from "./NavPerfil";
import styles from "./DetailUsuario.module.css"
import {useState} from "react"
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import profileUser from "../../components/SVG/profileUser.png"
import { Button, Table, TableHead, TableBody, TableRow, TableCell,Typography,Grid,Paper } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
const DetailUsuario = ()=>{

    const user = useSelector((state) => state.usuario)
    const allTrainers = useSelector((state)=> state.allTrainers)
    const misEntrenadores = []
    for(let i = 0; i < user.myTrainers.length; i++){
        const filterTrainers = allTrainers.find((trainer) => trainer.id == user.myTrainers[i])
        misEntrenadores.push(filterTrainers);
    }

    const [pageView, setPageView] = useState(1)
    const [rutina, setRutina] = useState();
    console.log("detail",user);

    const navigate = useNavigate();

    const closeSesion = ()=>{
        navigate('/')
    }

    
    const verRutina = (id)=>{
        const routine = misEntrenadores.find((trainer) => trainer.rutinaPredeterminada[0].id == id)
        setRutina(routine.rutinaPredeterminada[0])
        setPageView(2)
    }

    return(
        <div>
        <NavPerfil setPageView={setPageView} />
        <div className={styles.allConteiner}>
          <div className={styles.infoConteiner}>
            <img src={user.image !== null ? user.image : profileUser} className={styles.perfil} />
            <h2 className={styles.nombre}>{`${user.forename} ${user.surname || ""}`}</h2>
            <h3 className={styles.email}>{user.email || ""}</h3>
            <h3 className={styles.nacionalidad}>Argentina</h3>
            <Button variant="outlined" className={styles.btnCerrarSesion} onClick={closeSesion}>
              Cerrar Sesión
            </Button>
          </div>
          {pageView === 1 ? (
            <div className={styles.packsConteiner}>
              <Typography variant="h1">MIS RUTINAS</Typography>
              <Grid container className={styles.packsHeader}>
        <Grid item xs={1}>
          <Typography variant="h6">Tipo</Typography>
        </Grid>
        <Grid item xs={1}>
          <Typography variant="h6">Profesor</Typography>
        </Grid>
        <Grid item xs={1}>
          <Typography variant="h6">Tiempo</Typography>
        </Grid>
      </Grid>
              {misEntrenadores.length > 0 ? (
                misEntrenadores?.map((trainer) => (
                    <Paper
                    className={styles.pack}
                    key={trainer.rutinaPredeterminada[0].id}
                    onClick={() => verRutina(trainer.rutinaPredeterminada[0].id)}
                  >
                    <Typography variant="h6">{trainer.rutinaPredeterminada[0].enfoque}</Typography>
                    <Typography variant="h6">{trainer.forename}</Typography>
                    <Typography variant="h6">{trainer.rutinaPredeterminada[0].totalDuration}</Typography>
                  </Paper>
                ))
              ) : (
                <Paper className={styles.pack}>
          <Typography variant="h6">No tienes rutinas adquiridas</Typography>
        </Paper>
              )}
            </div>
          ) : pageView === 2 ? (
            <div className={styles.packsConteiner}>
              <div className={styles.rutinaConteiner}>
                <div className={styles.rutinaInfo}>
                <Paper>
  <Paper><Typography variant="h6" style={{ fontWeight: 'bold', color: 'lightblue' }}>
    Enfoque: 
  </Typography><Typography variant="h4" style={{ fontWeight: 'bolder', color: 'blue' }}> {rutina.enfoque} </Typography>
  </Paper>
  <Paper>
  <Typography variant="h6" style={{ fontStyle: 'italic', color: 'lightgreen' }}>
    Duración: 
  </Typography> <Typography variant="h4" style={{ fontStyle: 'italic', color: 'green' }}>{rutina.totalDuration}</Typography>
  
  </Paper>
  <Typography variant="h4" style={{ fontStyle:'bold', textDecoration: 'underline', color: 'orangered' }}>
    EJERCICIOS:
  </Typography>
</Paper>
                  
                  <Table className={styles.table}>
                    <TableHead>
                      <TableRow>
                        <TableCell>Nombre</TableCell>
                        <TableCell>Areas a Ejercitar</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rutina.exerc?.map((ejercicio, index) => (
                        <TableRow key={index}>
                          <TableCell>{ejercicio.name}</TableCell>
                          <TableCell>{ejercicio.muscle_trained.join(', ')}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                <div className={styles.rutinaIMG}>
                  <img src={rutina.image} alt="Rutina" />
                </div>
              </div>
            </div>
          ) : pageView === 3 ? (
            <div className={styles.packsConteiner}>
              {user.backups?.map((comprobante, index) => {
                const dateString = comprobante[0];
                const shortString = dateString.slice(0, 10);
                const formattedDateString = shortString.split("-").reverse().join("-");
                return (
                  <div className={styles.pack} key={index}>
                    <h2>Pack con: {comprobante[4]}</h2>
                    <h2>Valor de: {comprobante[2]}{comprobante[3]}</h2>
                    <h2>Adquirido en la fecha: {formattedDateString}</h2>
                  </div>
                );
              })}
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    )   
}

export default DetailUsuario;