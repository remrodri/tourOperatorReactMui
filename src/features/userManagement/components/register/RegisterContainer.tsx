import { Alert, Box, Typography } from "@mui/material";
import { useRoleContext } from "../../context/RoleContext";
import { useUserContext } from "../../context/UserContext";
import { User } from "../../types/User";
import RegisterUserForm from "./RegisterUserForm";
import { showToast } from "../../../../utils/modal/toast";
import { useNavigate } from "react-router-dom";

const RegisterContainer: React.FC = () => {
  const { registerUser, error } = useUserContext();
  const { roles, loading, error: roleError } = useRoleContext();
  const navigate = useNavigate();

  const handleRegisterUser = async (userData: any) => {
    // console.log("userData::: ", userData);
    try {
      const response = await registerUser(userData);
      // console.log('response::: ', response);
      if (response) {
        showToast("success", "Usuario creado con exito");
        navigate("/gestion-de-usuarios/usuarios");
      }

      // console.log('response::: ', response);

      // if (response) {
      //   // console.log(response);
      //   return<Alert severity="success">success</Alert>;
      // } else {
      //   return<Alert severity="error">error</Alert>;
      // }
    } catch (error) {
      console.error(error);
      showToast("error", "Falla al registrar el usuario");
    }
  };

  return (
    <Box
      sx={{
        height: "100%",
        // overflowY:"auto"
      }}
    >
      <Typography
        variant="h5"
        sx={{
          height: "10%",
          display: "flex",
          alignItems: "center",
          p: "0 0 0 1.5rem",
        }}
        // gutterBottom
      >
        Registro de un nuevo usuario
      </Typography>
      <Box
        sx={{
          height: "90%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: {
            sm: "1rem 0 1rem 0",
          },
          overflowY: "auto",
        }}
      >
        <RegisterUserForm
          roles={roles}
          loading={loading}
          onSubmit={handleRegisterUser}
          error={error || roleError}
        />
      </Box>
    </Box>
  );
};
export default RegisterContainer;
