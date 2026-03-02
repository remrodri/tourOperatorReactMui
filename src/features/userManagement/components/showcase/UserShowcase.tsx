import { Box, Button, Grow, Typography } from "@mui/material";
import { User } from "../../types/UserType";
import UserCardContainer from "./userCard/UserCardContainer";
import TextType from "../../../../TextAnimations/TextType/TextType";

interface UserShowcaseProps {
  handleClick: () => void;
  users: User[];
  role: string;
}

const UserShowcase: React.FC<UserShowcaseProps> = ({
  handleClick,
  users,
  role,
}) => {
  // if (!users) {
  //   return <p>No hay usuarios</p>;
  // }
  return (
    // <Fade in={true} timeout={1000}>
    <Box
      sx={
        {
          // flexGrow: 1,
          // display: "flex",
          // flexDirection: "column",
          // background: "rgba(78, 140, 179, 0.4)",
          // borderRadius: "16px",
          // boxShadow: "0 4px 10px rgba(0, 0, 0, 0.4)",
          // backdropFilter: "blur(10px)",
          // WebkitBackdropFilter: "blur(10px)",
          // border: "1px solid rgba(78, 140, 179, 0.5)",
        }
      }
    >
      <Typography
        component="div"
        variant="h4"
        sx={{
          // height: "5rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          p: "1rem 1.5rem 0 1.5rem",
        }}
      >
        {/* <BreadCrumbsContainer /> */}
        <Box
          sx={{
            display: "flex",
            gap: "2rem",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <TextType
            text={"Personal"}
            typingSpeed={50}
            pauseDuration={1000}
            showCursor={true}
            cursorCharacter="_"
            deletingSpeed={50}
          />
          {role === "690cbf7c64756dcc541d8a19" && (
            <Button
              variant="contained"
              sx={{
                height: "2rem",
                width: "12rem",
              }}
              onClick={handleClick}
            >
              nuevo
            </Button>
          )}
          {/* <Button
              variant="contained"
              sx={{
                height: "2rem",
                width: "12rem",
              }}
              onClick={handleClick}
            >
              nuevo
            </Button> */}
        </Box>
      </Typography>
      <Box
        sx={{
          // height: "calc(100% - 5rem)",
          display: "flex",
          p: "20px",
        }}
      >
        <Box
          sx={{
            // pt: "30px",
            p: "20px",
            // flexGrow: 1,
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            overflowY: "auto",
            gap: "1rem",
            alignContent: "flex-start",
            // background: "rgba(255,255,255,0.2)",
            // background: "rgba(13, 24, 31, 0.4)",
            // background: "rgba(217, 166, 121, 0.4)",
            background: "rgba(0, 0, 0, 0.44)",
            borderRadius: "10px",
            // backdropFilter: "blur(10px)",
            boxShadow: "0 4px 10px rgba(0,0,0,0.4)",
            border: "1px solid rgba(0, 0, 0, 0.5)",
            height: "calc(100dvh - 12.8rem)",
            width: "100%",
          }}
        >
          {users.map((user, index) => (
            // <UserCardContainer key={user.id} user={user} role={role} />
            <Grow
              in={true} // o una condición si quieres mostrar/ocultar
              style={{ transformOrigin: "0 0 0" }}
              timeout={500 + index * 300} // cada card entra con más delay
              key={user.id}
            >
              <Box>
                <UserCardContainer key={user.id} user={user} role={role} />
              </Box>
            </Grow>
          ))}
        </Box>
      </Box>
    </Box>
    // </Fade>
  );
};
export default UserShowcase;
