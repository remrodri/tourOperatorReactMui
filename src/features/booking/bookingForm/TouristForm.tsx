import { Box, TextField } from "@mui/material";
import { TouristType } from "../types/TouristType";

interface TouristFormProps {
  tourist: Partial<TouristType>;
  onChange: (field: string, value: any) => void;
  errors?: any;
  touched?: any;
}

const TouristForm: React.FC<TouristFormProps> = ({
  tourist,
  onChange,
  errors,
  touched,
}) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Box sx={{ display: "flex", gap: 2 }}>
        <TextField
          label="Nombre(s)"
          size="small"
          fullWidth
          value={tourist.firstName || ""}
          onChange={(e) => onChange("firstName", e.target.value)}
          error={touched?.firstName && Boolean(errors?.firstName)}
          helperText={touched?.firstName && errors?.firstName}
        />
        <TextField
          label="Apellido(s)"
          size="small"
          fullWidth
          value={tourist.lastName || ""}
          onChange={(e) => onChange("lastName", e.target.value)}
          error={touched?.lastName && Boolean(errors?.lastName)}
          helperText={touched?.lastName && errors?.lastName}
        />
      </Box>
      {/* <Box sx={{ display: "flex", gap: 2 }}></Box> */}
      {/* <Box sx={{ display: "flex", gap: 2 }}> */}
      <TextField
        label="Email"
        type="email"
        size="small"
        fullWidth
        value={tourist.email || ""}
        onChange={(e) => onChange("email", e.target.value)}
        error={touched?.email && Boolean(errors?.email)}
        helperText={touched?.email && errors?.email}
      />
      <TextField
        label="Telefono"
        size="small"
        fullWidth
        value={tourist.phone || ""}
        onChange={(e) => onChange("phone", e.target.value)}
        error={touched?.phone && Boolean(errors?.phone)}
        helperText={touched?.phone && errors?.phone}
      />
      <TextField
        label="CI"
        size="small"
        fullWidth
        value={tourist.ci || ""}
        onChange={(e) => onChange("ci", e.target.value)}
        error={touched?.ci && Boolean(errors?.ci)}
        helperText={touched?.ci && errors?.ci}
      />
      <TextField
        label="Nacionalidad"
        size="small"
        fullWidth
        value={tourist.nationality || ""}
        onChange={(e) => onChange("nationality", e.target.value)}
        error={touched?.nationality && Boolean(errors?.nationality)}
        helperText={touched?.nationality && errors?.nationality}
      />
      <TextField
        label="Fecha de nacimiento"
        size="small"
        fullWidth
        value={tourist.ci || ""}
        onChange={(e) => onChange("dateOfBirth", e.target.value)}
        error={touched?.dateOfBirth && Boolean(errors?.dateOfBirth)}
        helperText={touched?.dateOfBrith && errors?.dateOfBirth}
      />
      {/* <TextField
        label="additional information"
        size="small"
        fullWidth
        value={tourist.additionalInformation}
        onChange={(e) => onChange("additionalInformation", e.target.value)}
      /> */}
      {/* </Box> */}
    </Box>
  );
};
export default TouristForm;
