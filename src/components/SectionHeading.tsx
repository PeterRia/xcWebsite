type SectionHeadingProps = {
  title: string;
  actionLabel?: string;
  actionHref?: string;
  inverse?: boolean;
};

const SectionHeading = ({
  title,
  actionLabel,
  actionHref = "#",
  inverse = false,
}: SectionHeadingProps) => {
  return (
    <div className="mb-8 flex items-end justify-between gap-4">
      <div className="min-w-0">
        <h2
          className={`text-[clamp(2rem,3vw,3.25rem)] font-black ${
            inverse ? "text-white" : "text-ink"
          }`}
        >
          {title}
        </h2>
        <div
          className={`mt-4 h-[3px] w-12 rounded-full ${
            inverse ? "bg-white/85" : "bg-brand-500"
          }`}
        />
      </div>
      {actionLabel ? (
        <a
          href={actionHref}
          className={`shrink-0 text-[0.95rem] font-medium transition-colors hover:text-brand-600 ${
            inverse ? "text-white/90 hover:text-white" : "text-muted"
          }`}
        >
          {actionLabel}
        </a>
      ) : null}
    </div>
  );
};

export default SectionHeading;
