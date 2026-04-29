import Link from "next/link";
import { Mail, Phone, MessageSquare } from "lucide-react";
import { FOOTER_COLUMNS, SOCIAL_LINKS, SITE_INFO } from "@/data/site";

const Footer = () => {
  return (
    <footer id="footer" className="bg-brand-700 text-white">
      <div className="mx-auto max-w-page px-[var(--section-padding-x)] py-12">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <div className="grid gap-8 md:grid-cols-3 xl:grid-cols-4">
              {FOOTER_COLUMNS.map((column) => (
                <div key={column.title}>
                  <h3 className="text-[1rem] font-bold">{column.title}</h3>
                  <ul className="mt-4 space-y-3 text-[0.95rem] text-white/78">
                    {column.links.map((link) => (
                      <li key={link.label}>
                        <Link className="transition-colors hover:text-white" href={link.href}>
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col justify-between gap-8">
            <div className="space-y-4 border-t border-white/12 pt-4 lg:border-t-0 lg:pt-0">
              <div className="text-sm font-semibold uppercase tracking-[0.18em] text-white/75">
                联系方式
              </div>
              <div className="space-y-3 text-[0.98rem] text-white/88">
                <div className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>{SITE_INFO.address}</span>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>{SITE_INFO.phone}</span>
                </div>
                <div className="flex items-start gap-3">
                  <MessageSquare className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>{SITE_INFO.email}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex h-24 w-24 items-center justify-center rounded-panel border border-white/15 bg-white/10 text-center text-xs text-white/75">
                二维码占位
              </div>
              <div className="flex-1">
                <div className="text-[1.1rem] font-bold">{SITE_INFO.name}</div>
                <div className="mt-2 text-sm text-white/72">{SITE_INFO.englishName}</div>
                <div className="mt-4 flex flex-wrap gap-3 text-sm text-white/80">
                  {SOCIAL_LINKS.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      className="rounded-full border border-white/15 px-4 py-2 transition-colors hover:bg-white/10"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/12 pt-6 text-sm text-white/78">
          <div>{SITE_INFO.copyright}</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
