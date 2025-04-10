import { Avatar, Box, Card, CardHeader, Typography } from "@mui/material";
import { User } from "../../../types/User";
import { Role } from "../../../types/Role";
import { useEffect, useState } from "react";
import { ContactPhone } from "@mui/icons-material";
import UserCardMenu from "./UserCardMenu";

interface UserCardProps {
  user: User;
  userRole: Role;
  roles: Role[];
  handleMenuOption: (option: string) => void;
}
const UserCard: React.FC<UserCardProps> = ({
  user,
  userRole,
  roles,
  handleMenuOption,
}) => {
  const [roleColor, setRoleColor] = useState("#cccccc");
  const [roleChar, setRoleChar] = useState("SR");

  const shortenUserName = (name: string) => {
    if (name.length < 15) {
      return name;
    }
    const shortenName = name.substring(0, 12);
    return `${shortenName}...`;
  };

  useEffect(() => {
    if (roles && roles.length > 0) {
      if (user.role === roles[0].id) {
        setRoleColor("#e06860");
        setRoleChar("A");
      }
      if (user.role === roles[1].id) {
        setRoleColor("#7abe74");
        setRoleChar("O");
      }
      if (user.role === roles[2].id) {
        setRoleColor("#61afef");
        setRoleChar("G");
      }
    }
  }, [roles, user.role, userRole]);

  return (
    <Card
      sx={{
        width: 300,
        // height:126,
        backgroundColor: "rgba(10, 10, 10, 0.7)",
        borderRadius: "10px",
        borderTopLeftRadius: "4rem",
        borderBottomLeftRadius: "4rem",
        boxShadow: "0 4px 10px rgba(10,10,10,0.6)",
        border: "1px solid rgb(10,10,10)",
        ".MuiCardHeader-root": {
          p: "10px",
        },
        ".MuiCardContent-root": {
          p: "0 15px 10px 0",
          display: "flex",
          justifyContent: "end",
        },
      }}
    >
      <CardHeader
        avatar={
          <Avatar
            sx={{ height: 100, width: 100, border: `4px solid ${roleColor}` }}
            aria-label="user"
            src={user.imageUrl}
            // variant="rounded"
          >
            {roleChar}
          </Avatar>
        }
        action={<UserCardMenu onOptionSelect={handleMenuOption} />}
        title={`${userRole.name}`}
        subheader={
          <Box>
            {/* <Typography sx={{fontSize:"16px"}} >{`${user.firstName} ${user.lastName}`}</Typography> */}
            <Typography sx={{ fontSize: "16px" }}>
              {shortenUserName(`${user.firstName} ${user.lastName}`)}
            </Typography>
            <Typography sx={{ pt: "11px", fontSize: "0.9rem", color: "white" }}>
              <ContactPhone />
              <br />
              {user.phone}
            </Typography>
          </Box>
        }
      />
      {/* card{userRole.name} */}
    </Card>
  );
};
export default UserCard;
