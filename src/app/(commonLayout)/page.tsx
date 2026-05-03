import CategorySection from "@/components/modules/HomePages/CategorySection";
import HeroBanner from "@/components/modules/HomePages/HeroBanner";
import TrendingProducts from "@/components/modules/HomePages/TrendingProducts";
import Head from "next/head";

export default function page() {
  return (
    <>
      <Head>
        <title>Top E-Commerce-Website</title>
        <meta name="descripttion" content="This is Top e-commerce platfrom" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <HeroBanner />
        <CategorySection />
        <TrendingProducts />
      </main>
    </>
  );
}
