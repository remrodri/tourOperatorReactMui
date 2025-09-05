import GuideDrawer from "./GuideDrawer";
import ExploreIcon from '@mui/icons-material/Explore';
import PlaceIcon from '@mui/icons-material/Place';
import PeopleIcon from '@mui/icons-material/People';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

const GuideDrawerContainer: React.FC = () => {

    const drawerItems = [
        { text: "Salidas", icon: CalendarMonthIcon, path: "fechas-asignadas" },
        { text: "Destino", icon: PlaceIcon, path: "destino-turistico" },
        { text: "Paquete", icon: ExploreIcon, path: "paquete-turistico" },
        { text: "Lista de turistas", icon: PeopleIcon, path: "turistas" },
        { text: "Itinerario", icon: PendingActionsIcon, path: "itinerario" },
    ];

    return (
        <GuideDrawer drawerItems={drawerItems}  />
    )
}
export default GuideDrawerContainer
