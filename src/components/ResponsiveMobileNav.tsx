"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronRight, Menu, Search, X } from "lucide-react";
import type { NavigationItem } from "@/data/site";
import { SITE_INFO, UTILITY_LINKS } from "@/data/site";

type ResponsiveMobileNavProps = {
  items: NavigationItem[];
};

const ResponsiveMobileNav = ({ items }: ResponsiveMobileNavProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <div className="flex items-center gap-2 lg:hidden">
        <button
          type="button"
          aria-label="打开导航菜单"
          className="grid h-11 w-11 place-items-center rounded-full border border-white/18 bg-white/10 text-white transition-colors hover:bg-white/15"
          onClick={() => setIsOpen(true)}
        >
          <Menu className="h-5 w-5" />
        </button>
        <button
          type="button"
          aria-label="搜索"
          className="grid h-11 w-11 place-items-center rounded-full border border-white/18 bg-white/10 text-white transition-colors hover:bg-white/15"
        >
          <Search className="h-5 w-5" />
        </button>
      </div>

      <div
        className={`fixed inset-0 z-50 bg-black/50 transition-opacity duration-200 lg:hidden ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden="true"
        onClick={() => setIsOpen(false)}
      />
      <aside
        className={`fixed inset-y-0 left-0 z-[60] w-[min(88vw,360px)] overflow-y-auto bg-white shadow-panel transition-transform duration-300 lg:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-label="移动端导航"
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-line bg-brand-700 px-5 py-4 text-white">
          <div>
            <div className="text-[0.9rem] font-bold">{SITE_INFO.name}</div>
            <div className="text-xs text-white/75">{SITE_INFO.englishName}</div>
          </div>
          <button
            type="button"
            aria-label="关闭导航菜单"
            className="grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-white/10"
            onClick={() => setIsOpen(false)}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="border-b border-line px-5 py-4">
          <div className="rounded-panel border border-line bg-paper px-4 py-3 text-sm text-muted">
            {SITE_INFO.searchPlaceholder}
          </div>
        </div>

        <div className="px-5 py-4">
          <div className="space-y-2">
            {UTILITY_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="flex items-center justify-between rounded-panel border border-line px-4 py-3 text-sm font-medium text-ink transition-colors hover:border-brand-300 hover:text-brand-700"
                onClick={() => setIsOpen(false)}
              >
                <span>{link.label}</span>
                <ChevronRight className="h-4 w-4 text-muted" />
              </Link>
            ))}
          </div>
        </div>

        <div className="px-5 pb-8">
          {items.map((item, index) => {
            const isExpanded = expandedIndex === index;

            return (
              <div key={item.label} className="border-t border-line py-3">
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 py-2 text-left text-[1.02rem] font-bold text-ink"
                  onClick={() =>
                    setExpandedIndex(isExpanded ? null : index)
                  }
                  aria-expanded={isExpanded}
                >
                  <span>{item.label}</span>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${
                      isExpanded ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-[max-height,opacity] duration-300 ${
                    isExpanded ? "max-h-[900px] opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="grid gap-4 pb-2 pt-2">
                    {item.columns.map((column) => (
                      <div key={column.title}>
                        <div className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-600">
                          {column.title}
                        </div>
                        <div className="mt-3 space-y-2">
                          {column.links.map((link) => (
                            <Link
                              key={link.label}
                              href={link.href}
                              className="flex items-center justify-between rounded-panel bg-paper px-4 py-3 text-sm text-ink"
                              onClick={() => setIsOpen(false)}
                            >
                              <span>{link.label}</span>
                              <ChevronRight className="h-4 w-4 text-brand-500" />
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                    <div className="grid gap-2 pt-1">
                      {item.featured.map((link) => (
                        <Link
                          key={link.label}
                          href={link.href}
                          className="rounded-panel border border-brand-200 bg-brand-50 px-4 py-3 text-sm font-semibold text-brand-700"
                          onClick={() => setIsOpen(false)}
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </aside>
    </>
  );
};

export default ResponsiveMobileNav;
