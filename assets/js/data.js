/* study-note: data.js
 * 作用：首页静态数据源。
 * 设计意图：把导航、轮播、新闻、通知、科研、快捷链接等可替换内容从 DOM 操作中剥离出来。
 * 学习重点：页面结构在 index.html，视觉在 CSS，内容数据在这里，交互脚本只读取 window.siteData，不硬编码栏目内容。
 */
(function () {
  /* 暴露到 window，方便普通 script 标签按顺序加载；data.js 必须早于 main.js 和 pages/home.js。 */
  window.siteData = {
    schoolName: "乐山师范学院",
    collegeName: "新闻与传媒学院",
    homeUrl: "https://xwcm.lsnu.edu.cn/index.htm",
    /* 顶部快捷链接：main.js 会同时渲染到桌面页头和移动端抽屉。 */
    topLinks: [
      { name: "学校主页", sourceUrl: "https://www.lsnu.edu.cn/", href: "#" },
      { name: "学院首页", sourceUrl: "https://xwcm.lsnu.edu.cn/index.htm", href: "#" },
      { name: "数字校园门户", sourceUrl: "待补充", href: "#" },
      { name: "English", sourceUrl: "待补充", href: "#" }
    ],
    /* 主导航数据：children 存在时，桌面端渲染下拉菜单，移动端渲染 details 折叠菜单。 */
    nav: [
      {
        name: "学院概况",
        href: "pages/about/index.html",
        children: ["学院简介", "学院领导", "组织机构", "系部介绍", "历史沿革"]
      },
      {
        name: "师资力量",
        href: "pages/faculty/index.html",
        children: ["新闻学系", "网络与新媒体系", "数字媒体技术系", "播音与主持艺术系", "荣休教师"]
      },
      {
        name: "学科建设",
        href: "pages/discipline/index.html",
        children: ["科研动态", "学术成果", "琢玉论坛", "研究中心"]
      },
      {
        name: "人才培养",
        href: "pages/education/index.html",
        children: ["本科教育", "研究生教育", "继续教育"]
      },
      {
        name: "招生就业",
        href: "pages/admissions/index.html",
        children: ["本科招生", "研究生招生", "继续教育招生", "留学生招生", "就业信息"]
      },
      {
        name: "党建工作",
        href: "pages/party/index.html",
        children: ["党建动态", "支部风采"]
      },
      {
        name: "校友风采",
        href: "pages/alumni/index.html",
        children: ["校友活动", "校友会", "优秀校友"]
      }
    ],
    /* 页脚栏目顺序：默认映射顶部 nav；这里只用于页脚局部排序。 */
    footerNavOrder: ["学院概况", "师资力量", "学科建设", "招生就业", "人才培养", "党建工作", "校友风采"],
    /* 轮播数据：唯一维护入口。
     * 规则：所有 hero 图片统一放在 assets/images/home/hero/，推荐 1920×1080、16:9、JPG/WebP；移动端和电脑端共用同一套图。
     * 首页 HTML 不再写死 slide 和圆点，pages/home.js 会按这里的数组自动渲染。
     */
    heroSlides: [
      {
        title: "2025年四川省广播影视高等教育学术年会在乐山举行",
        subtitle: "学院主轮播",
        image: "assets/images/home/hero/hero-01.jpg",
        alt: "2025年四川省广播影视高等教育学术年会现场合影",
        objectPosition: "center center",
        sourceUrl: "https://xwcm.lsnu.edu.cn/img/2.jpg",
        href: "#"
      },
      {
        title: "2025年四川省广播影视高等教育学术年会在乐山举行",
        subtitle: "学院主轮播",
        image: "assets/images/home/hero/hero-02.jpg",
        alt: "2025年四川省广播影视高等教育学术年会会议现场",
        objectPosition: "center center",
        sourceUrl: "https://xwcm.lsnu.edu.cn/img/1.jpg",
        href: "#"
      },
      {
        title: "新闻与传媒学院师生赴峨眉山市融媒体中心参观学习",
        subtitle: "实践教学",
        image: "assets/images/home/hero/hero-03.jpg",
        alt: "新闻与传媒学院师生在峨眉山市融媒体中心参观学习",
        objectPosition: "center center",
        sourceUrl: "https://xwcm.lsnu.edu.cn/images/QQ20251205-134519.jpg",
        href: "#"
      },
      {
        title: "新闻与传媒学院师生赴沐川县融媒体中心开展实践教学",
        subtitle: "实践教学",
        image: "assets/images/home/hero/hero-04.jpg",
        alt: "新闻与传媒学院师生在沐川县融媒体中心开展实践教学",
        objectPosition: "center center",
        sourceUrl: "https://xwcm.lsnu.edu.cn/images/QQ20251205-134140.jpg",
        href: "#"
      },
      {
        title: "新传琢玉读书会正式启动",
        subtitle: "专题活动",
        image: "assets/images/home/hero/hero-05.jpg",
        alt: "新传琢玉读书会专题宣传图",
        objectPosition: "center center",
        sourceUrl: "https://xwcm.lsnu.edu.cn/images/A502650333F9D4D012E15BF398D033DA.png",
        href: "#"
      },
      {
        title: "新闻与传媒学院举办传媒一线专题交流讲座",
        subtitle: "学术交流",
        image: "assets/images/home/hero/hero-06.jpg",
        alt: "传媒一线专题交流讲座宣传图",
        objectPosition: "center center",
        sourceUrl: "https://xwcm.lsnu.edu.cn/images/qcdd.png",
        href: "#"
      },
      {
        title: "学院通知公告与专题活动信息同步更新",
        subtitle: "学院公告",
        image: "assets/images/home/hero/hero-07.jpg",
        alt: "学院通知公告与专题活动信息图",
        objectPosition: "center center",
        sourceUrl: "https://xwcm.lsnu.edu.cn/images/tzb.png",
        href: "#"
      }
    ],
    /* 新闻数据：第一条是默认主新闻，后续条目用于右侧列表激活后同步更新左侧主卡。 */
    news: [
      { title: "新闻与传媒学院2026届考研成绩取得历史性突破", summary: "学院共有24名学子成功上岸，录取人数较2025届增长33%，创历史新高。7名同学考取211高校，2名考取双一流高校。", date: "2026-04-30", image: "assets/images/home/news/news-01.jpg", sourceUrl: "https://xwcm.lsnu.edu.cn/info/1045/2001.htm", href: "#", featured: true },
      { title: "研途领航，薪火相传——新传学院考研经验分享会成功举办", summary: "学院特邀高分上岸学姐分享实战经验，为备考学子送上干货满满的考研通关指南。", date: "2026-04-30", image: "assets/images/home/news/news-02.jpg", sourceUrl: "https://xwcm.lsnu.edu.cn/info/1045/1990.htm", href: "#" },
      { title: "我院教师参加\"数智时代的新闻传播使命与创新\"学术研讨会并作报告", summary: "院长杨晓军教授担任专题主持人，胡明老师作\"AI赋能新闻传播教学的探析\"报告。", date: "2026-04-27", image: "assets/images/home/news/news-03.jpg", sourceUrl: "https://xwcm.lsnu.edu.cn/info/1045/1950.htm", href: "#" },
      { title: "我院青年教师胡明受邀参加《全球传媒学刊》学术活动", summary: "论文从54篇投稿中入选，赴清华大学参加\"可持续发展与新闻传播\"工作坊。", date: "2026-04-24", image: "assets/images/home/news/news-04.png", sourceUrl: "https://xwcm.lsnu.edu.cn/info/1045/1940.htm", href: "#" },
      { title: "深挖文化底蕴 共探艺术价值——新闻与传媒学院举办学术讲座", summary: "特邀乐山文史专家魏奕雄先生开展《乐山大佛的水利、文化与美学意义》专题讲座。", date: "2026-04-10", image: "assets/images/home/news/news-05.png", sourceUrl: "https://xwcm.lsnu.edu.cn/info/1045/1902.htm", href: "#" },
      { title: "新闻与传媒学院\"微专业\"线下宣讲活动成功举办", summary: "学院开设直播营销、公务员知识与技能、智能影像传播三个微专业，助力学子多元发展。", date: "2026-04-10", image: "assets/images/home/hero/hero-05.jpg", sourceUrl: "https://xwcm.lsnu.edu.cn/info/1045/1900.htm", href: "#" },
      { title: "新闻与传媒学院召开2026年度春季学期家庭经济困难学生认定工作会", summary: "学院围绕学生资助、认定流程和材料规范开展专题工作会，持续完善学生服务支持体系。", date: "2026-04-03", image: "assets/images/home/news/news-01.jpg", sourceUrl: "https://xwcm.lsnu.edu.cn/info/1045/1878.htm", href: "#" },
      { title: "学院召开新媒体课程建设研讨会，推进内容生产协同", summary: "围绕课程体系、实践平台和内容协同机制展开专题研讨，持续完善学院人才培养路径。", date: "2026-03-29", image: "assets/images/home/hero/hero-06.jpg", sourceUrl: "https://xwcm.lsnu.edu.cn/info/1045/1888.htm", href: "#" },
      { title: "学院师生走进融媒体平台开展实践教学观摩", summary: "师生团队赴本地融媒体平台开展现场观摩与岗位认知实践，强化课堂与行业现场联动。", date: "2026-03-18", image: "assets/images/home/hero/hero-07.jpg", sourceUrl: "https://xwcm.lsnu.edu.cn/info/1045/1868.htm", href: "#" }
    ],
    /* 通知置顶总开关：true 时读取 notices 里的 pinned；false 时全部按原始顺序展示。 */
    noticePinEnabled: true,
    /* 通知数据：pinned: true 表示置顶；配合 noticePinEnabled 可一键开启或关闭所有置顶效果。 */
    notices: [
      { title: "新传学院2026年度\"学生资助宣传大使\"拟推荐名单公示", date: "2026-04-22", sourceUrl: "https://xwcm.lsnu.edu.cn/info/1055/1930.htm", href: "#", pinned: true },
      { title: "征稿通知丨2026年跨文化传播研究工作坊", date: "2026-04-21", sourceUrl: "https://xwcm.lsnu.edu.cn/info/1055/1922.htm", href: "#" },
      { title: "新闻与传媒学院2026年实验室开放项目公示", date: "2026-03-24", sourceUrl: "https://xwcm.lsnu.edu.cn/info/1055/1820.htm", href: "#" },
      { title: "关于2026届学生毕业论文形式规范检测的通知", date: "2026-03-16", sourceUrl: "https://xwcm.lsnu.edu.cn/info/1055/1803.htm", href: "#" },
      { title: "乐山师范学院党委第五轮巡察公告", date: "2026-01-12", sourceUrl: "https://xwcm.lsnu.edu.cn/info/1055/1663.htm", href: "#" },
      { title: "【琢玉论坛】学术论文写作规范与期刊选稿要求", date: "2026-01-05", sourceUrl: "https://xwcm.lsnu.edu.cn/info/1055/1623.htm", href: "#" }
    ],
    /* 教学科研数据：对应首页深红背景区域的四张卡片，数量锁定为 4。 */
    research: [
      { title: "新闻与传媒学院举办传媒一线专题交流讲座", date: "2026-04-28", summary: "特邀海南广电国际传播融媒体中心记者王天琦开展《深耕传媒一线》专题交流讲座。", sourceUrl: "https://xwcm.lsnu.edu.cn/info/1127/1970.htm", href: "#", image: "assets/images/home/research/research-01.jpg" },
      { title: "《新闻界》责任编辑徐秋染受邀在\"琢玉论坛\"开讲", date: "2026-01-09", summary: "解读《学术论文编写规则》标准，分析常见写作误区，为科研成果规范化表达提供指导。", sourceUrl: "https://xwcm.lsnu.edu.cn/info/1127/1652.htm", href: "#", image: "assets/images/home/research/research-02.jpg" },
      { title: "天津大学庞华教授受邀在\"琢玉论坛\"开讲", date: "2026-01-09", summary: "围绕英文期刊发表的五大核心环节展开，系统分享期刊选择与投稿策略。", sourceUrl: "https://xwcm.lsnu.edu.cn/info/1127/1651.htm", href: "#", image: "assets/images/home/research/research-03.jpg" },
      { title: "西南民族大学新闻传播学院邓备教授莅临我院开展讲座", date: "2025-12-22", summary: "聚焦《昨夜星辰：四川知名媒体人自述》，通过真实行业故事强化学生专业认同感。", sourceUrl: "https://xwcm.lsnu.edu.cn/info/1127/1591.htm", href: "#", image: "assets/images/home/research/research-04.jpg" }
    ],
    /* 快速链接：pages/home.js 会清空 HTML 占位内容并按这里的数据重新生成。 */
    quickLinks: [
      { name: "数字校园门户", icon: "portal", href: "#" },
      { name: "教务管理系统", icon: "academic", href: "#" },
      { name: "实验室预约", icon: "lab", href: "#" },
      { name: "学术检索", icon: "search", href: "#" }
    ],
    /* 页脚信息：当前 HTML 静态写入；这里保留统一数据，后续可继续抽成 JS 渲染。 */
    footer: {
      schoolName: "乐山师范学院",
      collegeName: "新闻与传媒学院",
      address: "四川省乐山市市中区滨河路778号旷怡楼2楼",
      phone: "待补充",
      email: "待补充",
      copyright: ""
    }
  };
})();
