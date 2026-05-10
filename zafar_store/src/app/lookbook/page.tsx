import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LookbookClient from "./LookbookClient";

export const metadata = {
  title: "Lookbook — ZAFAR",
  description: "The ZAFAR lookbook. A visual essay on form, restraint, and quiet authority.",
};

export default function LookbookPage() {
  return (
    <>
      <Navbar />
      <main className="flex-grow min-h-screen bg-[#FAFAFA]">
        <LookbookClient />
      </main>
      <Footer />
    </>
  );
}
