import Link from "next/link";
import { UTILITY_LINKS } from "@/data/site";

const HeaderTopBar = () => {
  return (
    <div className="hidden border-b border-white/10 bg-brand-700/95 text-[0.82rem] text-white/90 lg:block">
      <div className="mx-auto flex max-w-page items-center justify-end gap-5 px-[var(--section-padding-x)] py-2">
        {UTILITY_LINKS.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className="transition-colors hover:text-white"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HeaderTopBar;
