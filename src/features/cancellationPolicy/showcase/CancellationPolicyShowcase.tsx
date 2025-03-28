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
    <Box
      sx={{
        flexGrow:1,
        display: "flex",
        flexDirection:"column"
      }}
    >
      <Typography
        variant="h4"
        sx={{
          height: "5rem",
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
          height: "calc(100% - 5rem)",
          // pt: "2rem",
          display: "flex",
          p: "20px",
        }}
      >
        <Box
          sx={{
            pt: "30px",
            flexGrow: 1,
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            overflowY: "auto",
            gap: "1rem",
            alignContent: "flex-start",
            background: "rgba(255, 255, 255, 0.2)",
            borderRadius: "10px",
            boxShadow: "0 4px 10px rgba(255, 255, 255,0.2)",
            // backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            // width:"100%"
          }}
        >
          {cancellationPolicy && cancellationPolicy.length > 0 ? (
            cancellationPolicy.map((cancellationPolicy) => (
              <CancellationPolicyCardContainer
                key={cancellationPolicy.id}
                cancellationPolicy={cancellationPolicy}
                // handleClick={handleClick}
              />
            ))
          ) : (
            <p>No hay Cancellation Policy</p>
          )}
        </Box>
      </Box>
    </Box>
  );
};
export default CancellaionPolicyShowcase;
