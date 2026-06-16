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
    <main className="min-h-screen bg-white">
      <Navbar />
      <HeroBanner />
      <FeaturedProducts />
      <ProductCategories />
      <SingleProductHighlight />
      <LifestylePromo />
      <SplitFeatures />
      <Footer />
    </main>
  );
}
