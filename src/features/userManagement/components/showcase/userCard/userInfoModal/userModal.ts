import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { User } from "../../../../types/User";
import "./userModalStyle.css";

const MySwal = withReactContent(Swal);

export const UserModal = {
  showUserDetails: (user: User, roleName: string) => {
    return MySwal.fire({
      title: "Informacion detallada",
      width: "300",
      customClass: {
        // container: "custom-container",
        htmlContainer: "custom-htmlContainer",
        popup: "custom-popup",
      },
      html: `<div class="mi-div">
        <span>Nombre: </span>
        <span class="user-info">${user.firstName}</span>
        <span>Apellido:</span>
        <span class="user-info">${user.lastName}</span>
        <span>Correo: </span>
        <span class="user-info">${user.email}</span>
        <span>Ci: </span>
        <span class="user-info">${user.ci}</span>
        <span>Telefono: </span>
        <span class="user-info">${user.phone}</span>
        <span>Rol: </span>
        <span class="user-info">${roleName}</span>
        </div>`,
      showCloseButton: true,
      confirmButtonText: "Cerrar",
    });
  },
};
