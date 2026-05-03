// src/app/(commonLayout)/trending-products/[slug]/page.tsx

import { notFound } from "next/navigation";

import ProductDetails from "@/components/modules/TrendingProducts/ProductsDetails";
import { TrendingProductsData } from "@/services/trendingProducts/trendingProductsData";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export default async function Page({ params }: Props) {
  const { slug } = await params;

  const product = TrendingProductsData.find((item) => item.slug === slug);

  if (!product) {
    return notFound();
  }

  return <ProductDetails product={product} />;
}
