import { ChevronDown } from "lucide-react";
import type { NavigationItem } from "@/data/site";
import MegaMenu from "@/components/MegaMenu";

type MainNavigationProps = {
  items: NavigationItem[];
};

const MainNavigation = ({ items }: MainNavigationProps) => {
  return (
    <nav aria-label="主导航" className="hidden bg-brand-700 lg:block">
      <div className="mx-auto max-w-page px-[var(--section-padding-x)]">
        <ul className="flex items-stretch justify-between gap-2">
          {items.map((item) => (
            <li key={item.label} className="group relative flex-1">
              <button
                type="button"
                className="flex w-full items-center justify-center gap-2 py-4 text-[0.98rem] font-bold text-white transition-colors hover:bg-white/10 focus:outline-none focus-visible:bg-white/10"
                aria-haspopup="menu"
              >
                <span className="truncate">{item.label}</span>
                <ChevronDown className="h-4 w-4 shrink-0 opacity-80" />
              </button>
              <MegaMenu item={item} />
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default MainNavigation;
