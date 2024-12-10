import { Box, Typography } from "@mui/material";
import { useRoleContext } from "../../context/RoleContext";
import { useUserContext } from "../../context/UserContext";
import { User } from "../../types/User";
import RegisterUserForm from "./RegisterUserForm";
import { showToast } from "../../../../utils/modal/toast";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Breadcrumb from "./RegisterUserBreadcrumbs";

const RegisterContainer: React.FC = () => {
  const { registerUser, error, users, updateUser } = useUserContext();
  const { roles, loading, error: roleError } = useRoleContext();
  const navigate = useNavigate();
  const params = useParams();
  const [userToUpdate, setUserToUpdate] = useState<User | undefined>(undefined);

  useEffect(() => {
    if (params.userId) {
      const userFound = users.find((user) => user.id === params.userId);
      setUserToUpdate(userFound);
    }
  }, [users]);

  const handleRegisterUser = async (userData: any) => {
    // console.log("userData::: ", userData);
    try {
      if (params.userId) {
        await updateUser(userData, params.userId);
      } else {
        await registerUser(userData);
      }
      // console.log('response::: ', response);
      // if (response) {
      showToast(
        "success",
        params.userId
          ? "Usuario actualizado con exito"
          : "Usuario creado con exito"
      );
      navigate("/gestion-de-usuarios/usuarios");
      // }

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
          // alignItems: "center",
          justifyContent: "center",
          p: "0 0 0 1.5rem",
          flexDirection: "column",
        }}
        // gutterBottom
      >
        <Breadcrumb />
        {params.userId
          ? "Actualizacion de usuario"
          : "Registro de un nuevo usuario"}
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
          userToUpdate={userToUpdate}
        />
      </Box>
    </Box>
  );
};
export default RegisterContainer;
