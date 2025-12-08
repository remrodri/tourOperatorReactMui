import { Outlet, useOutletContext } from "react-router-dom";
import { AppBarStyle } from "./mainLayout/style/MainStyles";
import { Box } from "@mui/material";
import FadeContent from "../Animations/FadeContent/FadeContent";
import { TourTypeProvider } from "../features/tourType/context/TourTypeContext";

const TourTypePage: React.FC = () => {
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
          <TourTypeProvider>
            <Outlet />
          </TourTypeProvider>
        </Box>
      </Box>
    </FadeContent>
  );
};
export default TourTypePage;
