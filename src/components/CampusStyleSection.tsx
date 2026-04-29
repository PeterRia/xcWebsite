import Link from "next/link";
import Image from "next/image";
import SectionHeading from "@/components/SectionHeading";
import type { CampusCard } from "@/data/home";

type CampusStyleSectionProps = {
  items: CampusCard[];
};

const CampusStyleSection = ({ items }: CampusStyleSectionProps) => {
  return (
    <section id="campus" className="bg-paper py-[var(--section-gap)]">
      <div className="mx-auto max-w-page px-[var(--section-padding-x)]">
        <SectionHeading title="新院风采" actionLabel="查看更多 +" actionHref="#campus" />

        <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
          <article className="group overflow-hidden bg-white shadow-panel">
            <Link href={items[0].href} className="block">
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={items[0].image}
                  alt={items[0].title}
                  fill
                  sizes="(min-width: 1024px) 56vw, 100vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-5 text-white">
                  <p className="text-sm font-medium text-white/80">{items[0].caption}</p>
                  <h3 className="mt-3 text-[1.2rem] font-bold leading-8">
                    {items[0].title}
                  </h3>
                </div>
              </div>
            </Link>
          </article>

          <div className="grid gap-6">
            {items.slice(1, 3).map((item) => (
              <article key={item.title} className="overflow-hidden bg-white shadow-panel">
                <Link href={item.href} className="block">
                  <div className="relative aspect-[16/8] overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(min-width: 1024px) 32vw, 100vw"
                      className="object-cover transition-transform duration-300 hover:scale-[1.03]"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/65 to-transparent p-4 text-white">
                      <p className="text-sm text-white/78">{item.caption}</p>
                      <h3 className="mt-2 text-[1.05rem] font-bold leading-7">
                        {item.title}
                      </h3>
                    </div>
                  </div>
                </Link>
              </article>
            ))}

            <article className="overflow-hidden bg-white shadow-panel">
              <Link href={items[3].href} className="block">
                <div className="relative aspect-[16/8] overflow-hidden">
                  <Image
                    src={items[3].image}
                    alt={items[3].title}
                    fill
                    sizes="(min-width: 1024px) 32vw, 100vw"
                    className="object-cover transition-transform duration-300 hover:scale-[1.03]"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/72 to-transparent p-4 text-white">
                    <p className="text-sm text-white/78">{items[3].caption}</p>
                    <h3 className="mt-2 text-[1.05rem] font-bold leading-7">
                      {items[3].title}
                    </h3>
                  </div>
                </div>
              </Link>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CampusStyleSection;
