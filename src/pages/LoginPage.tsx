import { Box } from "@mui/material";
import loginBackground from "../assets/images/login.webp";
import LoginFormContainer from "../features/auth/LoginFormContainer";

const LoginPage: React.FC = () => {
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
      <LoginFormContainer />
    </Box>
  );
};

export default LoginPage;
