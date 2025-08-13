import GuidePerfil from "./GuidePerfil";
import { useGuideContext } from "../../context/GuideContext";
import { Box } from "@mui/material";

const GuidePerfilContainer: React.FC = () => {
  const { loading, guideInfo } = useGuideContext();
  // console.log('guideInfo::: ', guideInfo);
  return (
    <Box>
      <GuidePerfil loading={loading} guideInfo={guideInfo} />
    </Box>
  );
};

export default GuidePerfilContainer;
