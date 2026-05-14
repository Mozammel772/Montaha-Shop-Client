import AllUserManage from "@/components/modules/UserManagement/AllUserManage";

export const metadata = {
  title: "User Management",
  description: "Manage all users — search, filter, update roles and statuses",
};

export default function AllUserPages() {
  return <AllUserManage />;
}
