// services/banner/getHeroSliders.ts

import { serverFetch } from "@/lib/server-fetch";

export interface SliderItem {
  id: number;
  title: string;
  imageUrl: string;
  isActive: boolean;
  position: "center" | "left";
  link: string | null;
}

export const getHeroSliders = async (): Promise<SliderItem[]> => {
  try {
    const res = await serverFetch.get("/settings/slider", {
      cache: "no-store",
    });

    if (!res.ok) {
      return [];
    }

    const data = await res.json();

    if (!data?.success) {
      return [];
    }

    return data.data || [];
  } catch (error) {
    console.log(error);
    return [];
  }
};
