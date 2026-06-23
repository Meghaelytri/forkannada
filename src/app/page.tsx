import Header from "@/components/header";
import HeroSection from "@/components/hero-section";
import HomeCta from "@/components/home-cta";
import HomeFooter from "@/components/home-footer";
import HomePicker from "@/components/home-picker";
import QuickTiles from "@/components/quick-tiles";
import TrendingLessons from "@/components/trending-lessons";

export default function Home() {
  return (
    <main className="fk-page">
      <Header />
      <HeroSection />
      <HomePicker />
      <QuickTiles />
      <TrendingLessons />
      <div id="free-pack">
        <HomeCta />
      </div>
      <HomeFooter />
    </main>
  );
}
