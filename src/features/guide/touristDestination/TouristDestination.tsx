import { Box } from "@mui/material";

export interface TouristDestinationProps {
  loading: boolean;
}

const TouristDestination: React.FC<TouristDestinationProps> = ({ loading }) => {
  if (loading) {
    return (
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          background: "rgba(0,0,0,0.6)",
          borderRadius: "16px",
          boxShadow: "0 4px 10px rgba(0,0,0,1)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(0,0,0,0.4)",
          padding: "10px",
          gap: "10px",
        }}
      >
        <h1>Cargando...</h1>
      </Box>
    );
  }
  return (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        background: "rgba(0,0,0,0.6)",
        borderRadius: "16px",
        boxShadow: "0 4px 10px rgba(0,0,0,1)",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(0,0,0,0.4)",
        padding: "10px",
        gap: "10px",
      }}
    >
      <h1>TouristDestination</h1>
    </Box>
  );
};
export default TouristDestination;
