import axios from "axios";
import { URLSERVER } from "../../../configURL";
import Swal from 'sweetalert2'



// const handleCheckboxChange = async (trainerId) => {
//   const selectedAdmins = JSON.parse(localStorage.getItem("selectedAdmins")) || [];

//   if (selectedAdmins.includes(trainerId)) {
//     localStorage.setItem(
//       "selectedAdmins",
//       JSON.stringify(selectedAdmins.filter((id) => id !== trainerId))
//     );
//     await axios.put(`${URLSERVER}/fitevolution/trainers/${trainerId}`, { role: "Trainer" });
//     Swal.fire(`Cambiará el Rol de Admin con ID ${trainerId} a Trainer`)
//     // Swal.fire(`Rol de Admin quitado`)
//   } else {
//     localStorage.setItem(
//       "selectedAdmins",
//       JSON.stringify([...selectedAdmins, trainerId])
//     );
//     await axios.put(`${URLSERVER}/fitevolution/trainers/${trainerId}`, { role: "Admin" });
//     Swal.fire(`Cambiará el Rol de Trainer con ID ${trainerId} a Admin`)
//     // Swal.fire(`Rol de Admin otorgado`)

//   }
// };
const handleCheckboxChange = async (trainerId) => {
  try {
    const selectedAdmins = JSON.parse(localStorage.getItem("selectedAdmins")) || [];
    const isCurrentlyAdmin = selectedAdmins.includes(trainerId);

    const newRole = isCurrentlyAdmin ? "Trainer" : "Admin";
    await axios.put(`${URLSERVER}/fitevolution/trainers/${trainerId}`, { role: newRole });
    Swal.fire({
      icon: 'success',
      title: '¡Éxito!',
      text: `Se cambió el rol de ${newRole === 'Admin' ? 'Trainer' : 'Admin'} con ID ${trainerId}`,
      timer: 3000,
    }).then(() => {
      // Se ejecuta después de que el SweetAlert se haya cerrado automáticamente
      localStorage.setItem(
        "selectedAdmins",
        JSON.stringify(isCurrentlyAdmin ? selectedAdmins.filter((id) => id !== trainerId) : [...selectedAdmins, trainerId])
      );
      window.location.reload(false);
    });

  } catch (error) {
    console.error("Error al cambiar el rol del entrenador:", error);
    Swal.fire("Ocurrió un error al cambiar el rol del entrenador. Por favor, inténtelo de nuevo.");
  }
};

export default handleCheckboxChange;