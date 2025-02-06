import { Box, Typography } from "@mui/material";
import { useRoleContext } from "../../../../context/RoleContext";
import { useUserContext } from "../../../../context/UserContext";
import { User } from "../../types/User";
import RegisterUserForm from "./UserForm";
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
  const [preview, setPreview] = useState<string | null>(null);
  // const [selectedFile, setSelectedFile] = useState<File | null>(null);

  //   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = event.target.files?.[0];
  //   if (file) {
  //     setSelectedFile(file);
  //     formik.setFieldValue("image",file)
  // };

  useEffect(() => {
    if (params.userId) {
      const userFound = users.find((user) => user.id === params.userId);
      setUserToUpdate(userFound);
    }
  }, [users]);

  const handleRegisterUser = async (userData: any) => {
    console.log("userData::: ", userData);
    // console.log('userData.image::: ', userData.image);
    try {
      if (params.userId) {
        await updateUser(userData, params.userId);
      } else {
        await registerUser(userData);
      }

      showToast(
        "success",
        params.userId
          ? "Usuario actualizado con exito"
          : "Usuario creado con exito"
      );
      navigate("/home/gestion-de-usuarios/usuarios");
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
            xs: "4.5rem 0 0 0",
            sm: "7.5rem 0 1rem 0",
          },
          overflowY: "auto",
          // paddingTop:"20rem"
        }}
      >
        <RegisterUserForm
          roles={roles}
          loading={loading}
          onSubmit={handleRegisterUser}
          error={error || roleError}
          userToUpdate={userToUpdate}
          preview={preview}
          setPreview={setPreview}
        />
      </Box>
    </Box>
  );
};
export default RegisterContainer;
