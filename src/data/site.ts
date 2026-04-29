export type SiteLink = {
  label: string;
  href: string;
  description?: string;
};

export type MegaMenuColumn = {
  title: string;
  links: SiteLink[];
};

export type NavigationItem = {
  label: string;
  summary: string;
  columns: MegaMenuColumn[];
  featured: SiteLink[];
};

export const SITE_INFO = {
  name: "某某大学某某学院",
  englishName: "School of Journalism, Example University",
  searchPlaceholder: "请输入关键词...",
  address: "地址：上海市某某区某某路 100 号某某大学某某学院",
  email: "邮箱：contact@example.edu.cn",
  phone: "电话：021-0000 0000",
  copyright: "all rights reserved  某某大学某某学院版权所有",
};

export const UTILITY_LINKS: SiteLink[] = [
  { label: "复旦大学", href: "https://example.edu.cn/" },
  { label: "新院首页", href: "/" },
  { label: "ehall", href: "https://example.edu.cn/" },
  { label: "ENGLISH", href: "https://example.edu.cn/" },
];

export const PRIMARY_NAVIGATION: NavigationItem[] = [
  {
    label: "学院概况",
    summary: "了解学院沿革、团队与组织架构。",
    columns: [
      {
        title: "学院概况",
        links: [
          { label: "学院简介", href: "#campus" },
          { label: "领导团队", href: "#footer" },
          { label: "组织机构", href: "#footer" },
          { label: "系部介绍", href: "#research" },
        ],
      },
      {
        title: "服务入口",
        links: [
          { label: "职能部门", href: "#footer" },
          { label: "常用下载", href: "#links" },
          { label: "学院地图", href: "#hero" },
        ],
      },
    ],
    featured: [
      { label: "学院新闻", href: "#news" },
      { label: "通知公告", href: "#notice" },
    ],
  },
  {
    label: "新闻中心",
    summary: "学院动态、通知公告与媒体相关信息。",
    columns: [
      {
        title: "内容栏目",
        links: [
          { label: "学院新闻", href: "#news" },
          { label: "通知公告", href: "#notice" },
          { label: "教学科研", href: "#research" },
          { label: "媒体报道", href: "#campus" },
        ],
      },
      {
        title: "延伸阅读",
        links: [
          { label: "校友活动", href: "#campus" },
          { label: "学生生活", href: "#campus" },
          { label: "新院风采", href: "#campus" },
        ],
      },
    ],
    featured: [
      { label: "学院新闻精选", href: "#news" },
      { label: "通知公告汇总", href: "#notice" },
    ],
  },
  {
    label: "教职员工",
    summary: "教师队伍、研究支持与行政服务。",
    columns: [
      {
        title: "教师队伍",
        links: [
          { label: "在职教师", href: "#footer" },
          { label: "兼职导师", href: "#footer" },
          { label: "退休教师", href: "#footer" },
          { label: "博士后", href: "#footer" },
        ],
      },
      {
        title: "支持服务",
        links: [
          { label: "党政教辅", href: "#footer" },
          { label: "联系方式", href: "#footer" },
        ],
      },
    ],
    featured: [{ label: "教师名录", href: "#footer" }],
  },
  {
    label: "学术学科",
    summary: "科研、成果、期刊与研究中心展示。",
    columns: [
      {
        title: "学术平台",
        links: [
          { label: "科研动态", href: "#research" },
          { label: "学术成果", href: "#research" },
          { label: "学术期刊", href: "#research" },
          { label: "研究中心", href: "#research" },
        ],
      },
      {
        title: "研究专题",
        links: [
          { label: "项目合作", href: "#links" },
          { label: "学术交流", href: "#campus" },
        ],
      },
    ],
    featured: [{ label: "科研动态", href: "#research" }],
  },
  {
    label: "人才培养",
    summary: "招生、本科、研究生与课程资源。",
    columns: [
      {
        title: "培养体系",
        links: [
          { label: "招生信息", href: "#notice" },
          { label: "本科生教育", href: "#research" },
          { label: "研究生教育", href: "#research" },
          { label: "常用下载", href: "#links" },
        ],
      },
      {
        title: "课程资源",
        links: [
          { label: "人才培养项目", href: "#research" },
          { label: "课程介绍", href: "#campus" },
        ],
      },
    ],
    featured: [{ label: "招生专区", href: "#notice" }],
  },
  {
    label: "合作交流",
    summary: "国际交流、会议与合作项目展示。",
    columns: [
      {
        title: "交流项目",
        links: [
          { label: "学位项目", href: "#campus" },
          { label: "非学位交流", href: "#campus" },
          { label: "港澳台交流", href: "#campus" },
          { label: "国际会议", href: "#campus" },
        ],
      },
      {
        title: "合作窗口",
        links: [
          { label: "项目合作", href: "#links" },
          { label: "访学项目", href: "#campus" },
        ],
      },
    ],
    featured: [{ label: "交流合作", href: "#campus" }],
  },
  {
    label: "教育培训",
    summary: "继续教育、培训课程与常规项目。",
    columns: [
      {
        title: "培训入口",
        links: [
          { label: "相关介绍", href: "#links" },
          { label: "常规培训", href: "#links" },
          { label: "热门课程", href: "#links" },
        ],
      },
      {
        title: "延伸入口",
        links: [{ label: "培训报名", href: "#notice" }],
      },
    ],
    featured: [{ label: "培训项目", href: "#links" }],
  },
  {
    label: "校友天地",
    summary: "校友活动、校友会与校友故事。",
    columns: [
      {
        title: "校友内容",
        links: [
          { label: "校友活动", href: "#campus" },
          { label: "校友会", href: "#footer" },
          { label: "校友故事", href: "#campus" },
          { label: "捐赠", href: "#footer" },
        ],
      },
      {
        title: "品牌活动",
        links: [{ label: "专题回顾", href: "#campus" }],
      },
    ],
    featured: [{ label: "校友天地", href: "#campus" }],
  },
  {
    label: "全球大学生智能影像创作大赛",
    summary: "赛事信息、征集公告与作品展示。",
    columns: [
      {
        title: "赛事入口",
        links: [
          { label: "赛事简介", href: "#campus" },
          { label: "报名通道", href: "#notice" },
          { label: "获奖作品", href: "#campus" },
        ],
      },
      {
        title: "资料下载",
        links: [{ label: "参赛手册", href: "#links" }],
      },
    ],
    featured: [{ label: "赛事专题", href: "#campus" }],
  },
];

export const FOOTER_COLUMNS: MegaMenuColumn[] = [
  {
    title: "学院概况",
    links: [
      { label: "学院简介", href: "#campus" },
      { label: "领导团队", href: "#footer" },
      { label: "组织机构", href: "#footer" },
      { label: "系部介绍", href: "#footer" },
      { label: "职能部门", href: "#footer" },
    ],
  },
  {
    title: "新闻中心",
    links: [
      { label: "学院新闻", href: "#news" },
      { label: "通知公告", href: "#notice" },
      { label: "教学科研", href: "#research" },
      { label: "媒体报道", href: "#campus" },
      { label: "校友活动", href: "#campus" },
      { label: "学生生活", href: "#campus" },
    ],
  },
  {
    title: "教职员工",
    links: [
      { label: "在职教师", href: "#footer" },
      { label: "兼职导师", href: "#footer" },
      { label: "退休教师", href: "#footer" },
      { label: "党政教辅", href: "#footer" },
      { label: "博士后", href: "#footer" },
    ],
  },
  {
    title: "学术学科",
    links: [
      { label: "科研动态", href: "#research" },
      { label: "学术成果", href: "#research" },
      { label: "学术期刊", href: "#research" },
      { label: "研究中心", href: "#research" },
      { label: "合作项目", href: "#campus" },
    ],
  },
  {
    title: "人才培养",
    links: [
      { label: "招生信息", href: "#notice" },
      { label: "本科生教育", href: "#research" },
      { label: "研究生教育", href: "#research" },
      { label: "常用下载", href: "#links" },
      { label: "培养项目", href: "#research" },
    ],
  },
  {
    title: "合作交流",
    links: [
      { label: "学位项目", href: "#campus" },
      { label: "非学位交流", href: "#campus" },
      { label: "港澳台交流", href: "#campus" },
      { label: "国际会议", href: "#campus" },
    ],
  },
  {
    title: "教育培训",
    links: [
      { label: "相关介绍", href: "#links" },
      { label: "常规培训", href: "#links" },
      { label: "热门课程", href: "#links" },
    ],
  },
  {
    title: "校友天地",
    links: [
      { label: "校友活动", href: "#campus" },
      { label: "校友会", href: "#footer" },
      { label: "复旦新闻馆", href: "#campus" },
      { label: "捐赠", href: "#footer" },
    ],
  },
  {
    title: "赛事专题",
    links: [
      { label: "全球大学生智能影像创作大赛", href: "#campus" },
      { label: "报名入口", href: "#notice" },
      { label: "作品展示", href: "#campus" },
    ],
  },
];

export const SOCIAL_LINKS: SiteLink[] = [
  { label: "微信", href: "https://example.edu.cn/" },
  { label: "视频号", href: "https://example.edu.cn/" },
];
