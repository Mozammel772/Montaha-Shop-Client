export interface IAdmin {
  id?: string;
  phone: string;
  name: string;
  profilePhoto?: string | null;
  contactNumber: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}
