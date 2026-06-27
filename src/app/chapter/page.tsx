
import Header from "@/components/header";
import HomeFooter from "@/components/home-footer";
import { ChapterHero } from "@/components/chapter/ChapterHero";
import { ChapterTabs } from "@/components/chapter/ChapterTabs";
import Link from "next/link";

export default function MallakambaChapterPage() {
  return (
    <main className="page-frame">
      <div className="fk">
        <Header />

        <div className="fk-breadcrumb">
          <Link href="/">Home</Link> · <Link href="#">ICSE</Link> ·{" "}
          <Link href="#">Grade VI</Link> · <strong>Mallakamba</strong>
        </div>

        <ChapterHero />
        <ChapterTabs />
        <HomeFooter />
      </div>
    </main>
  );
}
