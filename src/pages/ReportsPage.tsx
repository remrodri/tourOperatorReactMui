import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import { DashboardProvider } from "../features/reports/context/DashboardContext";

const ReportsPage: React.FC = () => {
    return (
        <Box
            sx={{
                display: "flex",
                height: "100%",
                p: "10px",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexGrow: 1,
                    background: "rgba(140, 109, 81, 0.4)",
                    borderRadius: "16px",
                    boxShadow: "0 4px 10px rgba(0,0,0,0.4)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(140, 109, 81, 0.5)",
                }}
            >
                <DashboardProvider>
                <Outlet/>
                </DashboardProvider>
            </Box>
        </Box>
    );
};
export default ReportsPage;
