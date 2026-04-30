/* study-note: pages/home.js
 * 作用：首页私有交互：轮播、新闻联动、通知激活态、快速链接渲染。
 * 与 main.js 的边界：main.js 管全站框架；home.js 只读取首页主体里的 data-* 节点。
 * 学习重点：所有函数都先查找必要 DOM，缺失就提前 return，这让脚本在非首页加载时也不会报错。
 */
(function () {
  var siteData = window.siteData || {};

  /* ===== Slider ===== */
  function initSlider() {
    // 轮播初始化：收集 DOM、复制首尾 slide、把每格宽度写入 CSS 变量，再绑定按钮/圆点/自动播放/暂停逻辑。
    var root = document.querySelector("[data-slider]");
    if (!root) {
      return;
    }

    var viewport = root.querySelector(".slider-viewport");
    var track = root.querySelector(".slider-track");
    var sourceSlides = Array.from(root.querySelectorAll(".slide"));
    var dots = Array.from(root.querySelectorAll(".dot"));
    var prev = root.querySelector(".slider-arrow.prev");
    var next = root.querySelector(".slider-arrow.next");
    if (!viewport || !track || sourceSlides.length < 2 || !prev || !next) {
      return;
    }

    var index = 1; // 轨道当前位置。因为 setupClones() 会在最前面插入“最后一张克隆”，所以真实第一张的轨道索引是 1，不是 0。
    var timer = null; // 自动播放定时器句柄。start() 创建它，stop() 清掉它，避免用户连续点击后出现多个 setInterval 同时推进。
    var delay = 2500; // 自动播放间隔，单位毫秒。参考站 SuperSlide 默认 interTime 是 2500，所以这里每 2.5 秒尝试横移一格。
    var paused = false; // 暂停标记。鼠标悬停或键盘焦点进入轮播时设为 true，让自动播放暂时不推进 index。
    var isAnimating = false; // 动画锁。true 表示上一格横移动画还没结束，此时忽略新的移动请求，防止连续点击或自动播放叠加造成位置错乱。
    var slideCount = sourceSlides.length; // 原始 slide 数量，不包含首尾克隆。圆点和边界判断都必须基于原始数量计算。

    setupClones(track, sourceSlides);
    preloadSliderImages(root);

    function getSlideWidth() {
      // 返回“一格”的固定宽度，单位是 px。
      // viewport.clientWidth 是当前可视窗口的内容宽度，不包含滚动条。
      // 每次横移距离都使用这个值，确保 transform 移动距离和 CSS 里的每格宽度完全一致。
      return viewport.clientWidth;
    }

    function syncSlideWidth() {
      // 把 JS 测到的视窗宽度写入 CSS 自定义属性 --slider-cell-width。
      // CSS 中 .slide 的 flex-basis 和 width 都读取这个变量，所以所有 slide 会被锁定成同一个固定宽度。
      // 写在 root 上的好处是作用域只覆盖当前轮播，不影响页面其他模块。
      root.style.setProperty("--slider-cell-width", getSlideWidth() + "px");
    }

    function getRealIndex() {
      // 把包含克隆项的轨道索引换算成 0-based 的真实圆点索引。
      // 例：index=1 表示真实第 1 张，返回 0；index=slideCount+1 表示“第 1 张克隆”，也返回 0。
      // 加 slideCount 再取模，是为了 index=0（最后一张克隆）时也能得到合法的最后一张真实索引。
      return ((index - 1) % slideCount + slideCount) % slideCount;
    }

    function updateState() {
      // 同步语义状态：
      // 1. .is-active 只作为“当前格”标记，不再触发图片透明度、缩放或布局尺寸变化。
      // 2. aria-hidden 告诉辅助技术非当前 slide 暂时不可见。
      // 3. aria-pressed 告诉辅助技术当前被选中的圆点是哪一个。
      Array.from(track.querySelectorAll(".slide")).forEach(function (slide, slideIndex) {
        var isActive = slideIndex === index;
        slide.classList.toggle("is-active", isActive);
        slide.setAttribute("aria-hidden", String(!isActive));
      });
      dots.forEach(function (dot, dotIndex) {
        var isActiveDot = dotIndex === getRealIndex();
        dot.classList.toggle("is-active", isActiveDot);
        dot.setAttribute("aria-pressed", String(isActiveDot));
      });
    }

    function setPosition(skipTransition) {
      // 设置轨道位置。
      // 参数 skipTransition:
      // - false：普通切换，保留 CSS transition，让整条长轨道自然横向滑动一格。
      // - true：初始化、窗口缩放、从克隆图跳回真实图时使用，临时关闭 transition，避免出现“倒退回跳”的动画。
      // transform 位移公式：-(当前轨道索引 × 单格宽度)。
      // 例：index=3、单格宽度=1200px，则轨道移动 -3600px，视窗正好露出第 3 格。
      // 参考站 SuperSlide 用的是 `ul.left = -(... * 1200px)`；这里用 transform 得到同样视觉位移。
      syncSlideWidth();
      isAnimating = !skipTransition;
      track.classList.toggle("is-jump", Boolean(skipTransition));
      track.style.transform = "translate3d(" + -index * getSlideWidth() + "px, 0, 0)";
      updateState();
      if (skipTransition) {
        // 读取 offsetHeight 用来强制浏览器立即应用 transition: none。
        // 否则下一帧移除 is-jump 时，浏览器可能把“瞬跳”和“恢复动画”合并，导致边界衔接出现可见抖动。
        track.offsetHeight;
        window.requestAnimationFrame(function () {
          track.classList.remove("is-jump");
        });
      }
    }

    function moveTo(nextIndex) {
      // 普通移动入口。
      // nextIndex 可以是 0 或 slideCount + 1，这两个值分别代表尾部克隆和首部克隆。
      // 允许先移动到克隆格，是实现首尾自然衔接的关键。
      // isAnimating 为 true 时直接返回，表示上一段横移还在播放；这样每次只移动“一格”，不会把多次点击叠成跳格。
      if (isAnimating || nextIndex === index) {
        return;
      }
      index = nextIndex;
      setPosition(false);
    }

    function jumpIfNeeded(event) {
      // 首尾无缝衔接处理。
      // 当轨道动画结束时，如果当前 index 落在克隆格：
      // - index === 0：说明从真实第一张向左滑到了“最后一张克隆”，此时瞬跳到真实最后一张 slideCount。
      // - index === slideCount + 1：说明从真实最后一张向右滑到了“第一张克隆”，此时瞬跳到真实第一张 1。
      // 因为克隆图和真实图内容完全一致，且 setPosition(true) 不播放 transition，所以用户只看到连续横移。
      if (event && event.target !== track) {
        return;
      }
      if (index === 0) {
        index = slideCount;
        setPosition(true);
        return;
      }
      if (index === slideCount + 1) {
        index = 1;
        setPosition(true);
        return;
      }
      isAnimating = false;
    }

    function start() {
      // 启动自动播放。
      // 每次启动前先 stop()，保证最多只有一个定时器在运行。
      // 定时器每 delay 毫秒尝试把 index 推进一格；如果 paused=true，则本轮不移动。
      // isAnimating=true 时也不推进，确保自动播放不会和正在进行的横移动画叠加。
      stop();
      timer = window.setInterval(function () {
        if (!paused && !isAnimating) {
          moveTo(index + 1);
        }
      }, delay);
    }

    function stop() {
      // 停止自动播放。
      // clearInterval 需要 timer 句柄；清掉后把 timer 设回 null，表示当前没有定时器。
      if (timer) {
        window.clearInterval(timer);
        timer = null;
      }
    }

    prev.addEventListener("click", function () {
      moveTo(index - 1);
      start();
    });
    next.addEventListener("click", function () {
      moveTo(index + 1);
      start();
    });
    dots.forEach(function (dot, dotIndex) {
      dot.addEventListener("click", function () {
        moveTo(dotIndex + 1);
        start();
      });
    });
    track.addEventListener("transitionend", jumpIfNeeded);
    root.addEventListener("mouseenter", function () {
      // 鼠标进入轮播区域时暂停自动播放，避免用户准备点击箭头/圆点时轨道自动移动。
      paused = true;
    });
    root.addEventListener("mouseleave", function () {
      // 鼠标离开后恢复自动播放，但不会重建定时器，只是允许下一次 interval 生效。
      paused = false;
    });
    root.addEventListener("focusin", function () {
      // 键盘用户 Tab 到轮播控件时暂停，避免焦点所在内容被自动切走。
      paused = true;
    });
    root.addEventListener("focusout", function () {
      // 焦点离开轮播后恢复自动播放。
      paused = false;
    });
    window.addEventListener("resize", function () {
      // 视窗宽度变化后，每格固定宽度也要重新同步。
      // 这里使用 skipTransition=true，避免用户看到轨道因为重新计算宽度而动画抖动。
      setPosition(true);
    });

    setPosition(true);
    start();
  }

  function setupClones(track, sourceSlides) {
    // 首尾各复制一张 slide，生成的轨道顺序是：
    // [最后一张克隆] [真实第 1 张] [真实第 2 张] ... [真实最后一张] [第 1 张克隆]
    // 这样从真实最后一张向右滑时，下一格看到的是“第 1 张克隆”；动画结束后再瞬跳回真实第 1 张。
    // 反方向同理，从真实第 1 张向左滑到“最后一张克隆”，再瞬跳回真实最后一张。
    var firstClone = sourceSlides[0].cloneNode(true);
    var lastClone = sourceSlides[sourceSlides.length - 1].cloneNode(true);
    firstClone.setAttribute("data-clone", "true");
    lastClone.setAttribute("data-clone", "true");
    track.insertBefore(lastClone, sourceSlides[0]);
    track.appendChild(firstClone);
  }

  function preloadSliderImages(root) {
    // 预加载所有轮播图片。
    // new Image() 会创建一个离屏图片对象；给它设置 src 后，浏览器会提前请求该资源。
    // 这不会改变 DOM，也不会影响布局，只是减少第一次滑到某张图时的加载空白。
    root.querySelectorAll(".slide img").forEach(function (img) {
      var image = new Image();
      image.src = img.currentSrc || img.src;
    });
  }

  /* ===== News Active State (with featured sync) ===== */
  function initNewsActiveState() {
    // 新闻区联动：右侧列表激活哪一条，左侧大卡就切换到对应新闻数据。
    var newsSection = document.querySelector("[data-news-section]");
    var newsFeature = document.querySelector("[data-news-feature]");
    var newsList = document.querySelector("[data-news-list]");
    var listItems = newsList ? Array.from(newsList.querySelectorAll(".news-list-item")) : [];
    var newsData = siteData.news || [];

    if (!newsSection || !newsList || !listItems.length || !newsFeature) {
      return;
    }

    var defaultIndex = 0;
    var currentActiveIndex = defaultIndex;

    function updateFeaturedCard(index) {
      // index 来自右侧列表；列表第一条对应 newsData[1]，因为 newsData[0] 是默认主新闻。
      var data = newsData[index + 1]; // +1 because first item is featured by default in original layout
      if (!data) {
        data = newsData[0];
      }
      if (!data) return;

      var img = newsFeature.querySelector(".news-image img");
      var dayEl = newsFeature.querySelector(".date-badge strong");
      var monthEl = newsFeature.querySelector(".date-badge span");
      var titleEl = newsFeature.querySelector(".news-copy h3");
      var summaryEl = newsFeature.querySelector(".news-copy p");

      if (img && data.image) {
        img.src = data.image;
        img.alt = data.title || "";
      }
      if (dayEl && data.date) {
        var parts = data.date.split("-");
        dayEl.textContent = parts[2] || "";
      }
      if (monthEl && data.date) {
        var parts = data.date.split("-");
        monthEl.textContent = (parts[0] || "") + "-" + (parts[1] || "");
      }
      if (titleEl) {
        titleEl.textContent = data.title || "";
      }
      if (summaryEl) {
        summaryEl.textContent = data.summary || "";
      }
    }

    function setActive(item, index) {
      // 激活单个列表项，同时保持左侧新闻卡处于强调态。
      listItems.forEach(function (node) {
        node.classList.toggle("is-active", node === item);
      });
      newsFeature.classList.toggle("is-active", item !== null);
      currentActiveIndex = index;
      if (item !== null) {
        updateFeaturedCard(index);
      } else {
        updateFeaturedCard(defaultIndex - 1);
      }
    }

    function clearActive() {
      // 初始化默认激活第一条列表，并把左侧主卡切回默认新闻。
      listItems.forEach(function (node, idx) {
        node.classList.toggle("is-active", idx === defaultIndex);
      });
      newsFeature.classList.add("is-active");
      currentActiveIndex = defaultIndex;
      updateFeaturedCard(defaultIndex - 1);
    }

    // Default: activate first item
    clearActive();

    listItems.forEach(function (item, index) {
      var activate = function (event) {
        if (event.type === "click") {
          event.preventDefault();
        }
        setActive(item, index);
      };
      item.addEventListener("mouseenter", activate);
      item.addEventListener("focusin", activate);
      item.addEventListener("click", activate);
    });

    // 鼠标移出新闻区域后，保留最后激活的状态，不恢复默认第一条
  }

  /* ===== Notice Active State ===== */
  function initNoticeActiveState() {
    // 通知区只需要视觉激活态，不需要替换内容，因此逻辑比新闻区更简单。
    var grid = document.querySelector("[data-notice-grid]");
    var cards = grid ? Array.from(grid.querySelectorAll(".notice-card")) : [];
    if (!grid || !cards.length) {
      return;
    }

    function setActive(index) {
      // 只保留一个通知卡片处于 is-active 状态，形成明确焦点。
      cards.forEach(function (card, cardIndex) {
        card.classList.toggle("is-active", cardIndex === index);
      });
    }

    function clearActive() {
      // 鼠标离开或焦点移出通知区时，移除所有通知卡片的强调状态。
      cards.forEach(function (card) {
        card.classList.remove("is-active");
      });
    }

    cards.forEach(function (card, index) {
      var activate = function () {
        setActive(index);
      };
      card.addEventListener("mouseenter", activate);
      card.addEventListener("focusin", activate);
      card.addEventListener("click", function (event) {
        event.preventDefault();
        activate();
      });
    });

    grid.addEventListener("mouseleave", clearActive);
    grid.addEventListener("focusout", function (event) {
      if (!grid.contains(event.relatedTarget)) {
        clearActive();
      }
    });
  }

  /* ===== Quick Links ===== */
  function initQuickLinks() {
    // 快速链接从 siteData 渲染，方便以后只改数据不改 HTML。
    var container = document.querySelector("[data-quicklinks-list]");
    var links = siteData.quickLinks || [];
    if (!container || !links.length) {
      return;
    }

    container.textContent = "";
    links.forEach(function (item) {
      container.appendChild(createLink(item));
    });
  }

  function createLink(item, className) {
    // 首页私有的简单链接工厂，避免为 quickLinks 引入额外依赖。
    var link = document.createElement("a");
    link.href = item.href || "#";
    link.textContent = item.name || item.title || "";
    if (className) {
      link.className = className;
    }
    return link;
  }

  /* ===== Init ===== */
  initSlider();
  initNewsActiveState();
  initNoticeActiveState();
  initQuickLinks();
})();
