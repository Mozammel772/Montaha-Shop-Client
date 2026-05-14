import MyProfile from "@/components/modules/MyProfile/MyProfile";
import { getUserInfo } from "@/services/auth/getUserInfo";

const MyProfilePage = async () => {
  const userInfo = await getUserInfo();

  if (!userInfo) {
    return (
      <div className="flex items-center justify-center h-40 text-muted-foreground text-sm">
        Failed to load profile. Please refresh the page.
      </div>
    );
  }

  return <MyProfile userInfo={userInfo} />;
};

export default MyProfilePage;
