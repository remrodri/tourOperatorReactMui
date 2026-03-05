import { Avatar, Box, Card, CardHeader, Typography } from "@mui/material";
import { useEffect, useState } from "react";
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
  const [imgKey, setImgKey] = useState(() => Date.now());

  /**
   * Convierte una ruta del backend ("/uploads/...") a URL absoluto del backend.
   * IMPORTANTÍSIMO: ENV.API_BASE_URL debe incluir protocolo: https://...
   */

  // console.log("ENV.API_BASE_URL =", ENV.API_BASE_URL);
  // console.log("user.imageUrl =", user.imageUrl);
  // console.log("user::: ", user);
  // console.log("avatarUrl FINAL =", avatarUrl);

  const buildAssetUrl = (path: string) => {
    // console.log('ENV::: ', ENV);
    if (!path) return "";
    // Si ya es URL absoluto, no tocar:
    if (/^https?:\/\//i.test(path)) return path;

    // Normaliza el base sin "/" al final
    const base = (ENV.API_BASE_URL || "").replace(/\/$/, "");
    // Normaliza el path con "/" al inicio
    const normalized = path.startsWith("/") ? path : `/${path}`;
    // console.log("`${base}${normalized}`::: ", `${base}${normalized}`);
    return `${base}${normalized}`;
  };

  // URL final para el Avatar (NO pasa por axios)
  const avatarUrl = user?.imageUrl ? buildAssetUrl(user.imageUrl) : "";

  // Si cambia el usuario o su imagen, fuerza un nuevo cache-bust param
  useEffect(() => {
    if (!avatarUrl) return;

    const key = Date.now();
    setImgKey(key);

    // Precarga opcional
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
      } else if (user.role === roles[1]?.id) {
        setRoleColor("#7abe74");
        setRoleChar("O");
      } else if (user.role === roles[2]?.id) {
        setRoleColor("#61afef");
        setRoleChar("G");
      } else {
        setRoleColor("#cccccc");
        setRoleChar("SR");
      }
    }
  }, [roles, user.role]);

  return (
    <Card
      sx={{
        width: 400,
        // background: "rgba(10, 10, 10, 0.52)",
        background: user.deleted
          ? "rgba(73, 17, 17, 0.52)"
          : "rgba(10, 10, 10, 0.52)",
        // backgroundImage:
        // tourPackage.status === "active"
        //   ? `linear-gradient(rgba(10, 10, 10, 0.93), rgba(10,10,10,0.52)), url(${destinationImage})`
        //   : `linear-gradient(rgba(73, 17, 17, 0.93), rgba(73,17,17,0.52)), url(${destinationImage})`,
        borderRadius: "10px",
        borderTopLeftRadius: "4rem",
        borderBottomLeftRadius: "4rem",
        boxShadow: `0 4px 10px ${user.deleted ? "rgba(73, 17, 17, 0.6)" : "rgba(10,10,10,0.6)"}`,
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
                console.log("❌ Avatar no cargó:", avatarUrl);
              },
              onLoad: () => {
                // console.log("✅ Avatar cargó:", avatarUrl);
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
