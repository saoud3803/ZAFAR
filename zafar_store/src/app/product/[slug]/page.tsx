import Navbar from "@/components/Navbar";
import ProductDetails from "@/components/ProductDetails";
import Footer from "@/components/Footer";
import { getProducts, getProductById } from "@/lib/data";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product) => ({
    slug: product.id,
  }));
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductById(slug);

  if (!product) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <main className="flex-grow pt-[104px] max-w-[1440px] mx-auto px-spacing-margin-edge">
        <ProductDetails product={product} />
      </main>
      <Footer />
    </>
  );
}
