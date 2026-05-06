import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CollectionGrid from "@/components/CollectionGrid";
import { getProducts } from "@/lib/data";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const products = await getProducts();
  // Extract unique categories
  const categories = Array.from(new Set(products.map(p => p.category.toLowerCase())));
  
  return categories.map((category) => ({
    category: category,
  }));
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const products = await getProducts();
  const { category } = await params;
  const categoryName = decodeURIComponent(category).toLowerCase();
  
  const filteredProducts = products.filter(
    p => p.category.toLowerCase() === categoryName
  );

  if (filteredProducts.length === 0) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <main className="flex-grow pt-[104px] max-w-[1440px] mx-auto px-spacing-margin-edge min-h-screen">
        <CollectionGrid title={categoryName} products={filteredProducts} />
      </main>
      <Footer />
    </>
  );
}
