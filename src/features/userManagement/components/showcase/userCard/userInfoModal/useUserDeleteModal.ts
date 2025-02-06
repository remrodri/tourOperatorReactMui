import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useUserContext } from "../../../../../../context/UserContext";
import { showToast } from "../../../../../../utils/modal/toast";

const MySwal = withReactContent(Swal);

export const useUserDeleteModal = () => {
  const { deleteUser } = useUserContext();

  const showUserDeleteModal = async (userId: string) => {
    return MySwal.fire({
      width: "300",
      title: "Eliminar?",
      text: "No sera posible revertir esta accion!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        // console.log('userId::: ', userId);
        // Swal.fire({
        //   width:"300",
        //   title: "Eliminado con exito",
        //   text: "El usuario ha sido eliminado con exito",
        //   icon: "success",
        // });
        try {
          const response = await deleteUser(userId);
          if (!response) {
            showToast("error", "El usuario no se elimino");
          }
          showToast("success", "Usuario eliminado");
        } catch (error) {
          console.error(error);
        }
      }
    });
  };
  return { showUserDeleteModal };
};
