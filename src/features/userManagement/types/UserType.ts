export interface UserType {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  ci: string;
  phone: string;
  firstLogin?: string;
  role: string;
  address: string;
  imageUrl?: string;
  image?: File | null;
  deleted: boolean;
}
