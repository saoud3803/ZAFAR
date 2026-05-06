import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CollectionGrid from "@/components/CollectionGrid";
import { getProducts } from "@/lib/data";

export default async function CollectionsPage() {
  const products = await getProducts();

  return (
    <>
      <Navbar />
      <main className="flex-grow pt-[104px] max-w-[1440px] mx-auto px-spacing-margin-edge min-h-screen">
        <CollectionGrid title="ALL COLLECTIONS" products={products} />
      </main>
      <Footer />
    </>
  );
}
