import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CollectionGrid from "@/components/CollectionGrid";
import { getProducts } from "@/lib/data";

const KNOWN_CATEGORIES = ["men", "women", "unisex", "accessories"];

export async function generateStaticParams() {
  const products = await getProducts();
  const dbCategories = Array.from(new Set(products.map(p => p.category.toLowerCase())));
  const allCategories = Array.from(new Set([...KNOWN_CATEGORIES, ...dbCategories]));

  return allCategories.map((category) => ({ category }));
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const products = await getProducts();
  const { category } = await params;
  const categoryName = decodeURIComponent(category).toLowerCase();

  const filteredProducts = products.filter(
    p => p.category.toLowerCase() === categoryName
  );

  const displayTitle = categoryName === "men"
    ? "MEN"
    : categoryName === "women"
    ? "WOMEN"
    : categoryName.toUpperCase();

  return (
    <>
      <Navbar />
      <main className="flex-grow pt-[104px] max-w-[1440px] mx-auto px-spacing-margin-edge min-h-screen">
        <CollectionGrid title={displayTitle} products={filteredProducts} />
      </main>
      <Footer />
    </>
  );
}
