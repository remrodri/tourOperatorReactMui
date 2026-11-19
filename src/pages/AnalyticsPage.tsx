import { Alert, Box, CircularProgress, Typography } from "@mui/material";
import { jwtDecode } from "jwt-decode";
import { useOutletContext } from "react-router-dom";
import FadeContent from "../Animations/FadeContent/FadeContent";
import AnalyticsFoundation from "../features/analytics/components/AnalyticsFoundation";
import { AnalyticsProvider } from "../features/analytics/context/AnalyticsContext";
import { canAccessAnalytics } from "../features/analytics/utils/analyticsAccess";
import { useRoleContext } from "../features/Role/context/RoleContext";
import { UserType } from "../features/userManagement/types/UserType";
import { AppBarStyle } from "./mainLayout/style/MainStyles";
import { TokenService } from "../utils/tokenService";

const AnalyticsPage: React.FC = () => {
  const style: AppBarStyle = useOutletContext();
  const { getRoleById, loading } = useRoleContext();
  const token = TokenService.getToken();
  const user: UserType | null = token ? jwtDecode<UserType>(token) : null;
  const roleName = user ? getRoleById(user.role).name : "Sin Rol";

  if (loading) {
    return (
      <Box
        sx={{
          width: "100%",
          height: "calc(100dvh - 5.4rem)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
        }}
      >
        <CircularProgress size={28} />
        <Typography>Validando acceso...</Typography>
      </Box>
    );
  }

  if (!canAccessAnalytics(roleName)) {
    return (
      <FadeContent
        duration={200}
        easing="ease-out"
        initialOpacity={0.6}
        className="w-full"
      >
        <Box sx={{ p: "10px", width: "100%" }}>
          <Box
            sx={{
              p: 3,
              background: style.background,
              borderRadius: style.borderRadius,
              boxShadow: style.boxShadow,
              backdropFilter: style.backdropFilter,
              border: style.border,
            }}
          >
            <Alert severity="warning">
              No tienes permisos para acceder al módulo de analítica. Este
              módulo está disponible para administradores y operadores de
              ventas.
            </Alert>
          </Box>
        </Box>
      </FadeContent>
    );
  }

  return (
    <FadeContent
      duration={200}
      easing="ease-out"
      initialOpacity={0.6}
      className="w-full"
    >
      <Box sx={{ p: "10px", width: "100%" }}>
        <Box
          sx={{
            background: style.background,
            borderRadius: style.borderRadius,
            boxShadow: style.boxShadow,
            backdropFilter: style.backdropFilter,
            border: style.border,
          }}
        >
          <AnalyticsProvider>
            <AnalyticsFoundation />
          </AnalyticsProvider>
        </Box>
      </Box>
    </FadeContent>
  );
};

export default AnalyticsPage;
