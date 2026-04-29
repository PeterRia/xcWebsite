import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Diamond } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import type { FeaturedNews, ListItem } from "@/data/home";

type NewsSectionProps = {
  featured: FeaturedNews;
  list: ListItem[];
};

const NewsSection = ({ featured, list }: NewsSectionProps) => {
  return (
    <section id="news" className="section-band bg-paper py-[var(--section-gap)]">
      <div className="mx-auto max-w-page px-[var(--section-padding-x)]">
        <SectionHeading title="学院新闻" actionLabel="查看更多 +" actionHref="#news" />

        <div className="grid gap-8 lg:grid-cols-[1.06fr_0.94fr]">
          <article className="overflow-hidden bg-white shadow-panel">
            <Link href={featured.href} className="block">
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image
                  src={featured.image}
                  alt={featured.title}
                  fill
                  sizes="(min-width: 1024px) 58vw, 100vw"
                  className="object-cover transition-transform duration-300 hover:scale-[1.02]"
                />
              </div>
              <div className="flex gap-5 px-4 py-5 sm:px-6 sm:py-6">
                <div className="flex w-[6.4rem] shrink-0 flex-col items-center justify-center bg-brand-600 text-white">
                  <span className="text-[clamp(2.2rem,4vw,3rem)] font-black leading-none">
                    {featured.dateLabel}
                  </span>
                  <span className="mt-1 border-t border-white/35 pt-2 text-sm font-medium">
                    {featured.monthLabel}
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-[1.25rem] font-bold leading-8 text-ink">
                    {featured.title}
                  </h3>
                  <p className="mt-4 max-w-2xl text-sm leading-7 text-muted">
                    {featured.summary}
                  </p>
                  <div className="mt-8 flex items-center justify-end text-brand-400">
                    <ChevronRight className="h-9 w-9" />
                  </div>
                </div>
              </div>
            </Link>
          </article>

          <div className="space-y-5">
            <div className="bg-brand-600 px-5 py-6 text-white shadow-panel sm:px-6 sm:py-7">
              <div className="flex items-start gap-4">
                <div className="flex h-20 w-20 shrink-0 flex-col items-center justify-center border border-white/18">
                  <span className="text-[clamp(1.9rem,3vw,2.6rem)] font-black leading-none">
                    {list[0].date.slice(8, 10)}
                  </span>
                  <span className="mt-1 text-xs font-medium">{list[0].date.slice(0, 7)}</span>
                </div>
                <div className="min-w-0">
                  <Link href={list[0].href} className="text-[1.1rem] font-bold leading-8">
                    {list[0].title}
                  </Link>
                </div>
              </div>
            </div>

            <ul className="space-y-4">
              {list.slice(1).map((item) => (
                <li
                  key={item.title}
                  className="flex items-center justify-between gap-4 border-b border-line pb-4"
                >
                  <Link
                    href={item.href}
                    className="flex min-w-0 items-start gap-3 text-[1.02rem] leading-7 text-ink transition-colors hover:text-brand-700"
                  >
                    <Diamond className="mt-2 h-3 w-3 shrink-0 rotate-45 text-brand-500" />
                    <span className="min-w-0 flex-1">{item.title}</span>
                  </Link>
                  <span className="shrink-0 text-sm text-muted">{item.date}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
