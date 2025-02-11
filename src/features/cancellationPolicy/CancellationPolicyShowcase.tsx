import { Box, Button, Typography } from "@mui/material";
import BreadCrumbsContainer from "../breadCrumbs/BreadCrumbsContainer";

interface CancellaionPolicyShowcaseProps {
  handleClick: () => void;
}

const CancellaionPolicyShowcase: React.FC<CancellaionPolicyShowcaseProps> = ({
  handleClick,
}) => {
  return (
    <Typography
      variant="h4"
      sx={{
        height: "10%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        p: "0 0 0 1.5rem",
      }}
    >
      <BreadCrumbsContainer />
      <Box
        sx={{
          display: "flex",
          gap: "2rem",
          alignItems: "center",
        }}
      >
        Condiciones de cancelacion
        <Button
          variant="contained"
          sx={{ height: "2rem", width: "12rem" }}
          onClick={handleClick}
        >
          NUEVO
        </Button>
      </Box>
    </Typography>
  );
};
export default CancellaionPolicyShowcase;
