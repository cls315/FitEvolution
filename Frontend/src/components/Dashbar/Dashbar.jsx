import style from "./Dashbar.module.css"
import { MdOutlinePayment } from "react-icons/md";
import { CgGym } from "react-icons/cg";
import { MdSportsGymnastics } from "react-icons/md";
import imagelogo from '../../images/imageLogo.jpg';
import iconsearch from '../SVG/iconsearch.svg'
import iconbell from '../SVG/iconbell.svg'
import iconMessage from '../SVG/iconMessage.svg'
import logout from "../../utils/logout";
import { useNavigate } from "react-router-dom";
import { Button, List, ListItem } from "@mui/material";
import { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { getTrainers, trainerPerfil } from "../redux/actions/actions";

const DashBar = (props) => {
    
   const [admin,setAdmin]=useState(false) 
   const trainer = useSelector(state=>state.trainer)
   const trainers =useSelector(state=>state.allTrainers)
   console.log(trainers)
   const dispatch = useDispatch()
   console.log(trainer.role)
   useEffect(() => {
    
    const searchAdm = trainers.find(tr => tr.email === trainer.email);
    if (searchAdm && searchAdm.role === "Admin") {
      setAdmin(true);
    } else {
      setAdmin(false);
    }
  }, [trainers, trainer]);


console.log(admin)

    const {handleMenu}=props
    const navigate=useNavigate()

    const exitSession= async()=>{
        await logout()  //cierra la instancia de auth
       navigate('/')
    }
   const userAdmin =()=>{
   
    navigate("/sessionadm")

   }



   

    return (
        <div className={style.dashBar}>
            <div class={style.dropdown}>
                <Button variant="contained" color="primary" className={style.buttonPerfil}>ch</Button>
                <List class={style.dropdowncontent}>
                    <ListItem><a href="#">Mi cuenta</a></ListItem>
                    {admin && <ListItem><Button variant="contained" color="warning" onClick={userAdmin}>Admin</Button></ListItem>}
                    <ListItem><a href="#">Ajustes</a></ListItem>
                    <ListItem><Button variant="contained" color="error" onClick={exitSession} className={style.exitDashTRainer}>Salir</Button></ListItem>
                </List>
            </div>
            <img name='search' onClick={(e)=>handleMenu(e)} className={style.iconsDashbar} src={iconsearch} alt='icon'></img>
            <img name='bell'onClick={handleMenu} className={style.iconsDashbar} src={iconbell} alt='icon'></img>
            <img name='message' onClick={handleMenu} className={style.iconsDashbar} src={iconMessage} alt='icon'></img>
            <Button name='entrenamientos' onClick={handleMenu} className={style.entreno}><CgGym />Entrenamientos</Button>
            <Button name='deportes' onClick={handleMenu} className={style.depor}><MdSportsGymnastics />Deportistas</Button>
            <Button name='pagos'onClick={handleMenu} className={style.pagos}><MdOutlinePayment />Pagos</Button>
            <img className={style.logoTraineBar} src={imagelogo} alt="logo" />
        </div>
    )

}


export default DashBar