import React from "react";
import { useParams } from "react-router-dom";
import PasswordForm from "./PasswordForm";
import { useUpdatePassword } from "./hook/useUpdatePassword";

const PasswordFormContainer: React.FC = () => {
  const { updatePassword, isLoading, error } = useUpdatePassword();
  const { userId } = useParams<{ userId: string }>();

  const handleSubmit = async (values: {
    password: string;
    confirmPassword: string;
  }) => {
    await updatePassword(values.password, userId);
  };

  return (
    <PasswordForm
      onSubmit={handleSubmit}
      isSubmitting={isLoading}
      errorMessage={error}
    />
  );
};

export default PasswordFormContainer;
