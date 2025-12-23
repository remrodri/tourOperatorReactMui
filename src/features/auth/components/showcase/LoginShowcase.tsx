import { Box } from "@mui/material";
import Gallery from "../gallery/Gallery";
import LoginFormContainer from "../login/LoginFormContainer";

const LoginShowcase: React.FC = () => {
  return (
    <Box
      sx={{
        flexGrow: 1,
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "1px solid rgba(68, 68, 68,0.5)",
          height: "40rem",
          width: {md:"60rem"},
          boxShadow: "0 4px 30px rgba(17, 17, 17, 0.8)",
          borderRadius: "15px",
          // background: "rgba(0,0,0,0.5)",
          backdropFilter: "blur(5px)",
          p: "1rem",
        }}
      >
        <Gallery />
        <LoginFormContainer />
      </Box>
    </Box>
  );
};
export default LoginShowcase;
