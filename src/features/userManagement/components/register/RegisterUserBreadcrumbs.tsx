import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function RegisterUserBreadcrumbs() {
  function handleClick() {
    // event.preventDefault();
    // console.info("You clicked a breadcrumb.");
    navigate("/gestion-de-usuarios/usuarios");
  }
  const navigate = useNavigate();
  return (
    <div role="presentation">
      <Breadcrumbs aria-label="breadcrumb">
        <Link
          sx={{
            cursor: "pointer",
          }}
          underline="hover"
          color="inherit"
          onClick={handleClick}
          // href="/gestion-de-usuarios/usuarios"
        >
          Usuarios
        </Link>
        <Typography
          // underline="hover"
          // color="inherit"
          color="text.primary"
          // href="/material-ui/getting-started/installation/"
        >
          Actualizacion de usuario
        </Typography>
        {/* <Link
          underline="hover"
          color="text.primary"
          href="/material-ui/react-breadcrumbs/"
          aria-current="page"
        >
          Breadcrumbs
        </Link> */}
      </Breadcrumbs>
    </div>
  );
}
