import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import { CancellationPolicy } from "../../types/CancellationPolicy";
import CancellationPolicyCardMenu from "./CancellationPolicyCardMenu";

interface CancellationPolicyCardProps {
  cancellationPolicy: CancellationPolicy;
  handleOptionMenuCard:(option:string)=>void
}

const CancellationPolicyCard: React.FC<CancellationPolicyCardProps> = ({
  cancellationPolicy,
  handleOptionMenuCard
}) => {
  return (
    <Card sx={{ width: 300,}}>
      <CardHeader
        title={cancellationPolicy.name}
        // subheader={cancellationPolicy.description}
        action={
          <CancellationPolicyCardMenu 
            onOptionSelect={handleOptionMenuCard}
          />
        }
      />
      <CardContent>
        <Typography>
          {cancellationPolicy.description}
        </Typography>
      </CardContent>
    </Card>
  );
};
export default CancellationPolicyCard;
