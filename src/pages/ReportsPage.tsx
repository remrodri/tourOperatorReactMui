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
                    background: "rgba(0,0,0,0.6)",
                    borderRadius: "16px",
                    boxShadow: "0 4px 10px rgba(0,0,0,1)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(0,0,0,0.4)",
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
