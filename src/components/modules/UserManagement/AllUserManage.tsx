"use client";

import {
  deleteUser,
  getAllUsers,
  updateUserRole,
  updateUserStatus,
  type UserItem,
  type UserMeta,
} from "@/lib/user-management.action";
import Image from "next/image";
import { useRouter } from "next/navigation"; // ✅ যোগ করা হয়েছে
import { useEffect, useRef, useState, useTransition } from "react";
import { toast } from "sonner"; // ✅ যোগ করা হয়েছে

// ─── Constants ─────────────────────────────────────────────────────────

const ROLES = ["USER", "ADMIN", "SUPER_ADMIN", "MODERATOR"];

const STATUSES = ["ACTIVE", "INACTIVE", "SUSPENDED", "DELETED"];

const LIMIT = 10;

const ROLE_STYLE: Record<string, string> = {
  SUPER_ADMIN: "bg-violet-100 text-violet-700",
  ADMIN: "bg-blue-100 text-blue-700",
  MODERATOR: "bg-amber-100 text-amber-700",
  USER: "bg-slate-100 text-slate-600",
};

const STATUS_STYLE: Record<string, string> = {
  ACTIVE: "bg-emerald-100 text-emerald-700",
  INACTIVE: "bg-slate-100 text-slate-500",
  SUSPENDED: "bg-orange-100 text-orange-700",
  DELETED: "bg-red-100 text-red-600",
};

// ─── UI Components ────────────────────────────────────────────────────

function Avatar({
  name,
  photo,
}: {
  name: string | null;
  photo: string | null;
}) {
  const initials = (name || "?")
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  if (photo) {
    return (
      <Image
        src={photo}
        alt={name || ""}
        width={36}
        height={36}
        className="h-9 w-9 rounded-full object-cover ring-1 ring-slate-200"
      />
    );
  }

  return (
    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-slate-700 to-slate-500 text-xs font-semibold text-white">
      {initials}
    </div>
  );
}

function Badge({ label, styleClass }: { label: string; styleClass: string }) {
  return (
    <span
      className={`inline-flex items-center rounded px-2 py-0.5 text-xs font-medium ${styleClass}`}
    >
      {label}
    </span>
  );
}

function Spinner() {
  return (
    <svg
      className="h-4 w-4 animate-spin text-slate-400"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v8H4z"
      />
    </svg>
  );
}

function ConfirmModal({
  message,
  onConfirm,
  onCancel,
}: {
  message: React.ReactNode;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="mx-4 w-full max-w-sm rounded-xl bg-white p-6 shadow-xl">
        <p className="mb-5 text-sm text-slate-700">{message}</p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="rounded-lg border border-slate-200 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="rounded-lg bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────

export default function AllUserManage() {
  const router = useRouter(); // ✅ যোগ করা হয়েছে

  const [users, setUsers] = useState<UserItem[]>([]);
  const [meta, setMeta] = useState<UserMeta | null>(null);

  const [loading, setLoading] = useState(true);

  const [isPending, startTransition] = useTransition();

  const [refreshKey, setRefreshKey] = useState(0);

  const [params, setParams] = useState({
    page: 1,
    search: "",
    role: "",
    status: "",
  });

  const [editingRole, setEditingRole] = useState<number | null>(null);

  const [editingStatus, setEditingStatus] = useState<number | null>(null);

  const [confirmDelete, setConfirmDelete] = useState<UserItem | null>(null);

  const searchTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [confirmRoleChange, setConfirmRoleChange] = useState<{
    user: UserItem;
    role: string;
  } | null>(null);

  const [confirmStatusChange, setConfirmStatusChange] = useState<{
    user: UserItem;
    status: string;
  } | null>(null);
  // ─── Fetch Users ───────────────────────────────────────────────────

  useEffect(() => {
    let cancelled = false;

    const fetchUsers = async () => {
      try {
        setLoading(true);

        const result = await getAllUsers({
          page: params.page,
          limit: LIMIT,
          search: params.search || undefined,
          role: params.role || undefined,
          status: params.status || undefined,
          sortBy: "createdAt",
          sortOrder: "desc",
        });

        if (cancelled) return;

        if (result) {
          setUsers(result.users || []);
          setMeta(result.meta || null);
        }
      } catch (error) {
        console.error(error);
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchUsers();

    return () => {
      cancelled = true;
    };
  }, [params, refreshKey]);

  // ─── Search ────────────────────────────────────────────────────────

  const handleSearchChange = (value: string) => {
    if (searchTimer.current) {
      clearTimeout(searchTimer.current);
    }

    searchTimer.current = setTimeout(() => {
      setParams((prev) => ({
        ...prev,
        search: value,
        page: 1,
      }));
    }, 400);
  };

  // ─── Role Change ───────────────────────────────────────────────────

  const handleRoleChange = (user: UserItem, newRole: string) => {
    if (newRole === user.userRole) {
      setEditingRole(null);
      return;
    }

    setConfirmRoleChange({
      user,
      role: newRole,
    });

    setEditingRole(null);
  };
  const confirmRoleChangeAction = () => {
    if (!confirmRoleChange) return;

    const { user, role } = confirmRoleChange;

    setConfirmRoleChange(null);

    startTransition(async () => {
      const res = await updateUserRole(user.id, role);

      if (res.success) {
        setUsers((prev) =>
          prev.map((u) => (u.id === user.id ? { ...u, userRole: role } : u)),
        );

        toast.success(`Successfully updated ${user.name}'s role to ${role}`);
        router.refresh();
      } else {
        toast.error(res.message || "Failed to update role");
      }
    });
  };
  // ─── Status Change ─────────────────────────────────────────────────

  const handleStatusChange = (user: UserItem, newStatus: string) => {
    if (newStatus === user.userStatus) {
      setEditingStatus(null);

      return;
    }

    setConfirmStatusChange({
      user,
      status: newStatus,
    });

    setEditingStatus(null);
  };
  const confirmStatusChangeAction = () => {
    if (!confirmStatusChange) return;

    const { user, status } = confirmStatusChange;

    setConfirmStatusChange(null);

    startTransition(async () => {
      const res = await updateUserStatus(user.id, status);

      if (res.success) {
        setUsers((prev) =>
          prev.map((u) =>
            u.id === user.id ? { ...u, userStatus: status } : u,
          ),
        );

        toast.success(
          `Successfully updated ${user.name}'s status to ${status}`,
        );
        router.refresh();
      } else {
        toast.error(res.message || "Failed to update status");
      }
    });
  };
  // ─── Delete ────────────────────────────────────────────────────────

  const confirmDeleteAction = () => {
    if (!confirmDelete) return;

    const user = confirmDelete;

    setConfirmDelete(null);

    startTransition(async () => {
      const res = await deleteUser(user.id);

      if (res.success) {
        // ✅ Sonner toast
        toast.success("User deleted successfully");

        setRefreshKey((prev) => prev + 1);

        // ✅ Server components refresh
        router.refresh();
      } else {
        toast.error(res.message || "Failed to delete user");
      }
    });
  };

  return (
    <>
      {confirmRoleChange && (
        <ConfirmModal
          message={
            <>
              Are you sure you want to change{" "}
              <span className="font-semibold text-orange-500">
                {confirmRoleChange.user.name || "this user"}
              </span>{" "}
              role to{" "}
              <span className="font-semibold text-orange-600">
                {confirmRoleChange.role}
              </span>
              ?
            </>
          }
          onConfirm={confirmRoleChangeAction}
          onCancel={() => setConfirmRoleChange(null)}
        />
      )}

      {confirmStatusChange && (
        <ConfirmModal
          message={
            <>
              Are you sure you want to change{" "}
              <span className="font-semibold text-orange-500">
                {confirmStatusChange.user.name || "this user"}
              </span>{" "}
              status to{" "}
              <span className="font-semibold text-orange-600">
                {confirmStatusChange.status}
              </span>
              ?
            </>
          }
          onConfirm={confirmStatusChangeAction}
          onCancel={() => setConfirmStatusChange(null)}
        />
      )}

      {confirmDelete && (
        <ConfirmModal
          message={
            <>
              Are you sure you want to delete{" "}
              <span className="font-semibold text-orange-500">
                {confirmDelete.name || "this user"}
              </span>
              ?
            </>
          }
          onConfirm={confirmDeleteAction}
          onCancel={() => setConfirmDelete(null)}
        />
      )}

      <div className="min-h-screen bg-slate-50  md:p-4">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-slate-800">
            User Management
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            {meta ? `${meta.total} total users` : "Loading..."}
          </p>
        </div>

        {/* Filters */}
        <div className="mb-4 flex flex-wrap items-center gap-3 rounded-xl border border-slate-200 bg-white p-4">
          <input
            type="text"
            placeholder="Search users..."
            defaultValue={params.search}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="flex-1 rounded-lg border border-slate-200 bg-slate-50 px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-300"
          />

          <select
            value={params.role}
            onChange={(e) =>
              setParams((prev) => ({
                ...prev,
                role: e.target.value,
                page: 1,
              }))
            }
            className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm"
          >
            <option value="">All Roles</option>

            {ROLES.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>

          <select
            value={params.status}
            onChange={(e) =>
              setParams((prev) => ({
                ...prev,
                status: e.target.value,
                page: 1,
              }))
            }
            className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm"
          >
            <option value="">All Status</option>

            {STATUSES.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="px-4 py-3 text-left">User</th>
                  <th className="px-4 py-3 text-left">Phone</th>
                  <th className="px-4 py-3 text-left">Role</th>
                  <th className="px-4 py-3 text-left">Status</th>
                  <th className="px-4 py-3 text-left">Action</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={5} className="px-4 py-16 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <Spinner />
                        <span>Loading users...</span>
                      </div>
                    </td>
                  </tr>
                ) : users.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-4 py-16 text-center text-slate-400"
                    >
                      No users found
                    </td>
                  </tr>
                ) : (
                  users.map((user) => (
                    <tr
                      key={user.id}
                      className="border-b border-slate-100 hover:bg-slate-50"
                    >
                      {/* User */}
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <Avatar
                            name={user.name}
                            photo={user.profilePicture ?? null}
                          />

                          <span className="font-medium text-slate-700">
                            {user.name}
                          </span>
                        </div>
                      </td>

                      {/* Phone */}
                      <td className="px-4 py-3">{user.phone}</td>

                      {/* Role */}
                      <td className="px-4 py-3">
                        {editingRole === user.id ? (
                          <select
                            autoFocus
                            defaultValue={user.userRole}
                            onChange={(e) =>
                              handleRoleChange(user, e.target.value)
                            }
                            className="rounded-md border border-slate-300 px-2 py-1 text-xs"
                          >
                            {ROLES.map((role) => (
                              <option key={role} value={role}>
                                {role}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <button onClick={() => setEditingRole(user.id)}>
                            <Badge
                              label={user.userRole}
                              styleClass={
                                ROLE_STYLE[user.userRole] ||
                                "bg-slate-100 text-slate-600"
                              }
                            />
                          </button>
                        )}
                      </td>

                      {/* Status */}
                      <td className="px-4 py-3">
                        {editingStatus === user.id ? (
                          <select
                            autoFocus
                            defaultValue={user.userStatus}
                            onChange={(e) =>
                              handleStatusChange(user, e.target.value)
                            }
                            className="rounded-md border border-slate-300 px-2 py-1 text-xs"
                          >
                            {STATUSES.map((status) => (
                              <option key={status} value={status}>
                                {status}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <button onClick={() => setEditingStatus(user.id)}>
                            <Badge
                              label={user.userStatus}
                              styleClass={
                                STATUS_STYLE[user.userStatus] ||
                                "bg-slate-100 text-slate-600"
                              }
                            />
                          </button>
                        )}
                      </td>

                      {/* Delete */}
                      <td className="px-4 py-3">
                        <button
                          disabled={isPending}
                          onClick={() => setConfirmDelete(user)}
                          className="rounded-lg p-2 text-red-500 hover:bg-red-50 disabled:opacity-40"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="3 6 5 6 21 6" />
                            <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
                            <path d="M10 11v6" />
                            <path d="M14 11v6" />
                            <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {meta && meta.totalPages > 1 && (
            <div className="flex items-center justify-between border-t border-slate-100 px-4 py-3">
              <button
                disabled={!meta.hasPrevPage}
                onClick={() =>
                  setParams((prev) => ({
                    ...prev,
                    page: prev.page - 1,
                  }))
                }
                className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs disabled:opacity-40"
              >
                Prev
              </button>

              <span className="text-xs text-slate-500">
                Page {meta.page} of {meta.totalPages}
              </span>

              <button
                disabled={!meta.hasNextPage}
                onClick={() =>
                  setParams((prev) => ({
                    ...prev,
                    page: prev.page + 1,
                  }))
                }
                className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs disabled:opacity-40"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
