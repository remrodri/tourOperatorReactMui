import { useFormik } from "formik";
import { ChangeEvent, useCallback, useEffect, useState } from "react";

import { useUserContext } from "../../context/UserContext";
import { useRoleContext } from "../../../Role/context/RoleContext";

import { UserType } from "../../types/UserType";
import UserForm from "./UserForm";
import { userSchema } from "./validation/userSchema";

interface UserFormContainerProps {
  open: boolean;
  handleClick: () => void;
  user?: UserType;
}

export interface UserFormValues {
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

  const [preview, setPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Preview inicial si el usuario ya tiene imagen (url remota)
  useEffect(() => {
    setPreview(user?.imageUrl ?? null);
  }, [user]);

  // Cleanup seguro: revocar SOLO si es blob:
  useEffect(() => {
    return () => {
      if (preview?.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

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
    validationSchema: userSchema(!!user),
    onSubmit: async (values) => {
      setIsSubmitting(true);

      // Construir FormData limpio
      const formData = new FormData();
      formData.append("firstName", values.firstName.trim());
      formData.append("lastName", values.lastName.trim());
      formData.append("email", values.email.trim().toLowerCase());
      formData.append("ci", values.ci.trim().toUpperCase()); // ✅ Bolivia: complemento alfanumérico
      formData.append("phone", values.phone.trim());
      formData.append("role", values.role);
      formData.append("address", values.address.trim());

      // Imagen:
      // - si hay nueva -> manda file
      // - si edit y no cambió -> conserva imageUrl
      if (values.image) {
        formData.append("image", values.image);
      } else if (user?.imageUrl) {
        formData.append("imageUrl", user.imageUrl);
      }

      // Llamada (service ya muestra sileo.success/error y retorna UserType | null)
      let result: UserType | null = null;

      if (user?.id) {
        result = await updateUser(formData, user.id);
      } else {
        result = await registerUser(formData);
      }

      // ✅ Cerrar SOLO si fue exitoso
      if (result) {
        handleClick();
        formik.resetForm();
        setPreview(result.imageUrl ?? null);
      }
      // ❌ Si falla (null) NO cerramos. Sileo ya mostró el motivo.

      setIsSubmitting(false);
    },
  });

  const handleFileChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      // Marcar touched para que Yup muestre error si aplica
      formik.setFieldTouched("image", true, true);
      formik.setFieldValue("image", file, true);

      // Preview blob + cleanup del anterior blob
      setPreview((prev) => {
        if (prev?.startsWith("blob:")) URL.revokeObjectURL(prev);
        return URL.createObjectURL(file);
      });
    },
    [formik],
  );

  return (
    <UserForm
      open={open}
      handleClick={handleClick}
      user={user}
      roles={roles}
      preview={preview}
      setPreview={setPreview}
      formik={formik}
      handleFileChange={handleFileChange}
      isSubmitting={isSubmitting}
    />
  );
};

export default UserFormContainer;
