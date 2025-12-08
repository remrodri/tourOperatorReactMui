import { Box } from "@mui/material";
import FadeContent from "../Animations/FadeContent/FadeContent";
import { AppBarStyle } from "./mainLayout/style/MainStyles";
import { Outlet, useOutletContext } from "react-router-dom";
import { TouristDestinationProvider } from "../features/touristDestination/context/TouristDestinationContext";

const TouristDestinationPage: React.FC = () => {
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
          p: "10px",
        }}
      >
        <Box
          sx={{
            background: style.background,
            borderRadius: style.borderRadius,
            boxShadow: style.boxShadow,
            backdropFilter: style.backdropFilter,
            border: style.border,
          }}
        >
          <TouristDestinationProvider>
            <Outlet />
          </TouristDestinationProvider>
        </Box>
      </Box>
    </FadeContent>
  );
};
export default TouristDestinationPage;
