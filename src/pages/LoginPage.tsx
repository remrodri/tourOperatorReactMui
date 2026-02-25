import { Box} from "@mui/material";
import loginBackground from "../assets/images/login1.webp";
import LoginShowcase from "../features/auth/components/showcase/LoginShowcase";
import FadeContent from "../Animations/FadeContent/FadeContent";
import { RoleProvider } from "../features/Role/context/RoleContext";

const LoginPage: React.FC = () => {


  return (
    <FadeContent
      // blur={true}
      duration={200}
      easing="ease-out"
      initialOpacity={0.6}
    >
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
        {/* <LoginFormContainer /> */}
        <RoleProvider>
          <LoginShowcase />
        </RoleProvider>
      </Box>
    </FadeContent>
  );
};

export default LoginPage;
