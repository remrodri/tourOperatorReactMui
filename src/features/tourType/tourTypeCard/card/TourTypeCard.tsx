import { Card, CardHeader } from "@mui/material";
import CardMenu from "./TourTypeCardMenu";
import { useState } from "react";
import DeleteDialogContainer from "./deleteDialog/DeleteDialogContainer";
import { useTourTypeContext } from "../../../../context/TourTypeContext";
import CreateTourTypeDialogContainer from "../../createTourTypeDialog/CreateTourTypeDialogContainer";
import UpdateTourTypeDialogContainer from "../../createTourTypeDialog/UpdateTourTypeDialogContainer";

interface TourTypeCardProps {
  tourType: any;
}

const TourTypeCard: React.FC<TourTypeCardProps> = ({ tourType }) => {
  // const { handleUpdate } = useTourTypeContext();
  const [open, setOpen] = useState<boolean>(false);
  const [openEdit, setOpenEdit] = useState(false);

  const handleClickOpenEdit = () => {
    setOpenEdit(!openEdit);
  };

  const handleOpenDialog = () => {
    setOpen(!open);
  };

  const handleOpcionMenuCard = (option: string) => {
    if (option === "Editar") {
      console.log("option::: ", option);
      // handleUpdate(tourType);
      handleClickOpenEdit();
    }
    if (option === "Eliminar") {
      handleOpenDialog();
    }
  };

  return (
    <Card
      sx={{
        width: 300,
      }}
    >
      <CardHeader
        title={tourType.name}
        subheader={tourType.description}
        action={
          <CardMenu
            onOptionSelect={handleOpcionMenuCard}
            handleOpenDialog={handleOpenDialog}
          />
        }
      />
      {openEdit && (
        <UpdateTourTypeDialogContainer
          open={openEdit}
          handleClick={handleClickOpenEdit}
          tourType={tourType}
        />
      )}
      {open && (
        <DeleteDialogContainer
          open={open}
          handleClose={handleOpenDialog}
          id={tourType.id}
        />
      )}
    </Card>
  );
};
export default TourTypeCard;
