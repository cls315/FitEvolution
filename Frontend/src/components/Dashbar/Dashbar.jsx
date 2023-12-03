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
                <button  className={style.buttonPerfil}>CH&#9660;</button>
                <ul class={style.dropdowncontent}>
                    <li><a href="#">Mi cuenta</a></li>
                    <li><button onClick={userAdmin}>Admin</button></li>
                    <li><a href="#">Ajustes</a></li>
                    <li><button onClick={exitSession} className={style.exitDashTRainer}>Salir</button></li>
                </ul>
            </div>
            <img name='search' onClick={(e)=>handleMenu(e)} className={style.iconsDashbar} src={iconsearch} alt='icon'></img>
            <img name='bell'onClick={handleMenu} className={style.iconsDashbar} src={iconbell} alt='icon'></img>
            <img name='message' onClick={handleMenu} className={style.iconsDashbar} src={iconMessage} alt='icon'></img>
            <button name='entrenamientos' onClick={handleMenu} className={style.entreno}><CgGym />Entrenamientos</button>
            <button name='deportes' onClick={handleMenu} className={style.depor}><MdSportsGymnastics />Deportistas</button>
            <button name='pagos'onClick={handleMenu} className={style.pagos}><MdOutlinePayment />Pagos</button>
            <img className={style.logoTraineBar} src={imagelogo} alt="logo" />
        </div>
    )

}


export default DashBar