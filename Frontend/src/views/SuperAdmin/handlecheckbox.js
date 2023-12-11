import axios from "axios";
import { URLSERVER } from "../../../configURL";
import Swal from 'sweetalert2'



const handleCheckboxChange = (trainerId) => {
  // Obtener el estado almacenado en localStorage o inicializarlo como un array vacío
  const selectedAdmins = JSON.parse(localStorage.getItem("selectedAdmins")) || [];

  if (selectedAdmins.includes(trainerId)) {
    localStorage.setItem(
      "selectedAdmins",
      JSON.stringify(selectedAdmins.filter((id) => id !== trainerId))
    );
    axios.put(`${URLSERVER}/fitevolution/trainers/${trainerId}`, { role: "Trainer" });
    Swal.fire(`Cambiará el Rol de Admin con ID ${trainerId} a Trainer`)
    // Swal.fire(`Rol de Admin quitado`)
  } else {
    // Si el ID no está en la lista, agrégalo
    localStorage.setItem(
      "selectedAdmins",
      JSON.stringify([...selectedAdmins, trainerId])
    );
    axios.put(`${URLSERVER}/fitevolution/trainers/${trainerId}`, { role: "Admin" });
    Swal.fire(`Cambiará el Rol de Trainer con ID ${trainerId} a Admin`)
    // Swal.fire(`Rol de Admin otorgado`)

  }
};

export default handleCheckboxChange;