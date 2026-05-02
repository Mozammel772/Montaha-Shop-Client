import { UserRole } from "@/lib/auth-utils";
import { IAdmin } from "./admin.interface";

export interface UserInfo {
  id: string;
  name: string;
  phone: string;
  role: UserRole;
  status: "ACTIVE" | "BLOCKED" | "DELETED";
  admin?: IAdmin;
  createdAt: string;
  updatedAt: string;
}
