import Link from "next/link";
import { Search } from "lucide-react";
import { PRIMARY_NAVIGATION, SITE_INFO } from "@/data/site";
import HeaderTopBar from "@/components/HeaderTopBar";
import MainNavigation from "@/components/MainNavigation";
import ResponsiveMobileNav from "@/components/ResponsiveMobileNav";

const SiteHeader = () => {
  return (
    <header className="relative z-40 bg-brand-700 text-white">
      <HeaderTopBar />
      <div className="mx-auto flex max-w-page items-center justify-between gap-6 px-[var(--section-padding-x)] py-4 lg:py-5">
        <Link href="/" className="flex min-w-0 items-center gap-4">
          <div className="grid h-16 w-16 shrink-0 place-items-center rounded-full border border-white/20 bg-white/10 text-[0.72rem] font-bold leading-none">
            <span className="text-center">
              2026
              <br />
              SAMPLE
            </span>
          </div>
          <div className="min-w-0">
            <div className="flex items-baseline gap-2 font-extrabold">
              <span className="text-[clamp(1.8rem,3.2vw,3rem)] leading-none">
                {SITE_INFO.name}
              </span>
            </div>
            <div className="mt-1 text-[0.92rem] font-medium text-white/92 lg:text-[1rem]">
              {SITE_INFO.englishName}
            </div>
          </div>
        </Link>

        <div className="hidden items-center gap-3 lg:flex">
          <div className="flex h-11 items-center rounded-full border border-white/18 bg-white/10 px-4 text-sm text-white/70">
            {SITE_INFO.searchPlaceholder}
          </div>
          <button
            type="button"
            aria-label="搜索"
            className="grid h-11 w-11 place-items-center rounded-full border border-white/18 bg-white/10 transition-colors hover:bg-white/15"
          >
            <Search className="h-5 w-5" />
          </button>
        </div>

        <ResponsiveMobileNav items={PRIMARY_NAVIGATION} />
      </div>

      <MainNavigation items={PRIMARY_NAVIGATION} />
    </header>
  );
};

export default SiteHeader;
