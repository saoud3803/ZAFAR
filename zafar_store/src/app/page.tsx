import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import EditorialSection from "@/components/EditorialSection";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";
import { getProducts, getHeroSettings } from "@/lib/data";

export default async function Home() {
  const products = await getProducts();
  const heroSettings = await getHeroSettings();

  return (
    <>
      <Navbar />
      <main className="flex-grow">
        <Hero heroSettings={heroSettings} />
        <div className="max-w-[1440px] mx-auto px-spacing-margin-edge mt-spacing-section-gap">
          <ProductGrid products={products} />
          <EditorialSection />
          <Newsletter />
        </div>
      </main>
      <Footer />
    </>
  );
}
