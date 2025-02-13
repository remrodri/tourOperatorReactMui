import { Box, Button, Typography } from "@mui/material";
import BreadCrumbsContainer from "../../breadCrumbs/BreadCrumbsContainer";
import { CancellationPolicy } from "../types/CancellationPolicy";
import CancellationPolicyCardContainer from "./card/CancellationPolicyCardContainer";

interface CancellaionPolicyShowcaseProps {
  handleClick: () => void;
  cancellationPolicy: CancellationPolicy[];
}

const CancellaionPolicyShowcase: React.FC<CancellaionPolicyShowcaseProps> = ({
  handleClick,
  cancellationPolicy,
}) => {
  // console.log('cancellationPolicy::: ', cancellationPolicy);
  return (
    <Box>
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
      <Box
        sx={{
          height: "90%",
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          overflowY: "auto",
          gap: "1rem",
          pt: "2rem",
        }}
      >
        {cancellationPolicy && cancellationPolicy.length > 0 ? (
          cancellationPolicy.map((cancellationPolicy) => (
            <CancellationPolicyCardContainer
              key={cancellationPolicy.id}
              cancellationPolicy={cancellationPolicy}
            />
          ))
        ) : (
          <p>No hay Cancellation Policy</p>
        )}
      </Box>
    </Box>
  );
};
export default CancellaionPolicyShowcase;
