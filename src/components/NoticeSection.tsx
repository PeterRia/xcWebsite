import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import type { NoticeItem } from "@/data/home";

type NoticeSectionProps = {
  list: NoticeItem[];
};

const NoticeSection = ({ list }: NoticeSectionProps) => {
  return (
    <section id="notice" className="bg-white py-[var(--section-gap)]">
      <div className="mx-auto max-w-page px-[var(--section-padding-x)]">
        <SectionHeading title="通知公告" actionLabel="查看更多 +" actionHref="#notice" />
        <div className="grid gap-5 md:grid-cols-2">
          {list.map((item) => (
            <article
              key={item.title}
              className="flex min-h-[118px] items-stretch overflow-hidden bg-white shadow-panel"
            >
              <div className="flex w-28 shrink-0 flex-col items-center justify-center border-r border-line px-4 text-brand-700">
                <span className="text-[2rem] font-black leading-none">{item.day}</span>
                <span className="mt-2 text-[0.92rem] font-medium">{item.month}</span>
              </div>
              <div className="flex min-w-0 flex-1 items-center px-5 py-4">
                <Link
                  href={item.href}
                  className="text-[1.02rem] font-bold leading-7 text-ink transition-colors hover:text-brand-700"
                >
                  {item.title}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NoticeSection;
