import { Box, CssBaseline, Typography } from "@mui/material";

const UserManagementPage: React.FC = () => {
  return (
    // <>
    //   <CssBaseline />
    <Box
      sx={{
        flexGrow: 1,
        // height:"100%",
        height: {
          xs: "calc(100vh - 3.5rem)",
          sm: "calc(100vh - 4rem)",
        },
        p: "6px",
        display: "flex",
      }}
    >
      <Box
        sx={{
          height:"100%",
          flexGrow: 1,
          background: "rgba(0,0,0,0.2)",
          borderRadius: "16px",
          boxShadow: "0 4px 30px rgba(0,0,0,0.1)",
          backdropFilter: "blur(5px)",
          border: "1px solid rgba(0,0,0,0.3)",
        }}
      >
        User Management
      </Box>
      {/* <Typography variant="h4" component="h2"> */}
      {/* </Typography> */}
    </Box>
    // </>
  );
};
export default UserManagementPage;
