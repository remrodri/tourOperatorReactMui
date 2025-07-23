import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import { CancellationPolicy } from "../../types/CancellationPolicy";
import CancellationPolicyCardMenu from "./CancellationPolicyCardMenu";

interface CancellationPolicyCardProps {
  cancellationPolicy: CancellationPolicy;
  handleOptionMenuCard: (option: string) => void;
}

const CancellationPolicyCard: React.FC<CancellationPolicyCardProps> = ({
  cancellationPolicy,
  handleOptionMenuCard,
}) => {
  return (
    <Card
      sx={{
        width: 300,
        borderRadius: "10px",
        background: "rgba(10, 10, 10, 0.52)",
        boxShadow: "0 4px 10px rgba(10, 10, 10, 0.6)",
        // backdropFilter: "blur(10px)",
        border: "1px solid rgba(10, 10, 10, 0.6)",
      }}
    >
      <CardHeader
        title={cancellationPolicy.name}
        // subheader={cancellationPolicy.description}
        action={
          <CancellationPolicyCardMenu onOptionSelect={handleOptionMenuCard} />
        }
      />
      <CardContent>
        <Typography>{cancellationPolicy.description}</Typography>
      </CardContent>
    </Card>
  );
};
export default CancellationPolicyCard;
