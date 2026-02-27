import { Box } from "@mui/material";
import { Outlet, useOutletContext } from "react-router-dom";
import { UserProvider } from "../features/userManagement/context/UserContext";
import { AppBarStyle } from "./mainLayout/style/MainStyles";
import FadeContent from "../Animations/FadeContent/FadeContent";

const UserManagementPage: React.FC = () => {
  const style: AppBarStyle = useOutletContext();
  return (
    <FadeContent
      duration={200}
      easing="ease-out"
      initialOpacity={0.6}
      className="w-full"
    >
      <Box
        sx={{
          // display: "flex",
          p: "10px",
        }}
      >
        <Box
          sx={{
            // flexGrow: 1,
            background: style.background,
            borderRadius: style.borderRadius,
            boxShadow: style.boxShadow,
            backdropFilter: style.backdropFilter,
            border: style.border,
            // display: "flex",
          }}
        >
          <UserProvider>
            <Outlet />
          </UserProvider>
        </Box>
      </Box>
    </FadeContent>
  );
};
export default UserManagementPage;
