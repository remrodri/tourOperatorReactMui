/* eslint-disable @typescript-eslint/no-explicit-any */
export interface User {
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
  image?: any;
  deleted: boolean;
}
