import { Box, Typography } from "@mui/material";
import LoginForm from "../features/auth/LoginForm";

const LoginPage: React.FC = () => {
  return (
    <Box
      sx={{
        height: "100dvh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box>
        <Typography>LoginPage</Typography>
        <LoginForm/>
      </Box>
    </Box>
  );
};

export default LoginPage;
