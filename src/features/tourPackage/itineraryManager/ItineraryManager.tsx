// // src/features/tourPackage/tourPackageForm/itinerary/ItineraryManager.tsx
// import React from "react";
// import {
//   Box,
//   Typography,
//   Button,
//   TextField,
//   IconButton,
//   // Grid,
//   Paper,
// } from "@mui/material";
// import { Add as AddIcon, Delete as DeleteIcon } from "@mui/icons-material";
// import Grid from "@mui/material/Grid";
// import { ActivityType } from "../types/ActivityType";
// // import { v4 as uuidv4 } from "uuid"; // Para generar IDs únicos
// // import { ActivityType } from "../../types/ActivityType";

// interface ItineraryManagerProps {
//   activities: ActivityType[];
//   onChange: (activities: ActivityType[]) => void;
// }

// const ItineraryManager: React.FC<ItineraryManagerProps> = ({
//   activities,
//   onChange,
// }) => {
//   const handleAddActivity = () => {
//     const newActivity: ActivityType = {
//       id: uuidv4(), // Genera un ID único
//       description: "",
//       time: "",
//     };
//     onChange([...activities, newActivity]);
//   };

//   const handleDeleteActivity = (id: string) => {
//     onChange(activities.filter((activity) => activity.id !== id));
//   };

//   const handleActivityChange = (
//     id: string,
//     field: keyof ActivityType,
//     value: string
//   ) => {
//     const updatedActivities = activities.map((activity) =>
//       activity.id === id ? { ...activity, [field]: value } : activity
//     );
//     onChange(updatedActivities);
//   };

//   return (
//     <Box sx={{ mt: 2 }}>
//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           mb: 2,
//         }}
//       >
//         <Typography variant="h6">Itinerario de Actividades</Typography>
//         <Button
//           startIcon={<AddIcon />}
//           variant="contained"
//           color="primary"
//           onClick={handleAddActivity}
//           size="small"
//         >
//           Agregar Actividad
//         </Button>
//       </Box>

//       {activities.length === 0 ? (
//         <Typography
//           color="text.secondary"
//           sx={{ fontStyle: "italic", textAlign: "center", my: 2 }}
//         >
//           No hay actividades agregadas. Haz clic en "Agregar Actividad" para
//           comenzar.
//         </Typography>
//       ) : (
//         <Box sx={{ maxHeight: "300px", overflowY: "auto" }}>
//           {activities.map((activity, index) => (
//             <Paper
//               key={activity.id}
//               elevation={1}
//               sx={{ p: 2, mb: 2, bgcolor: "background.default" }}
//             >
//               <Grid container spacing={2} alignItems="center">
//                 <Grid item xs={12} sm={1}>
//                   <Typography variant="body2" fontWeight="bold">
//                     #{index + 1}
//                   </Typography>
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                   <TextField
//                     fullWidth
//                     label="Descripción de la actividad"
//                     size="small"
//                     value={activity.description}
//                     onChange={(e) =>
//                       handleActivityChange(
//                         activity.id,
//                         "description",
//                         e.target.value
//                       )
//                     }
//                   />
//                 </Grid>
//                 <Grid item xs={12} sm={3}>
//                   <TextField
//                     fullWidth
//                     label="Hora"
//                     size="small"
//                     type="time"
//                     value={activity.time}
//                     onChange={(e) =>
//                       handleActivityChange(activity.id, "time", e.target.value)
//                     }
//                     InputLabelProps={{
//                       shrink: true,
//                     }}
//                     inputProps={{
//                       step: 300, // 5 min
//                     }}
//                   />
//                 </Grid>
//                 <Grid
//                   item
//                   xs={12}
//                   sm={2}
//                   sx={{ display: "flex", justifyContent: "flex-end" }}
//                 >
//                   <IconButton
//                     color="error"
//                     onClick={() => handleDeleteActivity(activity.id)}
//                     size="small"
//                   >
//                     <DeleteIcon />
//                   </IconButton>
//                 </Grid>
//               </Grid>
//             </Paper>
//           ))}
//         </Box>
//       )}
//     </Box>
//   );
// };

// export default ItineraryManager;
// function uuidv4() {
//   throw new Error("Function not implemented.");
// }
