import GuideDrawer from "./GuideDrawer";
import ExploreIcon from '@mui/icons-material/Explore';
import PlaceIcon from '@mui/icons-material/Place';
import PeopleIcon from '@mui/icons-material/People';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { jwtDecode } from "jwt-decode";

interface GuideType {
    firstName: string;
    lastName: string;
}

const GuideDrawerContainer: React.FC = () => {

    const drawerItems = [
        { text: "Salidas", icon: CalendarMonthIcon, path: "fechas-asignadas" },
        { text: "Destino", icon: PlaceIcon, path: "destino-turistico" },
        { text: "Paquete", icon: ExploreIcon, path: "paquete-turistico" },
        { text: "Lista de turistas", icon: PeopleIcon, path: "turistas" },
        { text: "Itinerario", icon: PendingActionsIcon, path: "itinerario" },
    ];

    const token = localStorage.getItem("token");
    const user = jwtDecode<GuideType>(token || "");
    console.log('user::: ', user);
    // const guideName = user.firstName + " " + user.lastName;
    const guideName = user.firstName;
    // const guideName = toString(user.firstName + " " + user.lastName);

    return (
        <GuideDrawer drawerItems={drawerItems} guideName={guideName} />
    )
}
export default GuideDrawerContainer
