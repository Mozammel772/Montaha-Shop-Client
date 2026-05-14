"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getInitials } from "@/lib/formatters";
import { updateMyProfile } from "@/services/auth/auth.service";
import { UserInfo } from "@/types/user.interface";
import { toast } from "sonner";

import {
  Camera,
  Check,
  Loader2,
  Lock,
  Mail,
  MapPin,
  Phone,
  Save,
  ShieldCheck,
  User,
} from "lucide-react";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

interface MyProfileProps {
  userInfo: UserInfo;
}

const ROLE_LABEL: Record<string, string> = {
  ADMIN: "Administrator",
  MODERATOR: "Moderator",
  USER: "User",
};

const MyProfile = ({ userInfo }: MyProfileProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const toastId = toast.loading("Saving your profile...");

    startTransition(async () => {
      const result = await updateMyProfile(formData);
      if (result.success) {
        toast.success(result.message || "Profile updated successfully", {
          id: toastId,
          description: "Your changes have been saved.",
        });
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
        setPreviewImage(null);
        router.refresh();
      } else {
        toast.error(result.message || "Failed to update profile", {
          id: toastId,
          description: "Please check your details and try again.",
        });
      }
    });
  };

  const isModerator = userInfo.role === "MODERATOR";
  const isUser = userInfo.role === "USER";

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-5 lg:grid-cols-[300px_1fr]">
        {/* ── LEFT COLUMN ── */}
        <div className="flex flex-col gap-4">
          {/* Profile card */}
          <div className="rounded-xl border border-border bg-background shadow-sm">
            {/* Banner — no overflow-hidden so avatar sits on top cleanly */}
            <div className="relative h-24 rounded-t-xl bg-gradient-to-r from-orange-700 via-orange-500 to-orange-400">
              {/* Avatar floated over banner bottom */}
              <div className="absolute -bottom-11 left-1/2 -translate-x-1/2">
                <div className="relative">
                  <Avatar className="h-[88px] w-[88px] rounded-full border-[3px] border-background shadow-md bg-transparent">
                    {previewImage || userInfo.profilePicture ? (
                      <AvatarImage
                        src={
                          previewImage || (userInfo.profilePicture as string)
                        }
                        alt={userInfo.name}
                        className="h-full w-full rounded-full bg-muted object-cover"
                      />
                    ) : (
                      <AvatarFallback className="bg-muted text-2xl font-medium text-muted-foreground">
                        {getInitials(userInfo.name)}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <label
                    htmlFor="file"
                    className="absolute bottom-0.5 right-0.5 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-orange-500 text-white shadow hover:bg-orange-600 transition-colors border-2 border-background"
                  >
                    <Camera className="h-3.5 w-3.5" />
                    <Input
                      id="file"
                      type="file"
                      name="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                      disabled={isPending}
                    />
                  </label>
                </div>
              </div>
            </div>

            {/* Content below banner — pt-14 to clear avatar overhang */}
            <div className="flex flex-col items-center px-5 pb-6 pt-14">
              {/* Name & role */}
              <div className="text-center">
                <h2 className="text-base font-medium text-foreground">
                  {userInfo.name}
                </h2>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  Welcome back 👋
                </p>
                <Badge
                  variant="outline"
                  className="mt-2.5 gap-1 border-orange-200 bg-orange-50 px-2.5 py-0.5 text-[11px] text-orange-700 dark:border-orange-900 dark:bg-orange-950/40 dark:text-orange-400"
                >
                  <ShieldCheck className="h-3 w-3" />
                  {ROLE_LABEL[userInfo.role] ?? userInfo.role}
                </Badge>
              </div>

              <div className="my-4 h-px w-full bg-border" />

              {/* Quick info */}
              <div className="w-full space-y-2">
                {[
                  { icon: Phone, label: "Phone", value: userInfo.phone },
                  {
                    icon: Mail,
                    label: "Email",
                    value: userInfo.email || "No email added",
                  },
                  {
                    icon: MapPin,
                    label: "Address",
                    value: userInfo.address || "No address added",
                  },
                ].map(({ icon: Icon, label, value }) => (
                  <div
                    key={label}
                    className="flex items-center gap-3 rounded-lg bg-muted/50 p-2.5"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange-100 text-orange-600 dark:bg-orange-950/60 dark:text-orange-400">
                      <Icon className="h-3.5 w-3.5" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] uppercase tracking-wide text-muted-foreground">
                        {label}
                      </p>
                      <p className="truncate text-[13px] font-medium text-foreground">
                        {value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Security notice */}
          <div className="flex gap-3 rounded-xl border border-orange-200 bg-orange-50 p-3 dark:border-orange-900 dark:bg-orange-950/20">
            <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange-100 text-orange-600 dark:bg-orange-900 dark:text-orange-400">
              <Lock className="h-3.5 w-3.5" />
            </div>
            <div>
              <h4 className="text-xs font-medium text-orange-700 dark:text-orange-300">
                Security notice
              </h4>
              <p className="mt-1 text-[11px] leading-relaxed text-orange-600 dark:text-orange-400">
                Your phone number is protected and cannot be changed from here.
              </p>
            </div>
          </div>
        </div>

        {/* ── RIGHT COLUMN ── */}
        <div className="rounded-xl border border-border bg-background shadow-sm">
          <div className="p-6 sm:p-7">
            {/* Header */}
            <div className="mb-6 flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[14px] bg-orange-100 text-orange-600 dark:bg-orange-950/60 dark:text-orange-400">
                <User className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-base font-medium text-foreground">
                  Personal information
                </h2>
                <p className="text-xs text-muted-foreground">
                  Update your account details and profile
                </p>
              </div>
            </div>

            {/* Section: Basic details */}
            <p className="mb-3 text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
              Basic details
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label
                  htmlFor="name"
                  className="text-xs font-medium text-muted-foreground"
                >
                  Full name
                </Label>
                <Input
                  id="name"
                  name="name"
                  defaultValue={userInfo.name}
                  placeholder="Enter your full name"
                  disabled={isPending}
                  className="h-10 rounded-lg text-sm"
                />
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="phone"
                  className="text-xs font-medium text-muted-foreground"
                >
                  Phone number
                </Label>
                <div className="relative">
                  <Input
                    id="phone"
                    value={userInfo.phone || ""}
                    disabled
                    className="h-10 rounded-lg pr-9 text-sm"
                  />
                  <Lock className="absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="email"
                  className="text-xs font-medium text-muted-foreground"
                >
                  Email address
                </Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  defaultValue={userInfo.email || ""}
                  placeholder="Enter email"
                  disabled={isPending}
                  className="h-10 rounded-lg text-sm"
                />
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="gender"
                  className="text-xs font-medium text-muted-foreground"
                >
                  Gender
                </Label>
                <select
                  id="gender"
                  name="gender"
                  defaultValue={userInfo.gender || "MALE"}
                  disabled={isPending}
                  className="flex h-10 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none focus:ring-1 focus:ring-orange-500 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                </select>
              </div>
            </div>

            {/* Section: Additional info */}
            {(isModerator || isUser) && (
              <>
                <div className="my-5 h-px bg-border" />
                <p className="mb-3 text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
                  Additional info
                </p>
                <div className="grid gap-4 sm:grid-cols-2">
                  {isModerator && (
                    <div className="space-y-1.5">
                      <Label
                        htmlFor="designation"
                        className="text-xs font-medium text-muted-foreground"
                      >
                        Designation
                      </Label>
                      <Input
                        id="designation"
                        name="designation"
                        defaultValue={userInfo.designation || ""}
                        placeholder="Senior Manager"
                        disabled={isPending}
                        className="h-10 rounded-lg text-sm"
                      />
                    </div>
                  )}
                  <div
                    className={`space-y-1.5 ${isModerator ? "sm:col-span-2" : "sm:col-span-2"}`}
                  >
                    <Label
                      htmlFor="address"
                      className="text-xs font-medium text-muted-foreground"
                    >
                      Address
                    </Label>
                    <Textarea
                      id="address"
                      name="address"
                      defaultValue={userInfo.address || ""}
                      placeholder="Enter your full address"
                      disabled={isPending}
                      className="min-h-[90px] rounded-lg text-sm"
                    />
                  </div>
                </div>
              </>
            )}

            {/* Save button */}
            <div className="mt-7 flex justify-end">
              <Button
                type="submit"
                disabled={isPending}
                className={`h-10 rounded-lg px-5 text-sm font-medium transition-colors ${
                  saved
                    ? "bg-green-600 hover:bg-green-600"
                    : "bg-orange-500 hover:bg-orange-600"
                }`}
              >
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : saved ? (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Saved!
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save changes
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default MyProfile;

// "use client";

// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import { getInitials } from "@/lib/formatters";
// import { updateMyProfile } from "@/services/auth/auth.service";
// import { UserInfo } from "@/types/user.interface";
// import { toast } from "sonner";

// import {
//   Camera,
//   Check,
//   Loader2,
//   Lock,
//   Mail,
//   MapPin,
//   Phone,
//   Save,
//   ShieldCheck,
//   User,
// } from "lucide-react";

// import { useRouter } from "next/navigation";
// import { useState, useTransition } from "react";

// interface MyProfileProps {
//   userInfo: UserInfo;
// }

// const ROLE_LABEL: Record<string, string> = {
//   ADMIN: "Administrator",
//   MODERATOR: "Moderator",
//   USER: "User",
// };

// const MyProfile = ({ userInfo }: MyProfileProps) => {
//   const router = useRouter();
//   const [isPending, startTransition] = useTransition();
//   const [previewImage, setPreviewImage] = useState<string | null>(null);
//   const [saved, setSaved] = useState(false);

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => setPreviewImage(reader.result as string);
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     const rawFormData = new FormData(e.currentTarget);
//     const uploadFormData = new FormData();
//     const data: Record<string, string> = {};

//     // ✅ Fix: empty string ও include করো — address/email clear করা যাবে
//     rawFormData.forEach((value, key) => {
//       if (key !== "file") {
//         data[key] = value as string;
//       }
//     });

//     uploadFormData.append("data", JSON.stringify(data));

//     const file = rawFormData.get("file");
//     if (file && file instanceof File && file.size > 0) {
//       uploadFormData.append("file", file);
//     }

//     // loading toast — id দিয়ে পরে update করবো
//     const toastId = toast.loading("Saving your profile...");

//     startTransition(async () => {
//       try {
//         const result = await updateMyProfile(uploadFormData);

//         if (result.success) {
//           toast.success(result.message || "Profile updated successfully", {
//             id: toastId,
//             description: "Your changes have been saved.",
//           });
//           setSaved(true);
//           setTimeout(() => setSaved(false), 2000);
//           setPreviewImage(null);
//           router.refresh();
//         } else {
//           toast.error(result.message || "Failed to update profile", {
//             id: toastId,
//             description: "Please check your details and try again.",
//           });
//         }
//       } catch {
//         toast.error("Something went wrong", {
//           id: toastId,
//           description: "An unexpected error occurred. Please try again.",
//         });
//       }
//     });
//   };

//   const isModerator = userInfo.role === "MODERATOR";
//   const isUser = userInfo.role === "USER";

//   return (
//     <form onSubmit={handleSubmit}>
//       <div className="grid gap-5 lg:grid-cols-[300px_1fr]">
//         {/* ── LEFT COLUMN ── */}
//         <div className="flex flex-col gap-4">
//           {/* Profile card */}
//           <div className="rounded-xl border border-border bg-background shadow-sm">
//             {/* Banner */}
//             <div className="relative h-24 rounded-t-xl bg-gradient-to-r from-orange-700 via-orange-500 to-orange-400">
//               {/* Avatar floated over banner bottom */}
//               <div className="absolute -bottom-11 left-1/2 -translate-x-1/2">
//                 <div className="relative">
//                   <Avatar className="h-[88px] w-[88px] rounded-full border-[3px] border-background shadow-md bg-transparent">
//                     {previewImage || userInfo.profilePicture ? (
//                       <AvatarImage
//                         src={
//                           previewImage || (userInfo.profilePicture as string)
//                         }
//                         alt={userInfo.name}
//                         className="h-full w-full rounded-full bg-muted object-cover"
//                       />
//                     ) : (
//                       <AvatarFallback className="bg-muted text-2xl font-medium text-muted-foreground">
//                         {getInitials(userInfo.name)}
//                       </AvatarFallback>
//                     )}
//                   </Avatar>
//                   <label
//                     htmlFor="file"
//                     className="absolute bottom-0.5 right-0.5 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-orange-500 text-white shadow hover:bg-orange-600 transition-colors border-2 border-background"
//                   >
//                     <Camera className="h-3.5 w-3.5" />
//                     <Input
//                       id="file"
//                       type="file"
//                       name="file"
//                       accept="image/*"
//                       className="hidden"
//                       onChange={handleImageChange}
//                       disabled={isPending}
//                     />
//                   </label>
//                 </div>
//               </div>
//             </div>

//             {/* Content below banner */}
//             <div className="flex flex-col items-center px-5 pb-6 pt-14">
//               {/* Name & role */}
//               <div className="text-center">
//                 <h2 className="text-base font-medium text-foreground">
//                   {userInfo.name}
//                 </h2>
//                 <p className="mt-0.5 text-xs text-muted-foreground">
//                   Welcome back 👋
//                 </p>
//                 <Badge
//                   variant="outline"
//                   className="mt-2.5 gap-1 border-orange-200 bg-orange-50 px-2.5 py-0.5 text-[11px] text-orange-700 dark:border-orange-900 dark:bg-orange-950/40 dark:text-orange-400"
//                 >
//                   <ShieldCheck className="h-3 w-3" />
//                   {ROLE_LABEL[userInfo.role] ?? userInfo.role}
//                 </Badge>
//               </div>

//               <div className="my-4 h-px w-full bg-border" />

//               {/* Quick info */}
//               <div className="w-full space-y-2">
//                 {[
//                   { icon: Phone, label: "Phone", value: userInfo.phone },
//                   {
//                     icon: Mail,
//                     label: "Email",
//                     value: userInfo.email || "No email added",
//                   },
//                   {
//                     icon: MapPin,
//                     label: "Address",
//                     value: userInfo.address || "No address added",
//                   },
//                 ].map(({ icon: Icon, label, value }) => (
//                   <div
//                     key={label}
//                     className="flex items-center gap-3 rounded-lg bg-muted/50 p-2.5"
//                   >
//                     <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange-100 text-orange-600 dark:bg-orange-950/60 dark:text-orange-400">
//                       <Icon className="h-3.5 w-3.5" />
//                     </div>
//                     <div className="min-w-0">
//                       <p className="text-[10px] uppercase tracking-wide text-muted-foreground">
//                         {label}
//                       </p>
//                       <p className="truncate text-[13px] font-medium text-foreground">
//                         {value}
//                       </p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Security notice */}
//           <div className="flex gap-3 rounded-xl border border-orange-200 bg-orange-50 p-3 dark:border-orange-900 dark:bg-orange-950/20">
//             <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange-100 text-orange-600 dark:bg-orange-900 dark:text-orange-400">
//               <Lock className="h-3.5 w-3.5" />
//             </div>
//             <div>
//               <h4 className="text-xs font-medium text-orange-700 dark:text-orange-300">
//                 Security notice
//               </h4>
//               <p className="mt-1 text-[11px] leading-relaxed text-orange-600 dark:text-orange-400">
//                 Your phone number is protected and cannot be changed from here.
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* ── RIGHT COLUMN ── */}
//         <div className="rounded-xl border border-border bg-background shadow-sm">
//           <div className="p-6 sm:p-7">
//             {/* Header */}
//             <div className="mb-6 flex items-center gap-4">
//               <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[14px] bg-orange-100 text-orange-600 dark:bg-orange-950/60 dark:text-orange-400">
//                 <User className="h-5 w-5" />
//               </div>
//               <div>
//                 <h2 className="text-base font-medium text-foreground">
//                   Personal information
//                 </h2>
//                 <p className="text-xs text-muted-foreground">
//                   Update your account details and profile
//                 </p>
//               </div>
//             </div>

//             {/* Section: Basic details */}
//             <p className="mb-3 text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
//               Basic details
//             </p>
//             <div className="grid gap-4 sm:grid-cols-2">
//               <div className="space-y-1.5">
//                 <Label
//                   htmlFor="name"
//                   className="text-xs font-medium text-muted-foreground"
//                 >
//                   Full name
//                 </Label>
//                 <Input
//                   id="name"
//                   name="name"
//                   defaultValue={userInfo.name}
//                   placeholder="Enter your full name"
//                   disabled={isPending}
//                   className="h-10 rounded-lg text-sm"
//                 />
//               </div>

//               <div className="space-y-1.5">
//                 <Label
//                   htmlFor="phone"
//                   className="text-xs font-medium text-muted-foreground"
//                 >
//                   Phone number
//                 </Label>
//                 <div className="relative">
//                   <Input
//                     id="phone"
//                     value={userInfo.phone || ""}
//                     disabled
//                     className="h-10 rounded-lg pr-9 text-sm"
//                   />
//                   <Lock className="absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
//                 </div>
//               </div>

//               <div className="space-y-1.5">
//                 <Label
//                   htmlFor="email"
//                   className="text-xs font-medium text-muted-foreground"
//                 >
//                   Email address
//                 </Label>
//                 <Input
//                   id="email"
//                   type="email"
//                   name="email"
//                   defaultValue={userInfo.email || ""}
//                   placeholder="Enter email"
//                   disabled={isPending}
//                   className="h-10 rounded-lg text-sm"
//                 />
//               </div>

//               <div className="space-y-1.5">
//                 <Label
//                   htmlFor="gender"
//                   className="text-xs font-medium text-muted-foreground"
//                 >
//                   Gender
//                 </Label>
//                 <select
//                   id="gender"
//                   name="gender"
//                   defaultValue={userInfo.gender || "MALE"}
//                   disabled={isPending}
//                   className="flex h-10 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none focus:ring-1 focus:ring-orange-500 disabled:cursor-not-allowed disabled:opacity-50"
//                 >
//                   <option value="MALE">Male</option>
//                   <option value="FEMALE">Female</option>
//                 </select>
//               </div>
//             </div>

//             {/* Section: Additional info */}
//             {(isModerator || isUser) && (
//               <>
//                 <div className="my-5 h-px bg-border" />
//                 <p className="mb-3 text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
//                   Additional info
//                 </p>
//                 <div className="grid gap-4 sm:grid-cols-2">
//                   {isModerator && (
//                     <div className="space-y-1.5">
//                       <Label
//                         htmlFor="designation"
//                         className="text-xs font-medium text-muted-foreground"
//                       >
//                         Designation
//                       </Label>
//                       <Input
//                         id="designation"
//                         name="designation"
//                         defaultValue={userInfo.designation || ""}
//                         placeholder="Senior Manager"
//                         disabled={isPending}
//                         className="h-10 rounded-lg text-sm"
//                       />
//                     </div>
//                   )}
//                   <div
//                     className={`space-y-1.5 ${isModerator ? "sm:col-span-2" : "sm:col-span-2"}`}
//                   >
//                     <Label
//                       htmlFor="address"
//                       className="text-xs font-medium text-muted-foreground"
//                     >
//                       Address
//                     </Label>
//                     <Textarea
//                       id="address"
//                       name="address"
//                       defaultValue={userInfo.address || ""}
//                       placeholder="Enter your full address"
//                       disabled={isPending}
//                       className="min-h-[90px] rounded-lg text-sm"
//                     />
//                   </div>
//                 </div>
//               </>
//             )}

//             {/* Save button */}
//             <div className="mt-7 flex justify-end">
//               <Button
//                 type="submit"
//                 disabled={isPending}
//                 className={`h-10 rounded-lg px-5 text-sm font-medium transition-colors ${
//                   saved
//                     ? "bg-green-600 hover:bg-green-600"
//                     : "bg-orange-500 hover:bg-orange-600"
//                 }`}
//               >
//                 {isPending ? (
//                   <>
//                     <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                     Saving...
//                   </>
//                 ) : saved ? (
//                   <>
//                     <Check className="mr-2 h-4 w-4" />
//                     Saved!
//                   </>
//                 ) : (
//                   <>
//                     <Save className="mr-2 h-4 w-4" />
//                     Save changes
//                   </>
//                 )}
//               </Button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </form>
//   );
// };

// export default MyProfile;
