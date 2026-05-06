import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CollectionGrid from "@/components/CollectionGrid";
import { getProducts } from "@/lib/data";

export default async function NewDropPage() {
  const allProducts = await getProducts();
  // Show the 4 most recently added products as "new drop"
  const products = allProducts.slice(0, 4);

  return (
    <>
      <Navbar />
      <main className="flex-grow pt-[140px] max-w-[1440px] mx-auto px-6 min-h-screen">
        <CollectionGrid title="NEW DROP" products={products} />
      </main>
      <Footer />
    </>
  );
}
