import React, { useEffect, useState } from "react";
import { User } from "../../../types/User";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";
import { Role } from "../../../types/Role";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import UserCardMenu from "./UserCardMenu";
import { UserModal } from "./userInfoModal/userModal";
import { useNavigate } from "react-router-dom";
import { useUserDeleteModal } from "./userInfoModal/useUserDeleteModal";

interface Props {
  user: User;
  roles: Role[];
}

const UserCard: React.FC<Props> = ({ user, roles = [] }) => {
  const navigate = useNavigate();
  const { showUserDeleteModal } = useUserDeleteModal();

  const [roleColor, setRoleColor] = useState("#cccccc");
  const [roleChar, setRoleChar] = useState("SR");
  const [roleName, setRoleName] = useState("Sin rol");

  useEffect(() => {
    if (!roles || roles.length === 0) {
      console.warn("Roles no están definidos o están vacíos");
      return;
    }

    if (user.role === roles[0].id) {
      setRoleColor("#e06860");
      setRoleChar("A");
      setRoleName(roles[0].name);
    }
    if (user.role === roles[1].id) {
      setRoleColor("#7abe74");
      setRoleChar("O");
      setRoleName(roles[1].name);
    }
    if (user.role === roles[2].id) {
      setRoleColor("#61afef");
      setRoleChar("G");
      setRoleName(roles[2].name);
    }
  }, [roles, user.role]);

  const handleMenuOptionSelect = async (option: string) => {
    if (option === "Ver mas") {
      UserModal.showUserDetails(user, roleName);
    }
    if (option === "Editar") {
      navigate(`editar/${user.id}`);
    }
    if (option === "Eliminar") {
      showUserDeleteModal(user.id);
    }
  };

  return (
    <Card
      sx={{
        width: 300,
        // bgcolor: `${roleColor}`,
        // p: 0,
        borderRadius: "10px",
        // background: " rgba(77, 75, 80, 1)",
        boxShadow: "0 4px 10px rgba(10, 10, 10,0.6)",
        // backdropFilter: "blur(10px)",
        border: "1px solid rgb(10, 10, 10)",

        ".MuiCardHeader-root": {
          p: "10px 10px 10px 10px",
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
            sx={{
              // bgcolor: `${roleColor}`,
              height: 100,
              width: 100,
              border: `4px solid ${roleColor}`,
              // fontSize:30
            }}
            aria-label="user"
            src={user.imageUrl}
            variant="rounded"
          >
            {`${roleChar}`}
          </Avatar>
        }
        action={
          // <IconButton aria-label="more info">
          //   <MoreVertIcon />
          // </IconButton>
          <UserCardMenu onOptionSelect={handleMenuOptionSelect} />
        }
        title={`${roleName}`}
        subheader={
          <Box>
            <Box>{`${user.firstName} ${user.lastName}`}</Box>
            <Typography
              sx={{
                pt: "11px",
                fontSize: "0.9rem",
                color: "white",
              }}
            >
              <ContactPhoneIcon />
              <br />
              {user.phone}
            </Typography>
          </Box>
        }
      />
      {/* <CardContent
        sx={{
          // margin:"0 0 0 0",
          padding: 0,
          paddingLeft: "16px",
        }}
      >
        <Typography
          // variant="body2"
          sx={{
            // color: "text.secondary",
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            // margin:0
            // padding:0
          }}
        >
          <ContactPhoneIcon />
          {user.phone}
        </Typography>
      </CardContent> */}
    </Card>
  );
};
export default UserCard;
