import DialogComponent from "./LoginDialogComponent";

interface DialogComponentContainerProps {
  open: boolean;
  onClose: () => void;
}

const LoginDialogComponentContainer = ({
  open,
  onClose,
}: DialogComponentContainerProps) => {
  return <DialogComponent open={open} onClose={onClose} />;
};

export default LoginDialogComponentContainer;
