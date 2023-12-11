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


const DashBar = (props) => {
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
                <Button  className={style.buttonPerfil}>CH&#9660;</Button>
                <List class={style.dropdowncontent}>
                    <ListItem><a href="#">Mi cuenta</a></ListItem>
                    <ListItem><Button onClick={userAdmin}>Admin</Button></ListItem>
                    <ListItem><a href="#">Ajustes</a></ListItem>
                    <ListItem><Button onClick={exitSession} className={style.exitDashTRainer}>Salir</Button></ListItem>
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