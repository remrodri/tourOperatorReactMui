import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import { UserProvider } from "../features/userManagement/context/UserContext";

const UserManagementPage: React.FC = () => {
  return (
    // <>
    //   <CssBaseline />
    <Box
      sx={{
        // flexGrow: 1,
        display: "flex",
        // height:"calc(100% - 5.5rem)",
        // height: {
        //   xs: "calc(100vh - 3.5rem)",
        //   sm: "calc(100vh - 4rem)",
        // },
        height: "100%",
        p: "10px",
      }}
    >
      <Box
        sx={{
          // height: "42.4rem",
          flexGrow: 1,
          display: "flex",
          // height:"100%",
          // background: "rgba(0,0,0,0.6)",
          background: "rgba(78, 140, 179, 0.4)",
          borderRadius: "16px",
          // boxShadow: "0 4px 10px rgba(0,0,0,1)",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.4)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(78, 140, 179, 0.5)",
          // overflowY: "auto",
        }}
      >
        <UserProvider>
          <Outlet />
        </UserProvider>
      </Box>
      {/* <Typography variant="h4" component="h2"> */}
      {/* </Typography> */}
    </Box>
    // </>
  );
};
export default UserManagementPage;
