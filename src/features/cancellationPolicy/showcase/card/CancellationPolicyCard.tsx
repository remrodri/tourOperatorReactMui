import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import { CancellationPolicy } from "../../types/CancellationPolicy";
import CancellationPolicyCardMenu from "./CancellationPolicyCardMenu";
import AnimatedContent from "../../../../Animations/AnimatedContent/AnimatedContent";

interface CancellationPolicyCardProps {
  cancellationPolicy: CancellationPolicy;
  handleOptionMenuCard: (option: string) => void;
}

const CancellationPolicyCard: React.FC<CancellationPolicyCardProps> = ({
  cancellationPolicy,
  handleOptionMenuCard,
}) => {
  return (
    <AnimatedContent
      distance={100}
      direction="vertical"
      reverse={true}
      duration={1.2}
      ease="power3.out"
      initialOpacity={0.2}
      animateOpacity
      scale={1.1}
      threshold={0.2}
      delay={0.3}
    >
      <Card
        sx={{
          width: 300,
          borderRadius: "10px",
          background: "rgba(10, 10, 10, 0.52)",
          boxShadow: "0 4px 10px rgba(10, 10, 10, 0.6)",
          // backdropFilter: "blur(10px)",
          border: "1px solid rgba(10, 10, 10, 0.6)",
          height: "100%",
        }}
      >
        <CardHeader
          title={cancellationPolicy.name}
          // subheader={cancellationPolicy.description}
          action={
            <CancellationPolicyCardMenu onOptionSelect={handleOptionMenuCard} />
          }
          subheader={cancellationPolicy.description}
        />
        {/* <CardContent>
        <Typography >{cancellationPolicy.description}</Typography>
      </CardContent> */}
      </Card>
    </AnimatedContent>
  );
};
export default CancellationPolicyCard;
