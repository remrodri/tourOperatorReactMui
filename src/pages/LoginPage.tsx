import { Box, Typography } from "@mui/material";
import LoginForm from "../features/auth/LoginForm";
import loginBackgorund from "../assets/images/login.webp";
import LoginFormContainer from "../features/auth/LoginFormContainer";

const LoginPage: React.FC = () => {
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: `url(${loginBackgorund})`,
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
