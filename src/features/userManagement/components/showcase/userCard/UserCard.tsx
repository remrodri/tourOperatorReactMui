import React, { useEffect, useState } from "react";
import { User } from "../../../types/User";
import {
  Avatar,
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
      }}
    >
      <CardHeader
        avatar={
          <Avatar
            sx={{
              bgcolor: `${roleColor}`,
            }}
            aria-label="user"
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
        subheader={`${user.firstName} ${user.lastName}`}
      />
      <CardContent>
        <Typography
          variant="body2"
          sx={{
            color: "text.secondary",
            display: "flex",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <ContactPhoneIcon />
          {user.phone}
        </Typography>
      </CardContent>
    </Card>
  );
};
export default UserCard;
