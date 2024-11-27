import { userUserContext } from "../../context/UserContext";

const UserShowcase: React.FC = () => {
  const { users, loading, error } = userUserContext();
  if (loading) return <p>Cargando usuarios...</p>;
  if (error) return <p>{error}</p>;
  return <h1>UserShowcase</h1>;
};
export default UserShowcase;
