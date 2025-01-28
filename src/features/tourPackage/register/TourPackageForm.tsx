import { Box } from "@mui/material";

interface TourPackageFormProps {
  onSubmit: (values: any) => void;
}

const TourPackageForm: React.FC<TourPackageFormProps> = () => {
  return (
    <Box
      sx={{
        display: "flex",
      }}
    >
      <h1>Register Tour Package</h1>
    </Box>
  );
};
export default TourPackageForm;
