import { Card, CardHeader } from "@mui/material";
import CardMenu from "./TourTypeCardMenu";
import { useState } from "react";
import DeleteDialogContainer from "./deleteDialog/DeleteDialogContainer";
import UpdateTourTypeDialogContainer from "../../../createTourTypeDialog/UpdateTourTypeDialogContainer";
import AnimatedContent from "../../../../../../Animations/AnimatedContent/AnimatedContent";

interface TourTypeCardProps {
  tourType: any;
}

const TourTypeCard: React.FC<TourTypeCardProps> = ({ tourType }) => {
  // const { handleUpdate } = useTourTypeContext();
  const [open, setOpen] = useState(false);
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
          width: 300,
          borderRadius: "10px",
          background: "rgba(10,10,10,0.52)",
          boxShadow: "0 4px 10px rgba(10,10,10,0.6)",
          // backdropFilter: "blur(10px)",
          border: "1px solid rgba(10,10,10,0.6)",
          height: "100%",
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
    </AnimatedContent>
  );
};
export default TourTypeCard;
