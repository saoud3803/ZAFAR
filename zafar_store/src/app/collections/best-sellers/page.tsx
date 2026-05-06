import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CollectionGrid from "@/components/CollectionGrid";
import { getBestSellers } from "@/lib/data";

export default async function BestSellersPage() {
  const products = await getBestSellers();

  return (
    <>
      <Navbar />
      <main className="flex-grow pt-[140px] max-w-[1440px] mx-auto px-6 min-h-screen">
        <CollectionGrid title="BEST SELLERS" products={products} />
      </main>
      <Footer />
    </>
  );
}
