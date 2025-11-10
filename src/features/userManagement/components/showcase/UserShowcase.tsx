import { Box, Button, Fade, Typography } from "@mui/material";
import { User } from "../../types/User";
import BreadCrumbsContainer from "../../../breadCrumbs/BreadCrumbsContainer";
import UserCardContainer from "./userCard/UserCardContainer";
import TextType from "../../../../TextAnimations/TextType/TextType";

interface UserShowcaseProps {
  handleClick: () => void;
  users: User[];
}

const UserShowcase: React.FC<UserShowcaseProps> = ({ handleClick, users }) => {
  if (!users) {
    return <p>No hay usuarios</p>;
  }
  return (
    <Fade in={true} timeout={1000}>
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          // background: "rgba(78, 140, 179, 0.4)",
          // borderRadius: "16px",
          // boxShadow: "0 4px 10px rgba(0, 0, 0, 0.4)",
          // backdropFilter: "blur(10px)",
          // WebkitBackdropFilter: "blur(10px)",
          // border: "1px solid rgba(78, 140, 179, 0.5)",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            height: "5rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            p: "0 1.5rem 0 1.5rem",
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
              text={"Usuarios"}
              typingSpeed={50}
              pauseDuration={1000}
              showCursor={true}
              cursorCharacter="_"
              deletingSpeed={50}
            />
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
          </Box>
        </Typography>
        <Box
          sx={{
            height: "calc(100% - 5rem)",
            display: "flex",
            p: "20px",
          }}
        >
          <Box
            sx={{
              // pt: "30px",
              p:"20px",
              flexGrow: 1,
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              overflowY: "auto",
              gap: "1rem",
              alignContent: "flex-start",
              // background: "rgba(255,255,255,0.2)",
              // background: "rgba(13, 24, 31, 0.4)",
              // background: "rgba(217, 166, 121, 0.4)",
              background: "rgba(89, 69, 57, 0.4)",
              borderRadius: "10px",
              // backdropFilter: "blur(10px)",
              boxShadow: "0 4px 10px rgba(0,0,0,0.4)",
              border: "1px solid rgba(89, 69, 57, 0.5)",
            }}
          >
            {users && users.length > 0 ? (
              users.map((user) => (
                <UserCardContainer key={user.id} user={user} />
              ))
            ) : (
              <p>Cargando usuarios</p>
            )}
          </Box>
        </Box>
      </Box>
    </Fade>
  );
};
export default UserShowcase;
