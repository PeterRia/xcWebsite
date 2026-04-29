import SiteHeader from "@/components/SiteHeader";
import HeroCarousel from "@/components/HeroCarousel";
import NewsSection from "@/components/NewsSection";
import NoticeSection from "@/components/NoticeSection";
import ResearchSection from "@/components/ResearchSection";
import CampusStyleSection from "@/components/CampusStyleSection";
import QuickLinks from "@/components/QuickLinks";
import Footer from "@/components/Footer";
import {
  CAMPUS_CARDS,
  FEATURED_NEWS,
  HERO_SLIDES,
  NEWS_LIST,
  NOTICE_LIST,
  QUICK_LINKS,
  RESEARCH_CARDS,
} from "@/data/home";

const HomePage = () => {
  return (
    <div className="page-shell min-h-dvh bg-paper text-ink">
      <SiteHeader />
      <main>
        <HeroCarousel slides={HERO_SLIDES} />
        <NewsSection featured={FEATURED_NEWS} list={NEWS_LIST} />
        <NoticeSection list={NOTICE_LIST} />
        <ResearchSection items={RESEARCH_CARDS} />
        <CampusStyleSection items={CAMPUS_CARDS} />
        <QuickLinks items={QUICK_LINKS} />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
