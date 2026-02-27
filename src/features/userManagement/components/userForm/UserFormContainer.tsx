import { useFormik } from "formik";
import { useUserContext } from "../../context/UserContext";
import { User } from "../../types/UserType";
import UserForm from "./UserForm";
import { userSchema } from "./validation/userSchema";
import { useRoleContext } from "../../../Role/context/RoleContext";
import { ChangeEvent, useEffect, useState } from "react";
import { useNewSnackbar } from "../../../../context/SnackbarContext";
// import { useNewSnackbar } from "../../../context/SnackbarContext";

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
  role: string;
  address: string;
  imageUrl?: string;
  image?: File | null;
}

const UserFormContainer: React.FC<UserFormContainerProps> = ({
  open,
  handleClick,
  user,
}) => {
  const { updateUser, registerUser } = useUserContext();
  const { roles } = useRoleContext();
  const { showSnackbar } = useNewSnackbar();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize preview if user has an image
  useEffect(() => {
    if (user?.imageUrl) {
      setPreview(user.imageUrl);
    } else {
      setPreview(null);
    }
  }, [user]);

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const onSubmit = async (values: UserFormValues) => {
    console.log("values::: ", values);
    console.log("user::: ", user);
    setIsSubmitting(true);

    try {
      // Create FormData object
      const formData = new FormData();

      // Add all text fields
      Object.entries(values).forEach(([key, value]) => {
        if (key !== "image" && value !== null && value !== undefined) {
          formData.append(key, String(value));
        }
      });

      // Add image file if selected
      if (selectedFile) {
        formData.append("image", selectedFile);
      }
      // If user has an existing image and no new file is selected
      else if (user?.imageUrl && !selectedFile) {
        formData.append("imageUrl", user.imageUrl);
      }

      let result;

      if (user?.id) {
        // Update existing user
        result = await updateUser(formData, user.id);
      } else {
        // Create new user
        result = await registerUser(formData);
      }

      if (result) {
        showSnackbar("Usuario guardado exitosamente", "success");
        handleClick(); // Close form on success
      } else {
        showSnackbar("Error al guardar usuario", "error");
      }
    } catch (error) {
      console.error("Error processing form:", error);
      showSnackbar("Error al procesar el formulario", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      formik.setFieldValue("image", file);
      // Create preview URL
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
      phone: user?.phone ?? "",
      ci: user?.ci ?? "",
      role: user?.role ?? "",
      address: user?.address ?? "",
      imageUrl: user?.imageUrl ?? "",
      image: null,
    },
    enableReinitialize: true,
    validationSchema: userSchema(!!user), //  pasa el booleano directamente
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
      isSubmitting={isSubmitting}
    />
  );
};

export default UserFormContainer;
