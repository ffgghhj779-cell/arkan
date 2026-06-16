import Navbar from "@/components/Navbar";
import HeroBanner from "@/components/HeroBanner";
import FeaturedProducts from "@/components/FeaturedProducts";
import ProductCategories from "@/components/ProductCategories";
import SingleProductHighlight from "@/components/SingleProduct";
import LifestylePromo from "@/components/LifestylePromo";
import SplitFeatures from "@/components/SplitFeatures";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="mobile-app-shell min-h-[100dvh] bg-white">
      <Navbar />
      <div className="flex flex-col gap-0">
        <HeroBanner />
        <FeaturedProducts />
        <ProductCategories />
        <SingleProductHighlight />
        <LifestylePromo />
        <SplitFeatures />
        <Footer />
      </div>
    </main>
  );
}
