import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import { GuideProvider } from "../../features/guide/context/GuideContext";

interface Props {
  backgroundImg: string;
}

const GuidePage: React.FC<Props> = ({ backgroundImg }) => {
  return (
    <Box
      sx={{
        backgroundImage: `url(${backgroundImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "100dvh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <GuideProvider>
        <Outlet />
      </GuideProvider>
    </Box>
  );
};

export default GuidePage;
