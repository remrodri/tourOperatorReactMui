import { Avatar, Box, Card, CardHeader, Typography } from "@mui/material";
import { User } from "../../../types/User";
import { Role } from "../../../types/Role";
import { useEffect, useState } from "react";
import { ContactPhone } from "@mui/icons-material";
import UserCardMenu from "./UserCardMenu";
import FadeContent from "../../../../../Animations/FadeContent/FadeContent";
import AnimatedContent from "../../../../../Animations/AnimatedContent/AnimatedContent";

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
  // Add state to track image loading
  const [imgKey, setImgKey] = useState(Date.now());
  const [imgLoaded, setImgLoaded] = useState(false);

  // Force reload of image when user or imageUrl changes
  useEffect(() => {
    if (user?.imageUrl) {
      setImgKey(Date.now());
      // Preload image
      const img = new Image();
      img.src = `${user.imageUrl}?t=${imgKey}`;
      img.onload = () => setImgLoaded(true);
      img.onerror = () => setImgLoaded(false);
    }
  }, [user.id, user.imageUrl]);

  const shortenUserName = (name: string) => {
    if (name.length < 27) {
      return name;
    }
    const shortenName = name.substring(0, 24);
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
    <AnimatedContent
      distance={100}
      direction="vertical"
      reverse={true}
      duration={1.2}
      ease="power3.out"
      initialOpacity={0.2}
      animateOpacity
      scale={1.1}
      threshold={0.2}
      delay={0.3}
    >
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
              // Add timestamp parameter to prevent caching
              src={user.imageUrl ? `${user.imageUrl}?t=${imgKey}` : undefined}
              // Handle image loading errors
              imgProps={{
                onError: () => {
                  console.log("Image failed to load:", user.imageUrl);
                  setImgLoaded(false);
                },
                onLoad: () => setImgLoaded(true),
              }}
            >
              {roleChar}
            </Avatar>
          }
          action={<UserCardMenu onOptionSelect={handleMenuOption} />}
          title={`${userRole.name.toUpperCase()}`}
          subheader={
            <Box>
              <Typography sx={{ fontSize: "16px" }}>
                {shortenUserName(`${user.firstName} ${user.lastName}`)}
              </Typography>
              <Typography
                sx={{ pt: "11px", fontSize: "0.9rem",  display: "flex", alignItems: "center", gap: "10px" }}
              >
                <ContactPhone />
                {/* <br /> */}
                {user.phone}
              </Typography>
            </Box>
          }
        />
      </Card>
    </AnimatedContent>
  );
};

export default UserCard;
