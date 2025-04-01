import { useFormik } from "formik";
import { useUserContext } from "../../context/UserContext";
import { User } from "../../types/User";
import UserForm from "./UserForm";
import { userSchema } from "./validation/userSchema";
import { useRoleContext } from "../../../Role/context/RoleContext";
import { ChangeEvent, useState } from "react";

interface UserFormContainerProps {
  open: boolean;
  handleClick: () => void;
  user?: User;
}

interface UserFormValues {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  ci: string;
  phone: string;
  // firstLogin?: string;
  role: string;
  address: string;
  imageUrl?: string;
  image?: any;
}
const UserFormContainer: React.FC<UserFormContainerProps> = ({
  open,
  handleClick,
  user,
}) => {
  const { updateUser, registerUser } = useUserContext();
  const { roles } = useRoleContext();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const onSubmit = async (userData: any) => {
    // console.log('userData::: ', userData);
    user?.id
      ? await updateUser(userData, user.id)
      : await registerUser(userData);
    handleClick();
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      formik.setFieldValue("image", file);
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
    }
  };

  const formik = useFormik<UserFormValues>({
    initialValues: {
      id: user?.id ?? "",
      firstName: user?.firstName ?? "",
      lastName: user?.lastName ?? "",
      email: user?.email ?? "",
      phone: user?.email ?? "",
      ci: user?.ci ?? "",
      role: user?.role ?? "",
      address: user?.address ?? "",
      imageUrl: user?.imageUrl ?? "",
      image: user?.image ?? null,
    },
    validationSchema: userSchema,
    onSubmit,
  });
  return (
    <UserForm
      open={open}
      handleClick={handleClick}
      user={user}
      roles={roles}
      preview={preview}
      formik={formik}
      setPreview={setPreview}
      handleFileChange={handleFileChange}
    />
  );
};
export default UserFormContainer;
