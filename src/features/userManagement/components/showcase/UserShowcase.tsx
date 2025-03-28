import { Box, Button, Typography } from "@mui/material";
import { useUserContext } from "../../../../context/UserContext";
import UserCard from "./userCard/UserCard";
import { useRoleContext } from "../../../../context/RoleContext";
import UserShowcaseBreadcrumbs from "./userCard/UserShowcaseBreadcrumbs";
import BreadCrumbsContainer from "../../../breadCrumbs/BreadCrumbsContainer";
import { useState } from "react";
import UserFormContainer from "../userForm/UserFormContainer";
// import UserShowcaseBreadcrumbs from "./userCard/userShowcaseBreadcrumbs";

const UserShowcase: React.FC = () => {
  const { roles } = useRoleContext();
  const { users, loading, error } = useUserContext();
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(!open);
  };
  // console.log('users::: ', users);
  if (loading) return <p>Cargando usuarios...</p>;
  // if (error) return <p>{error}</p>;
  // console.log('users::: ', users);

  // console.log('roles::: ', roles);
  // if (!Array.isArray(users)) {
  //   return <p>Hubo un error al obtener los usuarios</p>;
  // }

  // useEffect(() => {
  //   console.log(users)
  // },[users])

  return (
    <Box
      sx={{
        // flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        // height: {
        //   sm: "",
        //   md: "77.8dvh",
        //   lg: "81.7dvh",
        //   xl: "",
        // },
        // height: "38.3rem",
        // height:"100%"
        // flexGrow: 1,
      }}
    >
      <Typography
        variant="h4"
        sx={{
          height: "5rem",
          // height: "10%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          // alignItems: "center",
          p: "0 0 0 1.5rem",
        }}
      >
        {/* <UserShowcaseBreadcrumbs /> */}
        <BreadCrumbsContainer />
        <Box
          sx={{
            display: "flex",
            gap: "2rem",
            alignItems: "center",
          }}
        >
          Todos los usuarios
          <Button
            variant="contained"
            sx={{ height: "2rem", width: "12rem" }}
            onClick={handleClick}
          >
            nuevo
          </Button>
        </Box>
      </Typography>
      <Box
        sx={{
          // height: "calc(100% - 5rem)",
          // flexGrow: 1,
          height: "calc(100% - 5rem)",
          display: "flex",
          p: "20px",
        }}
      >
        <Box
          sx={{
            pt: "30px",
            // flexGrow: 1,
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            overflowY: "auto",
            gap: "1rem",
            alignContent: "flex-start",
            background: "rgba(255, 255, 255, 0.2)",
            borderRadius: "10px",
            boxShadow: "0 4px 10px rgba(255, 255, 255,0.2)",
            // backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            // height: "20dvh",
            // height: "calc (100dvh - 50rem)",
            // height: "100%",
            // position:"relative"
            // height: {
            //   xs: "calc(100vh - 3.5rem)",
            //   sm: "calc(100vh - 5rem)",
            // },
            // height: {
            //   sm: "",
            //   md: "71dvh",
            //   // lg: "79dvh",
            //   // xl: "",
            // },
          }}
        >
          {users && users.length > 0 ? (
            users.map((user) => (
              <UserCard key={user.id} user={user} roles={roles} />
            ))
          ) : (
            <p>Hubo un error al obtener los users</p>
          )}
        </Box>
      </Box>
      {open && <UserFormContainer open={open} handleClick={handleClick} />}
    </Box>
  );
};
export default UserShowcase;
