import { notFound } from 'next/navigation';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CollectionGrid from "@/components/CollectionGrid";
import { getProductsByCategory } from "@/lib/data";
import { COLLECTION_SLUGS, COLLECTION_TITLES } from "@/lib/categories";

export const dynamic = 'force-dynamic';

export async function generateStaticParams() {
  return COLLECTION_SLUGS.map((category) => ({ category }));
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const slug = decodeURIComponent(category).toLowerCase();

  if (!COLLECTION_SLUGS.includes(slug)) notFound();

  const products = await getProductsByCategory(slug);
  const title = COLLECTION_TITLES[slug] ?? slug.toUpperCase();

  return (
    <>
      <Navbar />
      <main className="flex-grow pt-[104px] max-w-[1440px] mx-auto px-spacing-margin-edge min-h-screen">
        <CollectionGrid title={title} products={products} />
      </main>
      <Footer />
    </>
  );
}
