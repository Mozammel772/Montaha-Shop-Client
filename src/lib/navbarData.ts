import juniors from "../assets/images/juniors-cover.png";
import men from "../assets/images/men-cover.png";
import women from "../assets/images/women-cover.png";

export const navbarCategoryData = {
  men: {
    image: men,
    columns: {
      Clothing: [
        { name: "T-Shirts", href: "/category/men/clothing/t-shirts" },
        { name: "Shirts", href: "/category/men/clothing/shirts" },
        { name: "Jackets", href: "/category/men/clothing/jackets" },
      ],
      Shoes: [
        { name: "Sneakers", href: "/category/men/sneakers" },
        { name: "Running", href: "/category/men/running" },
      ],
      Accessories: [
        { name: "Watches", href: "/category/men/watches" },
        { name: "Belts", href: "/category/men/belts" },
      ],
    },
  },
  women: {
    image: women,
    columns: {
      Clothing: [
        { name: "Dresses", href: "/category/women/dresses" },
        { name: "Tops", href: "/category/women/tops" },
      ],
      Shoes: [
        { name: "Heels", href: "/category/women/heels" },
        { name: "Flats", href: "/category/women/flats" },
      ],
      Accessories: [
        { name: "Handbags", href: "/category/women/handbags" },
        { name: "Jewelry", href: "/category/women/jewelry" },
      ],
    },
  },
  juniors: {
    image: juniors,
    columns: {
      Clothing: [
        { name: "Hoodies", href: "/category/juniors/hoodies" },
        { name: "Shorts", href: "/category/juniors/shorts" },
      ],
      Shoes: [
        { name: "Running", href: "/category/juniors/running" },
        { name: "Sneakers", href: "/category/juniors/sneakers" },
      ],
      Accessories: [
        { name: "Bags", href: "/category/juniors/bags" },
        { name: "Hats", href: "/category/juniors/hats" },
      ],
    },
  },
};
