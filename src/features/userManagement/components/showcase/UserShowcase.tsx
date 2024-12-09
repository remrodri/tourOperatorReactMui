import { Box, Typography } from "@mui/material";
import { useUserContext } from "../../context/UserContext";
import UserCard from "./userCard/UserCard";
import { useRoleContext } from "../../context/RoleContext";

const UserShowcase: React.FC = () => {
  const { roles } = useRoleContext();
  const { users, loading, error } = useUserContext();
  if (loading) return <p>Cargando usuarios...</p>;
  if (error) return <p>{error}</p>;

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
        height: "100%",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          height: "10%",
          display: "flex",
          alignItems: "center",
          p: "0 0 0 1.5rem",
        }}
      >
        Todos los usuarios
      </Typography>
      <Box
        sx={{
          height: "90%",
          display: "flex",
          flexWrap: "wrap",
          overflowY: "auto",
          gap: "0.4rem",
          justifyContent: "center",
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
  );
};
export default UserShowcase;
