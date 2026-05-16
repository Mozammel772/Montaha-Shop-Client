// /* eslint-disable @typescript-eslint/no-explicit-any */

// "use client";

// import Image from "next/image";
// import { useEffect, useState } from "react";

// import {
//   Image as ImageIcon,
//   Loader2,
//   RefreshCw,
//   Save,
//   Trash2,
// } from "lucide-react";

// import { toast } from "sonner";

// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";

// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { serverFetch } from "@/lib/server-fetch";

// interface SliderItem {
//   id: number;
//   title: string;
//   imageUrl: string;
//   isActive: boolean;
//   createdAt: string;
// }

// // ─── Confirm Modal ──────────────────────────────────────────────────────────

// function ConfirmModal({
//   message,
//   onConfirm,
//   onCancel,
// }: {
//   message: React.ReactNode;
//   onConfirm: () => void;
//   onCancel: () => void;
// }) {
//   return (
//     <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/30 backdrop-blur-sm">
//       <div className="mx-4 w-full max-w-sm rounded-xl bg-white p-6 shadow-xl">
//         <p className="mb-5 text-sm text-slate-700">{message}</p>

//         <div className="flex justify-end gap-3">
//           <button
//             onClick={onCancel}
//             className="rounded-lg border border-slate-200 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50"
//           >
//             Cancel
//           </button>

//           <button
//             onClick={onConfirm}
//             className="rounded-lg bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700"
//           >
//             Confirm
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// // ─── Main Component ─────────────────────────────────────────────────────────

// export default function Slider() {
//   const [sliders, setSliders] = useState<SliderItem[]>([]);

//   const [loading, setLoading] = useState(false);

//   const [fetching, setFetching] = useState(true);

//   const [title, setTitle] = useState("");

//   const [isActive, setIsActive] = useState(true);

//   const [file, setFile] = useState<File | null>(null);

//   // ─── Confirm States ─────────────────────────────────────────────────────────

//   const [confirmToggle, setConfirmToggle] = useState<SliderItem | null>(null);

//   const [confirmDelete, setConfirmDelete] = useState<SliderItem | null>(null);

//   const [deleting, setDeleting] = useState(false);

//   // ─── Fetch Sliders ──────────────────────────────────────────────────────────

//   const fetchSliders = async () => {
//     try {
//       setFetching(true);

//       const res = await serverFetch.get("/settings/admin/slider");

//       const data = await res.json();

//       if (!res.ok) {
//         throw new Error(data.message || "Failed to fetch sliders");
//       }

//       setSliders(data.data || []);
//     } catch (error: any) {
//       toast.error(error.message);
//     } finally {
//       setFetching(false);
//     }
//   };

//   useEffect(() => {
//     const loadSliders = async () => {
//       await fetchSliders();
//     };

//     loadSliders();
//   }, []);

//   // ─── Reset Form ─────────────────────────────────────────────────────────────

//   const resetForm = () => {
//     setTitle("");

//     setIsActive(true);

//     setFile(null);
//   };

//   // ─── Create Slider ──────────────────────────────────────────────────────────

//   const handleSave = async () => {
//     if (!title.trim()) {
//       toast.error("Title is required");

//       return;
//     }

//     if (!file) {
//       toast.error("Slider image is required");

//       return;
//     }

//     const uploadToastId = toast.loading("Uploading slider image...");

//     try {
//       setLoading(true);

//       const formData = new FormData();

//       formData.append("title", title);

//       formData.append("isActive", String(isActive));

//       formData.append("file", file);

//       const res = await serverFetch.post("/settings/slider", {
//         body: formData,
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         throw new Error(data.message || "Failed to create slider");
//       }

//       toast.success("Slider created successfully", { id: uploadToastId });

//       resetForm();

//       fetchSliders();
//     } catch (error: any) {
//       toast.error(error.message, { id: uploadToastId });
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ─── Toggle Slider Status (with confirm) ────────────────────────────────────

//   const confirmToggleAction = async () => {
//     if (!confirmToggle) return;

//     const slider = confirmToggle;

//     setConfirmToggle(null);

//     try {
//       const res = await serverFetch.patch(
//         `/settings/slider/toggle-status/${slider.id}`,
//       );

//       const data = await res.json();

//       if (!res.ok) {
//         throw new Error(data.message || "Failed to update slider");
//       }

//       toast.success(
//         `Slider "${slider.title}" ${slider.isActive ? "deactivated" : "activated"} successfully`,
//       );

//       fetchSliders();
//     } catch (error: any) {
//       toast.error(error.message);
//     }
//   };

//   // ─── Delete Slider (with confirm) ───────────────────────────────────────────

//   const confirmDeleteAction = async () => {
//     if (!confirmDelete) return;

//     const slider = confirmDelete;

//     setConfirmDelete(null);

//     setDeleting(true);

//     const deleteToastId = toast.loading(`Deleting "${slider.title}"...`);

//     try {
//       const res = await serverFetch.delete(`/settings/slider/${slider.id}`);

//       const data = await res.json();

//       if (!res.ok) {
//         throw new Error(data.message || "Failed to delete slider");
//       }

//       toast.success(`Slider "${slider.title}" deleted successfully`, {
//         id: deleteToastId,
//       });

//       fetchSliders();
//     } catch (error: any) {
//       toast.error(error.message, { id: deleteToastId });
//     } finally {
//       setDeleting(false);
//     }
//   };

//   return (
//     <>
//       {/* Toggle Status Confirm Modal */}
//       {confirmToggle && (
//         <ConfirmModal
//           message={
//             <>
//               Are you sure you want to{" "}
//               <span className="font-semibold text-orange-500">
//                 {confirmToggle.isActive ? "deactivate" : "activate"}
//               </span>{" "}
//               the slider{" "}
//               <span className="font-semibold text-orange-600">
//                 &quot;{confirmToggle.title}&quot;
//               </span>
//               ?
//             </>
//           }
//           onConfirm={confirmToggleAction}
//           onCancel={() => setConfirmToggle(null)}
//         />
//       )}

//       {/* Delete Confirm Modal */}
//       {confirmDelete && (
//         <ConfirmModal
//           message={
//             <>
//               Are you sure you want to delete the slider{" "}
//               <span className="font-semibold text-orange-500">
//                 &quot;{confirmDelete.title}&quot;
//               </span>
//               ? This action cannot be undone.
//             </>
//           }
//           onConfirm={confirmDeleteAction}
//           onCancel={() => setConfirmDelete(null)}
//         />
//       )}

//       <div className="space-y-6">
//         {/* Header */}

//         <div>
//           <h2 className="text-2xl font-semibold tracking-tight">
//             Slider Management
//           </h2>

//           <p className="text-sm text-muted-foreground">
//             Manage homepage banner sliders
//           </p>
//         </div>

//         {/* Form */}

//         <Card>
//           <CardHeader>
//             <CardTitle>Add New Slider</CardTitle>
//           </CardHeader>

//           <CardContent className="space-y-5">
//             {/* Title */}

//             <div className="space-y-2">
//               <Label>
//                 Title <span className="text-red-500">*</span>
//               </Label>

//               <Input
//                 placeholder="Enter slider title"
//                 value={title}
//                 onChange={(e) => setTitle(e.target.value)}
//               />
//             </div>

//             {/* File Upload */}

//             <div className="space-y-2">
//               <Label>
//                 Banner Image <span className="text-red-500">*</span>
//               </Label>

//               <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-dashed p-4 transition hover:bg-muted/50">
//                 <div className="rounded-full bg-muted p-2">
//                   <ImageIcon className="h-5 w-5" />
//                 </div>

//                 <div className="flex-1">
//                   <p className="text-sm font-medium">
//                     {file ? file.name : "Choose slider image"}
//                   </p>

//                   <p className="text-xs text-muted-foreground">
//                     Recommended size: 1689 × 600
//                   </p>
//                 </div>

//                 <Input
//                   type="file"
//                   accept="image/*"
//                   className="hidden"
//                   onChange={(e) => setFile(e.target.files?.[0] || null)}
//                 />
//               </label>
//             </div>

//             {/* Status */}

//             <div className="flex items-center gap-3">
//               <input
//                 type="checkbox"
//                 id="isActive"
//                 checked={isActive}
//                 onChange={(e) => setIsActive(e.target.checked)}
//               />

//               <Label htmlFor="isActive">Active Slider</Label>
//             </div>

//             {/* Buttons */}

//             <div className="flex justify-end gap-3">
//               <Button variant="outline" type="button" onClick={resetForm}>
//                 <RefreshCw className="mr-2 h-4 w-4" />
//                 Reset
//               </Button>

//               <Button
//                 type="button"
//                 disabled={loading}
//                 onClick={handleSave}
//                 className="bg-red-500 text-white hover:bg-red-600"
//               >
//                 {loading ? (
//                   <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                 ) : (
//                   <Save className="mr-2 h-4 w-4" />
//                 )}
//                 Save Slider
//               </Button>
//             </div>
//           </CardContent>
//         </Card>

//         {/* Table */}

//         <Card>
//           <CardHeader>
//             <div className="flex items-center justify-between">
//               <CardTitle>Slider History</CardTitle>

//               <div className="rounded-full border px-3 py-1 text-xs text-muted-foreground">
//                 {sliders.length} item{sliders.length > 1 ? "s" : ""}
//               </div>
//             </div>
//           </CardHeader>

//           <CardContent className="p-0">
//             <Table>
//               <TableHeader>
//                 <TableRow>
//                   <TableHead>#</TableHead>

//                   <TableHead>Image</TableHead>

//                   <TableHead>Title</TableHead>

//                   <TableHead>Status</TableHead>

//                   <TableHead>Created</TableHead>

//                   <TableHead className="text-right">Actions</TableHead>
//                 </TableRow>
//               </TableHeader>

//               <TableBody>
//                 {fetching ? (
//                   <TableRow>
//                     <TableCell colSpan={6} className="py-10 text-center">
//                       <Loader2 className="mx-auto h-5 w-5 animate-spin" />
//                     </TableCell>
//                   </TableRow>
//                 ) : sliders.length === 0 ? (
//                   <TableRow>
//                     <TableCell
//                       colSpan={6}
//                       className="py-10 text-center text-muted-foreground"
//                     >
//                       No sliders found
//                     </TableCell>
//                   </TableRow>
//                 ) : (
//                   sliders.map((slider, index) => (
//                     <TableRow key={slider.id}>
//                       <TableCell>{index + 1}</TableCell>

//                       <TableCell>
//                         <div className="relative h-16 w-28 overflow-hidden rounded-md border">
//                           <Image
//                             src={slider.imageUrl}
//                             alt={slider.title}
//                             fill
//                             className="object-cover"
//                           />
//                         </div>
//                       </TableCell>

//                       <TableCell className="font-medium">
//                         {slider.title}
//                       </TableCell>

//                       <TableCell>
//                         <Badge
//                           className={
//                             slider.isActive
//                               ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100"
//                               : "bg-red-100 text-red-700 hover:bg-red-100"
//                           }
//                         >
//                           {slider.isActive ? "Active" : "Inactive"}
//                         </Badge>
//                       </TableCell>

//                       <TableCell className="text-sm text-muted-foreground">
//                         {new Date(slider.createdAt).toLocaleDateString()}
//                       </TableCell>

//                       <TableCell>
//                         <div className="flex justify-end gap-2">
//                           {/* Activate / Deactivate button — now opens confirm modal */}
//                           <Button
//                             size="sm"
//                             variant="outline"
//                             onClick={() => setConfirmToggle(slider)}
//                           >
//                             {slider.isActive ? "Deactivate" : "Activate"}
//                           </Button>

//                           {/* Delete button — now opens confirm modal */}
//                           <Button
//                             size="icon"
//                             variant="destructive"
//                             onClick={() => setConfirmDelete(slider)}
//                           >
//                             <Trash2 className="h-4 w-4" />
//                           </Button>
//                         </div>
//                       </TableCell>
//                     </TableRow>
//                   ))
//                 )}
//               </TableBody>
//             </Table>
//           </CardContent>
//         </Card>
//       </div>
//     </>
//   );
// }

// /* eslint-disable @typescript-eslint/no-explicit-any */

// "use client";

// import Image from "next/image";
// import { useEffect, useState } from "react";

// import {
//   Image as ImageIcon,
//   Loader2,
//   RefreshCw,
//   Save,
//   Trash2,
// } from "lucide-react";

// import { toast } from "sonner";

// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";

// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { serverFetch } from "@/lib/server-fetch";

// // ─── Types ───────────────────────────────────────────────────────────────────

// type Position = "center" | "left";

// interface SliderItem {
//   id: number;
//   title: string;
//   imageUrl: string;
//   isActive: boolean;
//   createdAt: string;
//   position: Position;
//   link: string;
// }

// // ─── Confirm Modal ────────────────────────────────────────────────────────────

// function ConfirmModal({
//   message,
//   onConfirm,
//   onCancel,
// }: {
//   message: React.ReactNode;
//   onConfirm: () => void;
//   onCancel: () => void;
// }) {
//   return (
//     <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/30 backdrop-blur-sm">
//       <div className="mx-4 w-full max-w-sm rounded-xl bg-white p-6 shadow-xl">
//         <p className="mb-5 text-sm text-slate-700">{message}</p>
//         <div className="flex justify-end gap-3">
//           <button
//             onClick={onCancel}
//             className="rounded-lg border border-slate-200 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={onConfirm}
//             className="rounded-lg bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700"
//           >
//             Confirm
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// // ─── Position Toggle ──────────────────────────────────────────────────────────

// function PositionToggle({
//   value,
//   onChange,
// }: {
//   value: Position;
//   onChange: (v: Position) => void;
// }) {
//   return (
//     <div className="flex w-fit rounded-lg border border-slate-200 p-1 gap-1">
//       {(["center", "left"] as Position[]).map((pos) => (
//         <button
//           key={pos}
//           type="button"
//           onClick={() => onChange(pos)}
//           className={`rounded-md px-4 py-1.5 text-sm font-medium capitalize transition-all ${
//             value === pos
//               ? "bg-red-500 text-white shadow-sm"
//               : "text-slate-500 hover:bg-slate-100"
//           }`}
//         >
//           {pos === "center" ? "⬛ Center" : "⬜ Left"}
//         </button>
//       ))}
//     </div>
//   );
// }

// // ─── Main Component ───────────────────────────────────────────────────────────

// export default function Slider() {
//   const [sliders, setSliders] = useState<SliderItem[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [fetching, setFetching] = useState(true);

//   // ─── Form State ─────────────────────────────────────────────────────────────
//   const [title, setTitle] = useState("");
//   const [isActive, setIsActive] = useState(true);
//   const [file, setFile] = useState<File | null>(null);
//   const [position, setPosition] = useState<Position>("center");
//   const [link, setLink] = useState("");

//   // ─── Confirm States ─────────────────────────────────────────────────────────
//   const [confirmToggle, setConfirmToggle] = useState<SliderItem | null>(null);
//   const [confirmDelete, setConfirmDelete] = useState<SliderItem | null>(null);
//   const [deleting, setDeleting] = useState(false);

//   // ─── Fetch ──────────────────────────────────────────────────────────────────

//   const fetchSliders = async () => {
//     try {
//       setFetching(true);
//       const res = await serverFetch.get("/settings/admin/slider");
//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message || "Failed to fetch sliders");
//       setSliders(data.data || []);
//     } catch (error: any) {
//       toast.error(error.message);
//     } finally {
//       setFetching(false);
//     }
//   };

//   useEffect(() => {
//     const loadSliders = async () => {
//       await fetchSliders();
//     };

//     loadSliders();
//   }, []);

//   // ─── Reset ──────────────────────────────────────────────────────────────────

//   const resetForm = () => {
//     setTitle("");
//     setIsActive(true);
//     setFile(null);
//     setPosition("center");
//     setLink("");
//   };

//   // ─── Create ─────────────────────────────────────────────────────────────────

//   const handleSave = async () => {
//     if (!title.trim()) return toast.error("Title is required");
//     if (!file) return toast.error("Slider image is required");

//     const uploadToastId = toast.loading("Uploading slider image...");

//     try {
//       setLoading(true);

//       const formData = new FormData();
//       formData.append("title", title);
//       formData.append("isActive", String(isActive));
//       formData.append("position", position);
//       formData.append("link", link);
//       formData.append("file", file);

//       const res = await serverFetch.post("/settings/slider", {
//         body: formData,
//       });
//       const data = await res.json();

//       if (!res.ok) throw new Error(data.message || "Failed to create slider");

//       toast.success("Slider created successfully", { id: uploadToastId });
//       resetForm();
//       fetchSliders();
//     } catch (error: any) {
//       toast.error(error.message, { id: uploadToastId });
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ─── Toggle ─────────────────────────────────────────────────────────────────

//   const confirmToggleAction = async () => {
//     if (!confirmToggle) return;
//     const slider = confirmToggle;
//     setConfirmToggle(null);
//     try {
//       const res = await serverFetch.patch(
//         `/settings/slider/toggle-status/${slider.id}`,
//       );
//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message || "Failed to update slider");
//       toast.success(
//         `Slider "${slider.title}" ${slider.isActive ? "deactivated" : "activated"} successfully`,
//       );
//       fetchSliders();
//     } catch (error: any) {
//       toast.error(error.message);
//     }
//   };

//   // ─── Delete ─────────────────────────────────────────────────────────────────

//   const confirmDeleteAction = async () => {
//     if (!confirmDelete) return;
//     const slider = confirmDelete;
//     setConfirmDelete(null);
//     setDeleting(true);
//     const deleteToastId = toast.loading(`Deleting "${slider.title}"...`);
//     try {
//       const res = await serverFetch.delete(`/settings/slider/${slider.id}`);
//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message || "Failed to delete slider");
//       toast.success(`Slider "${slider.title}" deleted successfully`, {
//         id: deleteToastId,
//       });
//       fetchSliders();
//     } catch (error: any) {
//       toast.error(error.message, { id: deleteToastId });
//     } finally {
//       setDeleting(false);
//     }
//   };

//   // ─── Render ─────────────────────────────────────────────────────────────────

//   return (
//     <>
//       {/* Toggle Confirm */}
//       {confirmToggle && (
//         <ConfirmModal
//           message={
//             <>
//               Are you sure you want to{" "}
//               <span className="font-semibold text-orange-500">
//                 {confirmToggle.isActive ? "deactivate" : "activate"}
//               </span>{" "}
//               the slider{" "}
//               <span className="font-semibold text-orange-600">
//                 &quot;{confirmToggle.title}&quot;
//               </span>
//               ?
//             </>
//           }
//           onConfirm={confirmToggleAction}
//           onCancel={() => setConfirmToggle(null)}
//         />
//       )}

//       {/* Delete Confirm */}
//       {confirmDelete && (
//         <ConfirmModal
//           message={
//             <>
//               Are you sure you want to delete the slider{" "}
//               <span className="font-semibold text-orange-500">
//                 &quot;{confirmDelete.title}&quot;
//               </span>
//               ? This action cannot be undone.
//             </>
//           }
//           onConfirm={confirmDeleteAction}
//           onCancel={() => setConfirmDelete(null)}
//         />
//       )}

//       <div className="space-y-6">
//         {/* Header */}
//         <div>
//           <h2 className="text-2xl font-semibold tracking-tight">
//             Slider Management
//           </h2>
//           <p className="text-sm text-muted-foreground">
//             Manage homepage banner sliders
//           </p>
//         </div>

//         {/* Form */}
//         <Card>
//           <CardHeader>
//             <CardTitle>Add New Slider</CardTitle>
//           </CardHeader>

//           <CardContent className="space-y-5">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               {/* Title */}
//               <div className="space-y-2">
//                 <Label>
//                   Title <span className="text-red-500">*</span>
//                 </Label>
//                 <Input
//                   placeholder="Enter slider title"
//                   value={title}
//                   onChange={(e) => setTitle(e.target.value)}
//                 />
//               </div>

//               {/* Link */}
//               <div className="space-y-2">
//                 <Label>
//                   Link{" "}
//                   <span className="text-xs text-muted-foreground">
//                     (optional — where to go on click)
//                   </span>
//                 </Label>
//                 <Input
//                   placeholder="https://example.com/product"
//                   value={link}
//                   onChange={(e) => setLink(e.target.value)}
//                 />
//               </div>
//             </div>

//             {/* File Upload */}
//             <div className="space-y-2">
//               <Label>
//                 Banner Image <span className="text-red-500">*</span>
//               </Label>
//               <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-dashed p-4 transition hover:bg-muted/50">
//                 <div className="rounded-full bg-muted p-2">
//                   <ImageIcon className="h-5 w-5" />
//                 </div>
//                 <div className="flex-1">
//                   <p className="text-sm font-medium">
//                     {file ? file.name : "Choose slider image"}
//                   </p>
//                   <p className="text-xs text-muted-foreground">
//                     Recommended size: 1689 × 600
//                   </p>
//                 </div>
//                 <Input
//                   type="file"
//                   accept="image/*"
//                   className="hidden"
//                   onChange={(e) => setFile(e.target.files?.[0] || null)}
//                 />
//               </label>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               {/* Status */}
//               <div className="flex items-center gap-3">
//                 <input
//                   type="checkbox"
//                   id="isActive"
//                   checked={isActive}
//                   onChange={(e) => setIsActive(e.target.checked)}
//                 />
//                 <Label htmlFor="isActive">Active Slider</Label>
//               </div>
//               {/* Position */}
//               <div className="space-y-2">
//                 <Label>Content Position</Label>
//                 <PositionToggle value={position} onChange={setPosition} />
//                 <p className="text-xs text-muted-foreground">
//                   Controls where the overlay text/content sits on the banner
//                 </p>
//               </div>
//             </div>

//             {/* Buttons */}
//             <div className="flex justify-end gap-3">
//               <Button variant="outline" type="button" onClick={resetForm}>
//                 <RefreshCw className="mr-2 h-4 w-4" />
//                 Reset
//               </Button>
//               <Button
//                 type="button"
//                 disabled={loading}
//                 onClick={handleSave}
//                 className="bg-red-500 text-white hover:bg-red-600"
//               >
//                 {loading ? (
//                   <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                 ) : (
//                   <Save className="mr-2 h-4 w-4" />
//                 )}
//                 Save Slider
//               </Button>
//             </div>
//           </CardContent>
//         </Card>

//         {/* Table */}
//         <Card>
//           <CardHeader>
//             <div className="flex items-center justify-between">
//               <CardTitle>Slider History</CardTitle>
//               <div className="rounded-full border px-3 py-1 text-xs text-muted-foreground">
//                 {sliders.length} item{sliders.length > 1 ? "s" : ""}
//               </div>
//             </div>
//           </CardHeader>

//           <CardContent className="p-0">
//             <Table>
//               <TableHeader>
//                 <TableRow>
//                   <TableHead>#</TableHead>
//                   <TableHead>Image</TableHead>
//                   <TableHead>Title</TableHead>
//                   <TableHead>Position</TableHead>
//                   <TableHead>Link</TableHead>
//                   <TableHead>Status</TableHead>
//                   <TableHead>Created</TableHead>
//                   <TableHead className="text-right">Actions</TableHead>
//                 </TableRow>
//               </TableHeader>

//               <TableBody>
//                 {fetching ? (
//                   <TableRow>
//                     <TableCell colSpan={8} className="py-10 text-center">
//                       <Loader2 className="mx-auto h-5 w-5 animate-spin" />
//                     </TableCell>
//                   </TableRow>
//                 ) : sliders.length === 0 ? (
//                   <TableRow>
//                     <TableCell
//                       colSpan={8}
//                       className="py-10 text-center text-muted-foreground"
//                     >
//                       No sliders found
//                     </TableCell>
//                   </TableRow>
//                 ) : (
//                   sliders.map((slider, index) => (
//                     <TableRow key={slider.id}>
//                       <TableCell>{index + 1}</TableCell>

//                       {/* ── Image: dashboard-এ শুধু display, click নেই ── */}
//                       <TableCell>
//                         <div className="relative h-16 w-28 overflow-hidden rounded-md border">
//                           <Image
//                             src={slider.imageUrl}
//                             alt={slider.title}
//                             fill
//                             className="object-cover"
//                           />
//                         </div>
//                       </TableCell>

//                       <TableCell className="font-medium">
//                         {slider.title}
//                       </TableCell>

//                       {/* Position Badge */}
//                       <TableCell>
//                         <Badge
//                           className={
//                             slider.position === "center"
//                               ? "bg-blue-100 text-blue-700 hover:bg-blue-100 capitalize"
//                               : "bg-purple-100 text-purple-700 hover:bg-purple-100 capitalize"
//                           }
//                         >
//                           {slider.position ?? "center"}
//                         </Badge>
//                       </TableCell>

//                       {/* Link — শুধু text হিসেবে দেখাবে */}
//                       <TableCell className="max-w-[160px]">
//                         {slider.link ? (
//                           <a
//                             href={slider.link}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="block truncate text-xs text-blue-600 underline underline-offset-2 hover:text-blue-800"
//                             title={slider.link}
//                           >
//                             {slider.link}
//                           </a>
//                         ) : (
//                           <span className="text-xs text-muted-foreground">
//                             —
//                           </span>
//                         )}
//                       </TableCell>

//                       {/* Status */}
//                       <TableCell>
//                         <Badge
//                           className={
//                             slider.isActive
//                               ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100"
//                               : "bg-red-100 text-red-700 hover:bg-red-100"
//                           }
//                         >
//                           {slider.isActive ? "Active" : "Inactive"}
//                         </Badge>
//                       </TableCell>

//                       <TableCell className="text-sm text-muted-foreground">
//                         {new Date(slider.createdAt).toLocaleDateString()}
//                       </TableCell>

//                       <TableCell>
//                         <div className="flex justify-end gap-2">
//                           <Button
//                             size="sm"
//                             variant="outline"
//                             onClick={() => setConfirmToggle(slider)}
//                           >
//                             {slider.isActive ? "Deactivate" : "Activate"}
//                           </Button>
//                           <Button
//                             size="icon"
//                             variant="destructive"
//                             onClick={() => setConfirmDelete(slider)}
//                           >
//                             <Trash2 className="h-4 w-4" />
//                           </Button>
//                         </div>
//                       </TableCell>
//                     </TableRow>
//                   ))
//                 )}
//               </TableBody>
//             </Table>
//           </CardContent>
//         </Card>
//       </div>
//     </>
//   );
// }

/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import {
  AlignCenter,
  AlignLeft,
  ChevronDown,
  ExternalLink,
  ImageIcon,
  Loader2,
  RefreshCw,
  Save,
  ToggleLeft,
  ToggleRight,
  Trash2,
} from "lucide-react";

import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { serverFetch } from "@/lib/server-fetch";

// ─── Types ────────────────────────────────────────────────────────────────────

type Position = "center" | "left";

interface SliderItem {
  id: number;
  title: string;
  imageUrl: string;
  isActive: boolean;
  createdAt: string;
  position: Position;
  link: string;
}

// ─── Toggle Confirm Modal ─────────────────────────────────────────────────────

function ToggleConfirmModal({
  slider,
  onConfirm,
  onCancel,
  loading,
}: {
  slider: SliderItem;
  onConfirm: () => void;
  onCancel: () => void;
  loading: boolean;
}) {
  const willDeactivate = slider.isActive;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="mx-4 w-full max-w-md rounded-2xl bg-white shadow-2xl overflow-hidden">
        {/* Top accent */}
        <div
          className={`h-1.5 w-full ${willDeactivate ? "bg-gradient-to-r from-orange-400 to-red-500" : "bg-gradient-to-r from-emerald-400 to-teal-500"}`}
        />

        <div className="p-6">
          {/* Icon */}
          <div
            className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${willDeactivate ? "bg-orange-50" : "bg-emerald-50"}`}
          >
            {willDeactivate ? (
              <ToggleLeft className="h-6 w-6 text-orange-500" />
            ) : (
              <ToggleRight className="h-6 w-6 text-emerald-500" />
            )}
          </div>

          <h3 className="text-lg font-semibold text-slate-800">
            {willDeactivate ? "Deactivate Slider?" : "Activate Slider?"}
          </h3>
          <p className="mt-1.5 text-sm text-slate-500">
            The slider{" "}
            <span className="font-semibold text-slate-700">
              &quot;{slider.title}&quot;
            </span>{" "}
            will be{" "}
            <span
              className={`font-semibold ${willDeactivate ? "text-orange-600" : "text-emerald-600"}`}
            >
              {willDeactivate ? "hidden from homepage" : "shown on homepage"}
            </span>
            .
          </p>

          {/* Preview */}
          <div className="mt-4 flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 p-3">
            <div className="relative h-14 w-20 flex-shrink-0 overflow-hidden rounded-lg border">
              <Image
                src={slider.imageUrl}
                alt={slider.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-slate-700">
                {slider.title}
              </p>
              <div className="mt-1 flex items-center gap-1.5">
                <Badge
                  className={`text-xs ${slider.isActive ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100" : "bg-red-100 text-red-700 hover:bg-red-100"}`}
                >
                  {slider.isActive ? "Active" : "Inactive"}
                </Badge>
                <span className="text-slate-300">→</span>
                <Badge
                  className={`text-xs ${willDeactivate ? "bg-red-100 text-red-700 hover:bg-red-100" : "bg-emerald-100 text-emerald-700 hover:bg-emerald-100"}`}
                >
                  {willDeactivate ? "Inactive" : "Active"}
                </Badge>
              </div>
            </div>
          </div>

          <div className="mt-5 flex justify-end gap-2.5">
            <button
              onClick={onCancel}
              disabled={loading}
              className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              disabled={loading}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white transition disabled:opacity-70 ${
                willDeactivate
                  ? "bg-orange-500 hover:bg-orange-600"
                  : "bg-emerald-500 hover:bg-emerald-600"
              }`}
            >
              {loading && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
              {willDeactivate ? "Yes, Deactivate" : "Yes, Activate"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Delete Confirm Modal ─────────────────────────────────────────────────────

function DeleteConfirmModal({
  slider,
  onConfirm,
  onCancel,
  loading,
}: {
  slider: SliderItem;
  onConfirm: () => void;
  onCancel: () => void;
  loading: boolean;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="mx-4 w-full max-w-md rounded-2xl bg-white shadow-2xl overflow-hidden">
        <div className="h-1.5 w-full bg-gradient-to-r from-red-500 to-rose-600" />
        <div className="p-6">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-red-50">
            <Trash2 className="h-6 w-6 text-red-500" />
          </div>

          <h3 className="text-lg font-semibold text-slate-800">
            Delete Slider?
          </h3>
          <p className="mt-1.5 text-sm text-slate-500">
            This will permanently delete{" "}
            <span className="font-semibold text-slate-700">
              &quot;{slider.title}&quot;
            </span>{" "}
            and remove the image from storage. This action{" "}
            <span className="font-semibold text-red-600">cannot be undone</span>
            .
          </p>

          <div className="mt-4 flex items-center gap-3 rounded-xl border border-red-100 bg-red-50/50 p-3">
            <div className="relative h-14 w-20 flex-shrink-0 overflow-hidden rounded-lg border">
              <Image
                src={slider.imageUrl}
                alt={slider.title}
                fill
                className="object-cover opacity-75"
              />
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-slate-700">
                {slider.title}
              </p>
              <p className="text-xs text-slate-400">
                {new Date(slider.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>

          <div className="mt-5 flex justify-end gap-2.5">
            <button
              onClick={onCancel}
              disabled={loading}
              className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              disabled={loading}
              className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700 disabled:opacity-70"
            >
              {loading && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
              Yes, Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Status Dropdown ──────────────────────────────────────────────────────────

function StatusDropdown({
  slider,
  onToggle,
}: {
  slider: SliderItem;
  onToggle: (slider: SliderItem) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // outside click close
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative inline-block">
      <button
        onClick={() => setOpen((v) => !v)}
        className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold transition-all ${
          slider.isActive
            ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
            : "bg-red-100 text-red-700 hover:bg-red-200"
        }`}
      >
        <span
          className={`h-1.5 w-1.5 rounded-full ${slider.isActive ? "bg-emerald-500" : "bg-red-500"}`}
        />
        {slider.isActive ? "Active" : "Inactive"}
        <ChevronDown
          className={`h-3 w-3 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute left-0 top-full z-30 mt-1.5 w-40 rounded-xl border border-slate-100 bg-white py-1 shadow-xl">
          <button
            onClick={() => {
              setOpen(false);
              onToggle(slider);
            }}
            className={`flex w-full items-center gap-2.5 px-3 py-2 text-sm transition hover:bg-slate-50 ${
              slider.isActive ? "text-orange-600" : "text-emerald-600"
            }`}
          >
            {slider.isActive ? (
              <>
                <ToggleLeft className="h-4 w-4" />
                Deactivate
              </>
            ) : (
              <>
                <ToggleRight className="h-4 w-4" />
                Activate
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Position Toggle ──────────────────────────────────────────────────────────

function PositionToggle({
  value,
  onChange,
}: {
  value: Position;
  onChange: (v: Position) => void;
}) {
  return (
    <div className="flex w-fit rounded-xl border border-slate-200 bg-slate-50 p-1 gap-1">
      {(["center", "left"] as Position[]).map((pos) => (
        <button
          key={pos}
          type="button"
          onClick={() => onChange(pos)}
          className={`flex items-center gap-1.5 rounded-lg px-4 py-1.5 text-sm font-medium capitalize transition-all ${
            value === pos
              ? "bg-white text-slate-800 shadow-sm ring-1 ring-slate-200"
              : "text-slate-400 hover:text-slate-600"
          }`}
        >
          {pos === "center" ? (
            <AlignCenter className="h-3.5 w-3.5" />
          ) : (
            <AlignLeft className="h-3.5 w-3.5" />
          )}
          {pos.charAt(0).toUpperCase() + pos.slice(1)}
        </button>
      ))}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function Slider() {
  const [sliders, setSliders] = useState<SliderItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const [title, setTitle] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [position, setPosition] = useState<Position>("center");
  const [link, setLink] = useState("");

  const [confirmToggle, setConfirmToggle] = useState<SliderItem | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<SliderItem | null>(null);
  const [toggling, setToggling] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // ─── Fetch ─────────────────────────────────────────────────────────────────

  const fetchSliders = async () => {
    try {
      setFetching(true);
      const res = await serverFetch.get("/settings/admin/slider");
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to fetch sliders");
      setSliders(data.data || []);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    const loadSliders = async () => {
      await fetchSliders();
    };

    loadSliders();
  }, []);
  // ─── File preview ──────────────────────────────────────────────────────────

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] || null;
    setFile(selected);
    if (selected) {
      const url = URL.createObjectURL(selected);
      setPreview(url);
    } else {
      setPreview(null);
    }
  };

  // ─── Reset ─────────────────────────────────────────────────────────────────

  const resetForm = () => {
    setTitle("");
    setIsActive(true);
    setFile(null);
    setPreview(null);
    setPosition("center");
    setLink("");
  };

  // ─── Create ────────────────────────────────────────────────────────────────

  const handleSave = async () => {
    if (!title.trim()) return toast.error("Title is required");
    if (!file) return toast.error("Slider image is required");

    const toastId = toast.loading("Uploading slider image...");
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("title", title);
      formData.append("isActive", String(isActive));
      formData.append("position", position);
      formData.append("link", link);
      formData.append("file", file);

      const res = await serverFetch.post("/settings/slider", {
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to create slider");

      toast.success("Slider created successfully", { id: toastId });
      resetForm();
      fetchSliders();
    } catch (error: any) {
      toast.error(error.message, { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  // ─── Toggle ────────────────────────────────────────────────────────────────

  const confirmToggleAction = async () => {
    if (!confirmToggle) return;
    const slider = confirmToggle;
    setToggling(true);
    try {
      const res = await serverFetch.patch(
        `/settings/slider/toggle-status/${slider.id}`,
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to update slider");
      toast.success(
        `"${slider.title}" ${slider.isActive ? "deactivated" : "activated"} successfully`,
      );
      setConfirmToggle(null);
      fetchSliders();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setToggling(false);
    }
  };

  // ─── Delete ────────────────────────────────────────────────────────────────

  const confirmDeleteAction = async () => {
    if (!confirmDelete) return;
    const slider = confirmDelete;
    setDeleting(true);
    const toastId = toast.loading(`Deleting "${slider.title}"...`);
    try {
      const res = await serverFetch.delete(`/settings/slider/${slider.id}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to delete slider");
      toast.success(`"${slider.title}" deleted successfully`, { id: toastId });
      setConfirmDelete(null);
      fetchSliders();
    } catch (error: any) {
      toast.error(error.message, { id: toastId });
    } finally {
      setDeleting(false);
    }
  };

  // ─── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      {/* Modals */}
      {confirmToggle && (
        <ToggleConfirmModal
          slider={confirmToggle}
          onConfirm={confirmToggleAction}
          onCancel={() => setConfirmToggle(null)}
          loading={toggling}
        />
      )}
      {confirmDelete && (
        <DeleteConfirmModal
          slider={confirmDelete}
          onConfirm={confirmDeleteAction}
          onCancel={() => setConfirmDelete(null)}
          loading={deleting}
        />
      )}

      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-800">
              Slider Management
            </h2>
            <p className="text-sm text-muted-foreground">
              Manage homepage banner sliders
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            <span className="text-xs font-medium text-slate-600">
              {sliders.filter((s) => s.isActive).length} active
            </span>
            <span className="text-slate-300">·</span>
            <span className="text-xs text-slate-400">
              {sliders.length} total
            </span>
          </div>
        </div>

        {/* Form */}
        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="border-b border-slate-100 pb-4">
            <CardTitle className="text-base font-semibold text-slate-700">
              Add New Slider
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-5 pt-5">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {/* Title */}
              <div className="space-y-1.5">
                <Label className="text-sm font-medium text-slate-700">
                  Title <span className="text-red-500">*</span>
                </Label>
                <Input
                  placeholder="Enter slider title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="border-slate-200 focus-visible:ring-slate-400"
                />
              </div>

              {/* Link */}
              <div className="space-y-1.5">
                <Label className="text-sm font-medium text-slate-700">
                  Link{" "}
                  <span className="text-xs font-normal text-muted-foreground">
                    (optional)
                  </span>
                </Label>
                <Input
                  placeholder="https://example.com/product"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  className="border-slate-200 focus-visible:ring-slate-400"
                />
              </div>
            </div>

            {/* File Upload */}
            <div className="space-y-1.5">
              <Label className="text-sm font-medium text-slate-700">
                Banner Image <span className="text-red-500">*</span>
              </Label>
              <label className="group flex cursor-pointer items-center gap-4 rounded-xl border border-dashed border-slate-300 p-4 transition hover:border-slate-400 hover:bg-slate-50">
                {preview ? (
                  <div className="relative h-16 w-28 flex-shrink-0 overflow-hidden rounded-lg border">
                    <Image
                      src={preview}
                      alt="preview"
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-lg bg-slate-100 group-hover:bg-slate-200 transition">
                    <ImageIcon className="h-6 w-6 text-slate-400" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-700">
                    {file ? file.name : "Choose slider image"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Recommended: 1689 × 600px · PNG, JPG, WEBP
                  </p>
                </div>
                <Input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {/* Status */}
              <div className="space-y-1.5">
                <Label className="text-sm font-medium text-slate-700">
                  Status
                </Label>
                <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 p-3 transition hover:bg-slate-50">
                  <div className="relative">
                    <input
                      type="checkbox"
                      id="isActive"
                      checked={isActive}
                      onChange={(e) => setIsActive(e.target.checked)}
                      className="sr-only"
                    />
                    <div
                      className={`h-5 w-9 rounded-full transition-colors ${isActive ? "bg-emerald-500" : "bg-slate-200"}`}
                    >
                      <div
                        className={`h-4 w-4 transform rounded-full bg-white shadow transition-transform mt-0.5 ${isActive ? "translate-x-4 ml-0.5" : "translate-x-0.5"}`}
                      />
                    </div>
                  </div>
                  <span className="text-sm text-slate-600">
                    {isActive ? (
                      <span className="font-medium text-emerald-600">
                        Active — visible on homepage
                      </span>
                    ) : (
                      <span className="text-slate-400">
                        Inactive — hidden from homepage
                      </span>
                    )}
                  </span>
                </label>
              </div>

              {/* Position */}
              <div className="space-y-1.5">
                <Label className="text-sm font-medium text-slate-700">
                  Content Position
                </Label>
                <PositionToggle value={position} onChange={setPosition} />
                <p className="text-xs text-muted-foreground">
                  Where overlay text sits on the banner
                </p>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-2.5 border-t border-slate-100 pt-4">
              <Button
                variant="outline"
                type="button"
                onClick={resetForm}
                className="border-slate-200 text-slate-600"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Reset
              </Button>
              <Button
                type="button"
                disabled={loading}
                onClick={handleSave}
                className="bg-red-500 text-white hover:bg-red-600"
              >
                {loading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Save className="mr-2 h-4 w-4" />
                )}
                Save Slider
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Table */}
        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="border-b border-slate-100 pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-semibold text-slate-700">
                Slider History
              </CardTitle>
              <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs text-muted-foreground">
                {sliders.length} item{sliders.length !== 1 ? "s" : ""}
              </span>
            </div>
          </CardHeader>

          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50/60">
                  <TableHead className="w-10">#</TableHead>
                  <TableHead>Image</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Position</TableHead>
                  <TableHead>Link</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {fetching ? (
                  <TableRow>
                    <TableCell colSpan={8} className="py-16 text-center">
                      <Loader2 className="mx-auto h-5 w-5 animate-spin text-slate-400" />
                    </TableCell>
                  </TableRow>
                ) : sliders.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={8}
                      className="py-16 text-center text-sm text-muted-foreground"
                    >
                      No sliders found. Add your first slider above.
                    </TableCell>
                  </TableRow>
                ) : (
                  sliders.map((slider, index) => (
                    <TableRow
                      key={slider.id}
                      className="group transition-colors hover:bg-slate-50/50"
                    >
                      <TableCell className="text-sm text-slate-400">
                        {index + 1}
                      </TableCell>

                      {/* Image */}
                      <TableCell>
                        <div className="relative h-14 w-24 overflow-hidden rounded-lg border border-slate-200 shadow-sm">
                          <Image
                            src={slider.imageUrl}
                            alt={slider.title}
                            fill
                            className="object-cover transition group-hover:scale-105"
                          />
                        </div>
                      </TableCell>

                      {/* Title */}
                      <TableCell className="max-w-[160px]">
                        <p className="truncate text-sm font-medium text-slate-700">
                          {slider.title}
                        </p>
                      </TableCell>

                      {/* Position */}
                      <TableCell>
                        <div
                          className={`flex w-fit items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
                            slider.position === "center"
                              ? "bg-blue-50 text-blue-600"
                              : "bg-purple-50 text-purple-600"
                          }`}
                        >
                          {slider.position === "center" ? (
                            <AlignCenter className="h-3 w-3" />
                          ) : (
                            <AlignLeft className="h-3 w-3" />
                          )}
                          {slider.position === "center" ? "Center" : "Left"}
                        </div>
                      </TableCell>

                      {/* Link */}
                      <TableCell className="max-w-[140px]">
                        {slider.link ? (
                          <a
                            href={slider.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 truncate text-xs text-blue-500 hover:text-blue-700 hover:underline"
                            title={slider.link}
                          >
                            <ExternalLink className="h-3 w-3 flex-shrink-0" />
                            <span className="truncate">{slider.link}</span>
                          </a>
                        ) : (
                          <span className="text-xs text-slate-300">—</span>
                        )}
                      </TableCell>

                      {/* Status — dropdown */}
                      <TableCell>
                        <StatusDropdown
                          slider={slider}
                          onToggle={setConfirmToggle}
                        />
                      </TableCell>

                      {/* Created */}
                      <TableCell className="text-xs text-slate-400">
                        {new Date(slider.createdAt).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          },
                        )}
                      </TableCell>

                      {/* Actions */}
                      <TableCell>
                        <div className="flex justify-end">
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => setConfirmDelete(slider)}
                            className="h-8 w-8 text-slate-400 hover:bg-red-50 hover:text-red-500"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
