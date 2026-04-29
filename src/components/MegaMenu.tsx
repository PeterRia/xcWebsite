import Link from "next/link";
import type { NavigationItem } from "@/data/site";

type MegaMenuProps = {
  item: NavigationItem;
};

const MegaMenu = ({ item }: MegaMenuProps) => {
  return (
    <div className="invisible absolute left-1/2 top-full z-30 w-[min(90vw,1120px)] -translate-x-1/2 translate-y-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
      <div className="overflow-hidden border border-line bg-white shadow-panel">
        <div className="grid gap-0 md:grid-cols-[1.5fr_0.9fr]">
          <div className="grid gap-8 px-8 py-7 md:grid-cols-2">
            {item.columns.map((column) => (
              <div key={column.title}>
                <h3 className="text-[0.95rem] font-bold text-brand-700">
                  {column.title}
                </h3>
                <div className="mt-4 space-y-3">
                  {column.links.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      className="block text-[0.95rem] text-ink transition-colors hover:text-brand-600"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="border-t border-line bg-paper px-8 py-7 md:border-l md:border-t-0">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-600">
              Featured
            </p>
            <div className="mt-5 space-y-4">
              {item.featured.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="block rounded-panel border border-line bg-white px-5 py-4 text-[0.98rem] font-semibold text-ink shadow-sm transition-transform duration-200 hover:-translate-y-0.5 hover:border-brand-200 hover:text-brand-700"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <p className="mt-6 text-sm leading-6 text-muted">
              {item.summary}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MegaMenu;
