import { Box } from "@mui/material";
import { Outlet, useOutletContext } from "react-router-dom";
import { TouristProvider } from "../features/tourist/context/TouristContext";

// interface OutletContext {
//   backgroundImg: string;
// }

// interface OutletContext {
//   backgroundImg: string;
// }


const BookingPage: React.FC = () => {
  // console.log("backgroundImg::: ", backgroundImg);
  // const { backgroundImg } = useOutletContext<OutletContext>();
  return (
    // <FadeContent
    //   // blur={true}
    //   duration={200}
    //   easing="ease-out"
    //   initialOpacity={0.6}
    //   className="w-full"
    // >
    <Box
      sx={{
        // backgroundImage: `url(${backgroundImg})`,
        // backgroundSize: "cover",
        // backgroundPosition: "center",
        display: "flex",
        // flexGrow: 1,
        height: "100%",
        // width: "calc(100vw - 83px)",
        p: "10px",
        // background: "rgba(86, 101, 115, 0.4)",
        // flexGrow: 1,
        // flexWrap: "wrap",
        // height: "100vh",
        width: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexGrow: 1,
          background: "rgba(64, 89, 66, 0.6)",
          borderRadius: "16px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.4)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(64, 89, 66, 0.7)",
          height: "100%",
        }}
      >
        <TouristProvider>
          <Outlet />
        </TouristProvider>
      </Box>
    </Box>
    // </FadeContent>
  );
};
export default BookingPage;
