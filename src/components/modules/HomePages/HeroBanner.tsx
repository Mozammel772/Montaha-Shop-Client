// components/home/HeroBanner.tsx

import { getHeroSliders } from "@/services/settings/getHeroSliders";
import HeroBannerSlider from "../settings/HeroBannerSlider";

const HeroBanner = async () => {
  const sliders = await getHeroSliders();

  if (!sliders.length) {
    return null;
  }

  const centerSliders = sliders.filter((item) => item.position === "center");

  const leftSliders = sliders.filter((item) => item.position === "left");

  return (
    <HeroBannerSlider centerSliders={centerSliders} leftSliders={leftSliders} />
  );
};

export default HeroBanner;
