import { Box, Typography } from "@mui/material";
import LoginForm from "../features/auth/LoginForm";
import loginBackground from "../assets/images/login.webp";
import LoginFormContainer from "../features/auth/LoginFormContainer";
import { useRoleContext } from "../features/Role/context/RoleContext";

const LoginPage: React.FC = () => {
  // const { roles } = useRoleContext();
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: `url(${loginBackground})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* <Box
        sx={{
          background: "rgba(255,255,255,0.2)",
          backdropFilter: "blur(5px)",

        }}
      > */}
      {/* <Typography>Bienvenido al sistema</Typography> */}
      <LoginFormContainer />
    </Box>
    // </Box>
  );
};

export default LoginPage;
