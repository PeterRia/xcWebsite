import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import type { QuickLink } from "@/data/home";

type QuickLinksProps = {
  items: QuickLink[];
};

const QuickLinks = ({ items }: QuickLinksProps) => {
  return (
    <section id="links" className="bg-paper py-[var(--section-gap)]">
      <div className="mx-auto max-w-page px-[var(--section-padding-x)]">
        <div className="overflow-hidden bg-white shadow-panel">
          <div className="grid gap-0 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="flex items-center border-b border-line px-6 py-6 lg:border-b-0 lg:border-r">
              <SectionHeading title="快速链接" />
            </div>
            <div className="grid gap-0 sm:grid-cols-2 lg:grid-cols-4">
              {items.map((item, index) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`flex min-h-[7rem] items-center justify-center border-b border-line px-5 text-center text-[1.02rem] font-bold text-ink transition-colors hover:bg-paper hover:text-brand-700 ${
                    index % 2 === 0 ? "sm:border-r" : ""
                  } ${index >= items.length - 2 ? "lg:border-b-0" : ""}`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuickLinks;
