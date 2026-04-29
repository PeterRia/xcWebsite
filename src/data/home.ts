export type HeroSlide = {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  href: string;
};

export type FeaturedNews = {
  title: string;
  summary: string;
  dateLabel: string;
  monthLabel: string;
  image: string;
  href: string;
};

export type ListItem = {
  title: string;
  date: string;
  href: string;
};

export type NoticeItem = {
  day: string;
  month: string;
  title: string;
  href: string;
};

export type ResearchCard = {
  category: string;
  title: string;
  date: string;
  image: string;
  href: string;
};

export type CampusCard = {
  title: string;
  image: string;
  href: string;
  caption: string;
};

export type QuickLink = {
  label: string;
  href: string;
};

export const HERO_SLIDES: HeroSlide[] = [
  {
    eyebrow: "学院主视觉",
    title: "某某大学某某学院学年开学典礼顺利举行",
    description: "以沉稳红棕和大幅校园影像构成视觉重心，保留高校官网的庄重感与新闻节奏。",
    image: "/placeholders/hero-1.svg",
    href: "#news",
  },
  {
    eyebrow: "新闻动态",
    title: "学院新闻示例标题：科研、教学与实践同步推进",
    description: "使用大图轮播、底部标题和分页点，模拟原站首页首屏的焦点切换体验。",
    image: "/placeholders/hero-2.svg",
    href: "#research",
  },
  {
    eyebrow: "校园风采",
    title: "新院风采示例：以人物、空间和成果塑造学院气质",
    description: "保留首页大图切换的叙事方式，后续可直接替换为真实图片与视频封面。",
    image: "/placeholders/hero-3.svg",
    href: "#campus",
  },
];

export const FEATURED_NEWS: FeaturedNews = {
  title: "学院新闻示例标题：某某活动在学院报告厅顺利举办",
  summary:
    "这是一段占位摘要，用于模拟原站在左侧使用大图、日期卡片与正文标题构成的重点新闻模块。",
  dateLabel: "22",
  monthLabel: "2026-04",
  image: "/placeholders/news-feature.svg",
  href: "#news",
};

export const NEWS_LIST: ListItem[] = [
  {
    title: "学院新闻示例标题一：青年学者论坛顺利举行",
    date: "2026-03-30",
    href: "#news",
  },
  {
    title: "学院新闻示例标题二：师生赴校外参访活动纪实",
    date: "2026-03-30",
    href: "#news",
  },
  {
    title: "学院新闻示例标题三：新问题·新方法系列分享会举办",
    date: "2026-03-13",
    href: "#news",
  },
  {
    title: "学院新闻示例标题四：女教职工专题活动圆满结束",
    date: "2026-03-13",
    href: "#news",
  },
  {
    title: "学院新闻示例标题五：学院行政例会召开",
    date: "2026-03-05",
    href: "#news",
  },
];

export const NOTICE_LIST: NoticeItem[] = [
  {
    day: "18",
    month: "2026.03",
    title: "通知公告示例标题一：研究生招生复试实施细则",
    href: "#notice",
  },
  {
    day: "18",
    month: "2026.03",
    title: "通知公告示例标题二：招生考试进入复试名单",
    href: "#notice",
  },
  {
    day: "17",
    month: "2026.03",
    title: "通知公告示例标题三：港澳台研究生招生安排",
    href: "#notice",
  },
  {
    day: "04",
    month: "2026.01",
    title: "通知公告示例标题四：普通招考与硕博连读名单",
    href: "#notice",
  },
];

export const RESEARCH_CARDS: ResearchCard[] = [
  {
    category: "人才培养",
    title: "学院科研示例标题：中学生学堂与学术实践活动",
    date: "2025-01-25",
    image: "/placeholders/research-1.svg",
    href: "#research",
  },
  {
    category: "人才培养",
    title: "学院科研示例标题：专题展览与现场访学记录",
    date: "2024-09-16",
    image: "/placeholders/research-2.svg",
    href: "#research",
  },
  {
    category: "人才培养",
    title: "学院科研示例标题：新闻卓越班开班纪实",
    date: "2024-09-03",
    image: "/placeholders/research-3.svg",
    href: "#research",
  },
  {
    category: "人才培养",
    title: "学院科研示例标题：专硕研究生赴外参访活动",
    date: "2024-09-03",
    image: "/placeholders/research-4.svg",
    href: "#research",
  },
];

export const CAMPUS_CARDS: CampusCard[] = [
  {
    title: "愿2024级新同学把问题变成答案",
    caption: "学院文化与育人主题展示",
    image: "/placeholders/campus-1.svg",
    href: "#campus",
  },
  {
    title: "九五风华，新院筑梦",
    caption: "毕业纪念与学院形象片展示",
    image: "/placeholders/campus-2.svg",
    href: "#campus",
  },
  {
    title: "来吧，把你的问题变成答案",
    caption: "招生宣传与专业介绍短片",
    image: "/placeholders/campus-3.svg",
    href: "#campus",
  },
  {
    title: "薪火相传，致新生",
    caption: "校友致新专题封面",
    image: "/placeholders/campus-4.svg",
    href: "#campus",
  },
];

export const QUICK_LINKS: QuickLink[] = [
  { label: "新闻大学投稿系统", href: "#links" },
  { label: "实验室预约", href: "#links" },
  { label: "教学场地查询", href: "#links" },
  { label: "图书检索", href: "#links" },
];
