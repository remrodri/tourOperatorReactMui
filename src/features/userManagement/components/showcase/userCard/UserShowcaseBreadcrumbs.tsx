import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Typography } from "@mui/material";

export default function UserShowcaseBreadcrumbs() {
  
  return (
    <div role="presentation">
      <Breadcrumbs aria-label="breadcrumb">
        <Typography
          // underline="hover"
          // color="inherit"
          color="text.primary"
          // href="/material-ui/getting-started/installation/"
        >
          Todos los usuarios
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
