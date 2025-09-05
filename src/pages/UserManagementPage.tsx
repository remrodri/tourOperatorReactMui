import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import { UserProvider } from "../features/userManagement/context/UserContext";
import FadeContent from "../Animations/FadeContent/FadeContent";
import { RoleProvider } from "../features/Role/context/RoleContext";

const UserManagementPage: React.FC = () => {
  return (
    // <>
    //   <CssBaseline />
    <FadeContent
      // blur={true}
      duration={200}
      easing="ease-out"
      initialOpacity={0.6}
      className="w-full"
    >
      <Box
        sx={{
          // flexGrow: 1,
          display: "flex",
          // height:"calc(100% - 5.5rem)",
          // height: {
          //   xs: "calc(100vh - 3.5rem)",
          //   sm: "calc(100vh - 4rem)",
          // },
          height: "calc(100vh - 5.5rem)",
          // width: "calc(100vw - 83px)",
          p: "10px",
          // background: "rgba(78, 140, 179, 0.4)",
        }}
      >
        <Box
          sx={{
            // height: "42.4rem",
            flexGrow: 1,
            display: "flex",
            // height: "100%",
            // width: "calc(100vw - 83px)",
            // background: "rgba(0,0,0,0.6)",
            // background: "rgba(78, 140, 179, 0.4)",
            // background: "rgba(4, 135, 217, 0.4)",
            // backgroundColor: "rgba(78, 140, 179, 0.6)",
            // backdropFilter: "blur(10px)",
            // backdropFilter: "blur(15px)",
            // WebkitBackdropFilter: "blur(15px)",
            borderRadius: "16px",
            // backdropFilter: "blur(10px)",
            // boxShadow: "0 4px 10px rgba(0,0,0,1)",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.4)",
            // backdropFilter: "blur(1px)",
            border: "1px solid rgba(78, 140, 179, 0.5)",
            // WebkitBackdropFilter: "blur(10px)",
            // overflowY: "auto",
            backgroundColor: "rgba(78, 140, 179, 0.6)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            // isolation: "isolate",
          }}
        >
          <UserProvider>
              <Outlet />
          </UserProvider>
        </Box>
        {/* <Typography variant="h4" component="h2"> */}
        {/* </Typography> */}
      </Box>
    </FadeContent>
    // </>
  );
};
export default UserManagementPage;
