import { Breadcrumbs, Link, Typography } from "@mui/material";

interface BreadCrumbsProps {
  handleClick: () => void;
}

const BreadCrumbs: React.FC<BreadCrumbsProps> = ({handleClick}) => {
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
        >
          Paquetes turisticos
        </Link>
        <Typography color="text.primary">Nuevo</Typography>
      </Breadcrumbs>
    </div>
  );
};
export default BreadCrumbs;
