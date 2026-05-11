/* study-note: pages/home.js
 * 作用：首页私有交互：轮播、学院新闻、通知公告、快速链接渲染。
 * 与 main.js 的边界：main.js 管全站框架；home.js 只读取首页主体里的 data-* 节点。
 * 学习重点：首页 HTML 只放“容器”，内容统一从 assets/js/data.js 读取；新增栏目时不要把数据写死在 HTML 中。
 */
(function () {
  var siteData = window.siteData || {};
  var NEWS_LIST_VISIBLE_COUNT = 7;

  /* ===== Date helpers ===== */
  function parseDate(dateString) {
    var fallback = { year: '', month: '', day: '', monthDay: '', iso: dateString || '' };
    if (!dateString || typeof dateString !== 'string') {
      return fallback;
    }
    var parts = dateString.split('-');
    if (parts.length < 3) {
      return fallback;
    }
    var year = parts[0] || '';
    var month = (parts[1] || '').padStart(2, '0');
    var day = (parts[2] || '').padStart(2, '0');
    return {
      year: year,
      month: month,
      day: day,
      monthDay: month + '-' + day,
      iso: year + '-' + month + '-' + day
    };
  }

  function createDateBlock(tagName, dateString, className) {
    var parts = parseDate(dateString);
    var node = document.createElement(tagName || 'span');
    var date = document.createElement('strong');
    var year = tagName === 'time' ? document.createElement('small') : document.createElement('span');

    node.className = className || '';
    node.classList.add('date-block');
    if (tagName === 'time') {
      node.dateTime = parts.iso;
    }
    node.setAttribute('aria-label', parts.iso || dateString || '日期');
    date.className = 'date-block-date';
    year.className = 'date-block-year';
    date.textContent = parts.monthDay;
    year.textContent = parts.year;
    node.appendChild(date);
    node.appendChild(year);
    return node;
  }

  function createTextElement(tagName, className, text) {
    var node = document.createElement(tagName);
    if (className) {
      node.className = className;
    }
    node.textContent = text || '';
    return node;
  }

  /* ===== Slider ===== */
  function initSlider() {
    var root = document.querySelector('[data-slider]');
    if (!root) {
      return;
    }

    renderHeroSlides(root);

    var viewport = root.querySelector('.slider-viewport');
    var track = root.querySelector('.slider-track');
    var sourceSlides = track ? Array.from(track.querySelectorAll('.slide')) : [];
    var dots = Array.from(root.querySelectorAll('.dot'));
    var prev = root.querySelector('.slider-arrow.prev');
    var next = root.querySelector('.slider-arrow.next');
    if (!viewport || !track || !sourceSlides.length || !prev || !next) {
      return;
    }

    var slideCount = sourceSlides.length;
    root.classList.toggle('has-single-slide', slideCount === 1);

    if (slideCount === 1) {
      sourceSlides[0].classList.add('is-active');
      sourceSlides[0].setAttribute('aria-hidden', 'false');
      prev.hidden = true;
      next.hidden = true;
      var dotWrap = root.querySelector('.slider-dots');
      if (dotWrap) {
        dotWrap.hidden = true;
      }
      preloadSliderImages(root);
      return;
    }

    var index = 1;
    var timer = null;
    var delay = 4200;
    var paused = false;
    var isAnimating = false;
    var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    setupClones(track, sourceSlides);
    preloadSliderImages(root);

    function getSlideWidth() {
      return viewport.clientWidth;
    }

    function syncSlideWidth() {
      root.style.setProperty('--slider-cell-width', getSlideWidth() + 'px');
    }

    function getRealIndex() {
      return ((index - 1) % slideCount + slideCount) % slideCount;
    }

    function updateState() {
      Array.from(track.querySelectorAll('.slide')).forEach(function (slide, slideIndex) {
        var isActive = slideIndex === index;
        slide.classList.toggle('is-active', isActive);
        slide.setAttribute('aria-hidden', String(!isActive));
        slide.querySelectorAll('a, button').forEach(function (control) {
          control.tabIndex = isActive ? 0 : -1;
        });
      });
      dots.forEach(function (dot, dotIndex) {
        var isActiveDot = dotIndex === getRealIndex();
        dot.classList.toggle('is-active', isActiveDot);
        dot.setAttribute('aria-pressed', String(isActiveDot));
      });
    }

    function setPosition(skipTransition) {
      syncSlideWidth();
      isAnimating = !skipTransition;
      track.classList.toggle('is-jump', Boolean(skipTransition));
      track.style.transform = 'translate3d(' + -index * getSlideWidth() + 'px, 0, 0)';
      updateState();
      if (skipTransition) {
        track.offsetHeight;
        window.requestAnimationFrame(function () {
          track.classList.remove('is-jump');
        });
      }
    }

    function moveTo(nextIndex) {
      if (isAnimating || nextIndex === index) {
        return;
      }
      index = nextIndex;
      setPosition(false);
    }

    function jumpIfNeeded(event) {
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
      if (reduceMotion) {
        return;
      }
      stop();
      timer = window.setInterval(function () {
        if (!paused && !isAnimating) {
          moveTo(index + 1);
        }
      }, delay);
    }

    function stop() {
      if (timer) {
        window.clearInterval(timer);
        timer = null;
      }
    }

    prev.addEventListener('click', function () {
      moveTo(index - 1);
      start();
    });
    next.addEventListener('click', function () {
      moveTo(index + 1);
      start();
    });
    dots.forEach(function (dot, dotIndex) {
      dot.addEventListener('click', function () {
        moveTo(dotIndex + 1);
        start();
      });
    });
    track.addEventListener('transitionend', jumpIfNeeded);
    root.addEventListener('mouseenter', function () {
      paused = true;
    });
    root.addEventListener('mouseleave', function () {
      paused = false;
    });
    root.addEventListener('focusin', function () {
      paused = true;
    });
    root.addEventListener('focusout', function () {
      paused = false;
    });
    window.addEventListener('resize', function () {
      setPosition(true);
    });

    setPosition(true);
    start();
  }

  function renderHeroSlides(root) {
    var track = root.querySelector('[data-hero-track]') || root.querySelector('.slider-track');
    var dots = root.querySelector('[data-hero-dots]') || root.querySelector('.slider-dots');
    var slides = (siteData.heroSlides || []).filter(function (item) {
      return item && item.active !== false;
    });

    if (!track || !slides.length) {
      return;
    }

    track.textContent = '';
    if (dots) {
      dots.textContent = '';
    }

    slides.forEach(function (item, index) {
      track.appendChild(createHeroSlide(item, index));
      if (dots) {
        dots.appendChild(createHeroDot(item, index));
      }
    });
  }

  function createHeroSlide(item, index) {
    var article = document.createElement('article');
    var link = document.createElement('a');
    var img = document.createElement('img');
    var caption = document.createElement('div');
    var eyebrow = document.createElement('p');
    var title = document.createElement('h2');

    article.className = 'slide' + (index === 0 ? ' is-active' : '');
    article.style.setProperty('--hero-object-position', item.objectPosition || 'center center');
    article.setAttribute('aria-hidden', String(index !== 0));

    link.className = 'slide-link';
    link.href = item.href || '#';
    link.setAttribute('aria-label', item.title || '查看轮播详情');

    img.src = item.image;
    img.alt = item.alt || item.title || '';
    img.decoding = 'async';
    if (index === 0) {
      img.loading = 'eager';
      img.setAttribute('fetchpriority', 'high');
    } else {
      img.loading = 'lazy';
    }

    caption.className = 'slide-caption';
    eyebrow.textContent = item.subtitle || '学院主轮播';
    title.textContent = item.title || '';

    caption.appendChild(eyebrow);
    caption.appendChild(title);
    link.appendChild(img);
    link.appendChild(caption);
    article.appendChild(link);

    return article;
  }

  function createHeroDot(item, index) {
    var dot = document.createElement('button');
    dot.className = 'dot' + (index === 0 ? ' is-active' : '');
    dot.type = 'button';
    dot.setAttribute('aria-label', '切换到第 ' + (index + 1) + ' 张：' + (item.title || '轮播图'));
    dot.setAttribute('aria-pressed', String(index === 0));
    return dot;
  }

  function setupClones(track, sourceSlides) {
    var firstClone = sourceSlides[0].cloneNode(true);
    var lastClone = sourceSlides[sourceSlides.length - 1].cloneNode(true);
    firstClone.setAttribute('data-clone', 'true');
    lastClone.setAttribute('data-clone', 'true');
    firstClone.querySelectorAll('a, button').forEach(function (control) {
      control.tabIndex = -1;
    });
    lastClone.querySelectorAll('a, button').forEach(function (control) {
      control.tabIndex = -1;
    });
    track.insertBefore(lastClone, sourceSlides[0]);
    track.appendChild(firstClone);
  }

  function preloadSliderImages(root) {
    root.querySelectorAll('.slide img').forEach(function (img) {
      var image = new Image();
      image.src = img.currentSrc || img.src;
    });
  }

  /* ===== News rendering and active state ===== */
  function renderNewsSection() {
    var feature = document.querySelector('[data-news-feature]');
    var list = document.querySelector('[data-news-list]');
    var news = siteData.news || [];
    if (!feature || !list || !news.length) {
      return;
    }

    renderFeaturedNews(feature, news[0]);
    list.textContent = '';
    news.slice(0, NEWS_LIST_VISIBLE_COUNT).forEach(function (item, offset) {
      list.appendChild(createNewsListItem(item, offset));
    });
  }

  function renderFeaturedNews(container, item) {
    if (!item) {
      return;
    }
    var link = document.createElement('a');
    var imageWrap = document.createElement('div');
    var img = document.createElement('img');
    var body = document.createElement('div');
    var copy = document.createElement('div');
    var title = document.createElement('h3');
    var summary = document.createElement('p');

    container.textContent = '';
    container.classList.add('is-active');
    link.href = item.href || '#';
    imageWrap.className = 'news-image';
    img.src = item.image || '';
    img.alt = item.title || '';
    img.loading = 'lazy';
    img.decoding = 'async';
    body.className = 'news-feature-body';
    copy.className = 'news-copy';
    title.textContent = item.title || '';
    if ((item.title || '').length > 32) {
      title.classList.add('is-long-title');
    }
    summary.textContent = item.summary || '';

    imageWrap.appendChild(img);
    copy.appendChild(title);
    copy.appendChild(summary);
    body.appendChild(createDateBlock('div', item.date, 'date-badge'));
    body.appendChild(copy);
    link.appendChild(imageWrap);
    link.appendChild(body);
    container.appendChild(link);
  }

  function createNewsListItem(item, realIndex) {
    var article = document.createElement('article');
    var link = document.createElement('a');
    var diamond = createTextElement('span', 'diamond', '');
    diamond.setAttribute('aria-hidden', 'true');
    article.className = 'news-list-item';
    article.setAttribute('data-news-index', String(realIndex));
    link.href = item.href || '#';
    link.appendChild(diamond);
    link.appendChild(createTextElement('span', 'news-title', item.title || ''));
    link.appendChild(createDateBlock('time', item.date, 'news-list-date'));
    article.appendChild(link);
    return article;
  }

  function initNewsActiveState() {
    var newsSection = document.querySelector('[data-news-section]');
    var newsFeature = document.querySelector('[data-news-feature]');
    var newsList = document.querySelector('[data-news-list]');
    var listItems = newsList ? Array.from(newsList.querySelectorAll('.news-list-item')) : [];
    var newsData = siteData.news || [];

    if (!newsSection || !newsList || !listItems.length || !newsFeature || !newsData.length) {
      return;
    }

    function setActive(item) {
      var realIndex = Number(item.getAttribute('data-news-index')) || 0;
      listItems.forEach(function (node) {
        node.classList.toggle('is-active', node === item);
      });
      renderFeaturedNews(newsFeature, newsData[realIndex] || newsData[0]);
    }

    listItems.forEach(function (item) {
      var activate = function (event) {
        if (event.type === 'click') {
          event.preventDefault();
        }
        setActive(item);
      };
      item.addEventListener('mouseenter', activate);
      item.addEventListener('focusin', activate);
      item.addEventListener('click', activate);
    });

    setActive(listItems[0]);
  }

  /* ===== Notice rendering and active state ===== */
  function renderNotices() {
    var grid = document.querySelector('[data-notice-grid]');
    var notices = siteData.notices || [];
    if (!grid || !notices.length) {
      return;
    }
    grid.textContent = '';
    getRenderedNotices(notices).forEach(function (item) {
      grid.appendChild(createNoticeCard(item));
    });
  }

  function getRenderedNotices(notices) {
    var pinEnabled = siteData.noticePinEnabled !== false;
    return notices.map(function (item, index) {
      var notice = Object.assign({}, item);
      notice.pinVisible = pinEnabled && item && item.pinned === true;
      notice.originalIndex = index;
      return notice;
    }).sort(function (a, b) {
      if (a.pinVisible !== b.pinVisible) {
        return a.pinVisible ? -1 : 1;
      }
      return a.originalIndex - b.originalIndex;
    });
  }

  function createNoticeCard(item) {
    var article = document.createElement('article');
    var link = document.createElement('a');
    var titleWrap = document.createElement('span');
    var title = createTextElement('span', 'notice-title', item.title || '');

    article.className = 'notice-card card';
    article.classList.toggle('is-pinned', Boolean(item.pinVisible));
    link.href = item.href || '#';
    titleWrap.className = 'notice-title-wrap';
    if (item.pinVisible) {
      titleWrap.appendChild(createTextElement('span', 'notice-pin', '置顶'));
    }
    titleWrap.appendChild(title);
    link.appendChild(createDateBlock('span', item.date, 'notice-date'));
    link.appendChild(titleWrap);
    article.appendChild(link);
    return article;
  }

  function initNoticeActiveState() {
    var grid = document.querySelector('[data-notice-grid]');
    var cards = grid ? Array.from(grid.querySelectorAll('.notice-card')) : [];
    if (!grid || !cards.length) {
      return;
    }

    function setActive(index) {
      cards.forEach(function (card, cardIndex) {
        card.classList.toggle('is-active', cardIndex === index);
      });
    }

    function clearActive() {
      cards.forEach(function (card) {
        card.classList.remove('is-active');
      });
    }

    cards.forEach(function (card, index) {
      var activate = function () {
        setActive(index);
      };
      card.addEventListener('mouseenter', activate);
      card.addEventListener('focusin', activate);
      card.addEventListener('click', function (event) {
        event.preventDefault();
        activate();
      });
    });

    grid.addEventListener('mouseleave', clearActive);
    grid.addEventListener('focusout', function (event) {
      if (!grid.contains(event.relatedTarget)) {
        clearActive();
      }
    });
  }

  /* ===== Quick Links ===== */
  function initQuickLinks() {
    var container = document.querySelector('[data-quicklinks-list]');
    var links = siteData.quickLinks || [];
    if (!container || !links.length) {
      return;
    }

    container.textContent = '';
    links.forEach(function (item) {
      container.appendChild(createQuickLink(item));
    });
  }

  function createQuickLink(item) {
    var link = document.createElement('a');
    var icon = document.createElement('span');
    var text = document.createElement('span');
    var name = document.createElement('span');

    link.href = item.href || '#';
    link.setAttribute('aria-label', item.name || item.title || '快速链接');
    icon.className = 'quicklink-icon';
    icon.setAttribute('aria-hidden', 'true');
    icon.innerHTML = getQuickLinkIcon(item.icon);

    text.className = 'quicklink-text';
    name.className = 'quicklink-name';
    name.textContent = item.name || item.title || '';

    text.appendChild(name);
    link.appendChild(icon);
    link.appendChild(text);
    return link;
  }

  function getQuickLinkIcon(type) {
    var icons = {
      portal: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5v9A2.5 2.5 0 0 1 17.5 17h-11A2.5 2.5 0 0 1 4 14.5v-9Z"></path><path d="M8 21h8M12 17v4M8 8h3M8 12h8M14 8h2"></path></svg>',
      academic: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 8.5 12 4l9 4.5-9 4.5-9-4.5Z"></path><path d="M7 11v4.5c0 1.4 2.2 2.5 5 2.5s5-1.1 5-2.5V11"></path><path d="M21 9v5"></path></svg>',
      search: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.5" cy="10.5" r="5.5"></circle><path d="M15 15l4.5 4.5M6.5 10.5h8"></path></svg>',
      lab: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 3h6M10 3v5.2l-4.7 8.1A3 3 0 0 0 7.9 21h8.2a3 3 0 0 0 2.6-4.7L14 8.2V3"></path><path d="M8 15h8M9.2 18h5.6"></path></svg>'
    };
    return icons[type] || icons.portal;
  }

  function createLink(item, className) {
    var link = document.createElement('a');
    link.href = item.href || '#';
    link.textContent = item.name || item.title || '';
    if (className) {
      link.className = className;
    }
    return link;
  }

  /* ===== Init ===== */
  renderNewsSection();
  renderNotices();
  initSlider();
  initNewsActiveState();
  initNoticeActiveState();
  initQuickLinks();
})();
