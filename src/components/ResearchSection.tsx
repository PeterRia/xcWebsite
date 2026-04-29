import Link from "next/link";
import Image from "next/image";
import SectionHeading from "@/components/SectionHeading";
import type { ResearchCard } from "@/data/home";

type ResearchSectionProps = {
  items: ResearchCard[];
};

const ResearchSection = ({ items }: ResearchSectionProps) => {
  return (
    <section
      id="research"
      className="section-band bg-brand-700 py-[var(--section-gap)] text-white"
    >
      <div className="mx-auto max-w-page px-[var(--section-padding-x)]">
        <SectionHeading
          title="教学科研"
          actionLabel="查看更多 +"
          actionHref="#research"
          inverse
        />

        <div className="grid gap-6 lg:grid-cols-2">
          {items.map((item) => (
            <article
              key={item.title}
              className="overflow-hidden bg-white shadow-panel transition-transform duration-200 hover:-translate-y-1"
            >
              <Link href={item.href} className="block">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(min-width: 1024px) 42vw, 100vw"
                    className="object-cover transition-transform duration-300 hover:scale-[1.03]"
                  />
                </div>
                <div className="flex min-h-[12rem] flex-col justify-between p-6 text-ink">
                  <div>
                    <span className="inline-flex rounded-sm bg-brand-700 px-3 py-1 text-[0.9rem] font-medium text-white">
                      {item.category}
                    </span>
                    <h3 className="mt-5 text-[1.08rem] font-bold leading-8">
                      {item.title}
                    </h3>
                  </div>
                  <div className="mt-6 flex items-center justify-between text-sm text-muted">
                    <span>{item.date}</span>
                    <span className="text-brand-500">→</span>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResearchSection;
