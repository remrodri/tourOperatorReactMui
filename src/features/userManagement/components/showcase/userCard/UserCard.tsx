import { Avatar, Box, Card, CardHeader, Typography } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { ContactPhone } from "@mui/icons-material";

import { UserType } from "../../../types/UserType";
import { RoleType } from "../../../types/RoleType";
import UserCardMenu from "./UserCardMenu";
import { ENV } from "../../../../../config/env";

interface UserCardProps {
  user: UserType;
  userRole: RoleType;
  roles: RoleType[];
  handleMenuOption: (option: string) => void;
  role: string;
}

const UserCard: React.FC<UserCardProps> = ({
  user,
  userRole,
  roles,
  handleMenuOption,
  role,
}) => {
  const [roleColor, setRoleColor] = useState("#cccccc");
  const [roleChar, setRoleChar] = useState("SR");

  // Para cache-busting (y forzar refresh si cambia user/image)
  const [imgKey, setImgKey] = useState(() => Date.now());

  const BASE_URL = ENV.API_BASE_URL; // ej: http://localhost:3000  (ideal sin "/" al final)

  // Convierte "/uploads/..." -> "http://tu-api/uploads/..."
  const buildUrl = (path: string) => {
    // Si ya es absoluto, no tocar
    if (/^https?:\/\//i.test(path)) return path;

    // Normaliza a "/..."
    const normalized = path.startsWith("/") ? path : `/${path}`;

    // Evita doble slash si BASE_URL termina en "/"
    const base = BASE_URL.endsWith("/") ? BASE_URL.slice(0, -1) : BASE_URL;

    return `${base}${normalized}`;
  };

  // URL final del avatar (absoluto)
  const avatarUrl = useMemo(() => {
    return user?.imageUrl ? buildUrl(user.imageUrl) : undefined;
  }, [user?.imageUrl]);

  // Fuerza recarga cuando cambia el user o la imageUrl
  useEffect(() => {
    if (!avatarUrl) return;

    const key = Date.now();
    setImgKey(key);

    // (Opcional) precarga para reducir "flicker"
    const img = new Image();
    img.src = `${avatarUrl}?t=${key}`;
  }, [user?.id, avatarUrl]);

  const shortenUserName = (name: string) => {
    if (name.length < 27) return name;
    return `${name.substring(0, 24)}...`;
  };

  // Colores según rol (tu lógica original)
  useEffect(() => {
    if (roles && roles.length > 0) {
      if (user.role === roles[0]?.id) {
        setRoleColor("#e06860");
        setRoleChar("A");
      }
      if (user.role === roles[1]?.id) {
        setRoleColor("#7abe74");
        setRoleChar("O");
      }
      if (user.role === roles[2]?.id) {
        setRoleColor("#61afef");
        setRoleChar("G");
      }
    }
  }, [roles, user.role, userRole]);

  return (
    <Card
      sx={{
        width: 400,
        background: "rgba(10, 10, 10, 0.52)",
        borderRadius: "10px",
        borderTopLeftRadius: "4rem",
        borderBottomLeftRadius: "4rem",
        boxShadow: "0 4px 10px rgba(10,10,10,0.6)",
        border: "1px solid rgba(53, 53, 53, 0.6)",
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
            src={avatarUrl ? `${avatarUrl}?t=${imgKey}` : undefined}
            imgProps={{
              onError: () => {
                console.log("Image failed to load:", avatarUrl);
              },
            }}
          >
            {roleChar}
          </Avatar>
        }
        action={
          <UserCardMenu
            onOptionSelect={handleMenuOption}
            role={role}
            user={user}
          />
        }
        title={`${userRole.name.toUpperCase()}`}
        subheader={
          <Box>
            <Typography sx={{ fontSize: "16px" }}>
              {shortenUserName(`${user.firstName} ${user.lastName}`)}
            </Typography>

            <Typography
              sx={{
                pt: "11px",
                fontSize: "0.9rem",
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <ContactPhone />
              {user.phone}
            </Typography>
          </Box>
        }
      />
    </Card>
  );
};

export default UserCard;
