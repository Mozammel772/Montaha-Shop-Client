/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { revalidateTag } from "next/cache";
import { serverFetch } from "./server-fetch";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface UserMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface UserItem {
  id: number;
  name: string | null;
  phone: string;
  email: string | null;
  userRole: string;
  userStatus: string;
  profilePicture?: string | null;
  gender: string | null;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  authProviders: { provider: string }[];
}

export interface GetAllUsersParams {
  page?: number;
  limit?: number;
  search?: string;
  role?: string;
  status?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

// ─── Helper ───────────────────────────────────────────────────────────────────

// profile: "default" — Next.js cache profile name
const revalidate = () => revalidateTag("all-users", "default");

// ─── Get All Users ────────────────────────────────────────────────────────────

export const getAllUsers = async (
  params: GetAllUsersParams = {},
): Promise<{ users: UserItem[]; meta: UserMeta } | null> => {
  try {
    const query = new URLSearchParams();
    if (params.page) query.set("page", String(params.page));
    if (params.limit) query.set("limit", String(params.limit));
    if (params.search) query.set("search", params.search);
    if (params.role) query.set("role", params.role);
    if (params.status) query.set("status", params.status);
    if (params.sortBy) query.set("sortBy", params.sortBy);
    if (params.sortOrder) query.set("sortOrder", params.sortOrder);

    const response = await serverFetch.get(`/user?${query.toString()}`, {
      next: { tags: ["all-users"] },
    });
    if (response.status === 401 || response.status === 403) {
      return null;
    }
    if (!response.ok) {
      return null;
    }
    const result = await response.json();

    if (!result.success) return null;

    return { users: result.data, meta: result.meta };
  } catch (error) {
    console.error("getAllUsers error:", error);
    return null;
  }
};

// ─── Update Role ──────────────────────────────────────────────────────────────

export const updateUserRole = async (
  userId: number,
  role: string,
): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await serverFetch.patch(`/user/${userId}/role`, {
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role }),
    });

    const result = await response.json();
    if (result.success) revalidate();
    return result;
  } catch (error: any) {
    return { success: false, message: error.message || "Something went wrong" };
  }
};

// ─── Update Status ────────────────────────────────────────────────────────────

export const updateUserStatus = async (
  userId: number,
  status: string,
): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await serverFetch.patch(`/user/${userId}/status`, {
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });

    const result = await response.json();
    if (result.success) revalidate();
    return result;
  } catch (error: any) {
    return { success: false, message: error.message || "Something went wrong" };
  }
};

// ─── Delete User ──────────────────────────────────────────────────────────────

export const deleteUser = async (
  userId: number,
): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await serverFetch.delete(`/user/${userId}`);
    const result = await response.json();
    if (result.success) revalidate();
    return result;
  } catch (error: any) {
    return { success: false, message: error.message || "Something went wrong" };
  }
};
