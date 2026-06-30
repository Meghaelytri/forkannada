import Header from "@/components/header";
import HeroSection from "@/components/hero-section";
import HomeCta from "@/components/home-cta";
import HomeFooter from "@/components/home-footer";
import HomePicker from "@/components/home-picker";
import QuickTiles from "@/components/quick-tiles";
import TrendingLessons from "@/components/trending-lessons";
import { getCurriculums } from "@/lib/wordpress";

export default async function Home() {
  const curriculums = await getCurriculums();

  return (
    <main className="fk-page">
      <Header />
      <HeroSection />
      <HomePicker curriculums={curriculums} />
      <QuickTiles />
      <TrendingLessons curriculums={curriculums} />
      <div id="free-pack">
        <HomeCta />
      </div>
      <HomeFooter />
    </main>
  );
}
