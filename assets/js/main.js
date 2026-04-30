/* study-note: main.js
 * 作用：全站公共入口，负责页头、导航、移动抽屉、搜索浮层、返回顶部、图片降级。
 * 加载顺序：data.js -> utils.js -> main.js -> pages/home.js。
 * 学习重点：本文件只处理跨页面通用交互，不写首页新闻/轮播等私有逻辑，职责边界清楚。
 */
/**
 * Main - 全局入口
 * 处理：导航渲染、下拉菜单、移动端菜单、搜索、返回顶部
 * 命名空间：App
 */

/* App 命名空间用 IIFE 包住内部函数，最终只暴露 init，减少全局变量污染。 */
const App = (function () {
  var siteData = window.siteData || {};

  function init() {
    // 初始化顺序按“先渲染 DOM，再绑定交互”排列，避免事件绑定时目标节点还不存在。
    renderTopLinks();
    renderDesktopNav();
    renderMobileNav();
    initNavDropdowns();
    initDrawer();
    initSearchPopover();
    initBackToTop();
    initImageFallbacks();
  }

  /* ===== Create Link Helper ===== */
  function createLink(item, className) {
    // 统一创建链接节点，避免桌面导航、移动导航、快捷链接重复写 DOM 创建代码。
    var link = document.createElement("a");
    link.href = item.href || "#";
    link.textContent = item.name || item.title || "";
    if (className) {
      link.className = className;
    }
    return link;
  }

  /* ===== Render Top Links ===== */
  function renderTopLinks() {
    // 顶部链接同时服务桌面端和移动抽屉；站内搜索被放到最后，保持视觉和交互一致。
    var desktop = document.querySelector("[data-topbar-links-list]");
    var mobile = document.querySelector("[data-mobile-utility-links]");
    var links = siteData.topLinks || [];
    if (!desktop || !mobile || !links.length) {
      return;
    }

    desktop.textContent = "";
    mobile.textContent = "";
    var searchItem = null;
    links.forEach(function (item) {
      if (item && item.name === "站内搜索") {
        searchItem = item;
        return;
      }
      desktop.appendChild(createLink(item));
      mobile.appendChild(createLink(item));
    });
    if (searchItem) {
      desktop.appendChild(createLink(searchItem));
      mobile.appendChild(createLink(searchItem));
    }
  }

  /* ===== Render Desktop Navigation ===== */
  function renderDesktopNav() {
    // 桌面导航从 siteData.nav 生成，children 决定是否追加下拉菜单。
    var list = document.querySelector("[data-nav-list]");
    var navItems = siteData.nav || [];
    if (!list || !navItems.length) {
      return;
    }

    list.textContent = "";
    navItems.forEach(function (item, index) {
      var li = document.createElement("li");
      var hasChildren = Array.isArray(item.children) && item.children.length;
      li.className = "nav-item" + (hasChildren ? " has-menu" : "");

      var link = createLink(item);
      if (index === 0) {
        link.setAttribute("aria-current", "page");
      }
      if (hasChildren) {
        link.setAttribute("aria-expanded", "false");
      }
      li.appendChild(link);

      if (hasChildren) {
        li.appendChild(createMegaMenu(item));
      }
      list.appendChild(li);
    });
  }

  /* ===== Create Mega Menu ===== */
  function createMegaMenu(item) {
    // 每个一级导航项拥有自己的下拉容器，CSS 通过 hover/focus/is-open 控制显示。
    var menu = document.createElement("div");
    var panel = document.createElement("div");
    var column = document.createElement("div");

    menu.className = "mega-menu";
    menu.setAttribute("aria-label", item.name + "子菜单");
    panel.className = "mega-panel";
    column.className = "mega-column";

    item.children.forEach(function (child) {
      column.appendChild(createLink({ name: child, href: "#" }));
    });

    panel.appendChild(column);
    menu.appendChild(panel);

    return menu;
  }

  /* ===== Render Mobile Navigation ===== */
  function renderMobileNav() {
    // 移动端使用 details/summary 原生折叠语义，键盘和读屏支持更自然。
    var nav = document.querySelector("[data-mobile-nav]");
    var navItems = siteData.nav || [];
    if (!nav || !navItems.length) {
      return;
    }

    nav.textContent = "";
    navItems.forEach(function (item) {
      var hasChildren = Array.isArray(item.children) && item.children.length;
      if (!hasChildren) {
        nav.appendChild(createLink(item, "mobile-nav-link"));
        return;
      }
      nav.appendChild(createMobileDetails(item));
    });
  }

  function createMobileDetails(item) {
    // 有 children 的导航项渲染为一个可展开的 details；没有 children 的项直接渲染为链接。
    var details = document.createElement("details");
    var summary = document.createElement("summary");
    var submenu = document.createElement("div");

    summary.textContent = item.name;
    submenu.className = "mobile-submenu";
    item.children.forEach(function (child) {
      submenu.appendChild(createLink({ name: child, href: "#" }));
    });
    details.appendChild(summary);
    details.appendChild(submenu);
    return details;
  }

  /* ===== Navigation Dropdowns ===== */
  function initNavDropdowns() {
    // 桌面端靠 hover/focus 打开；触屏设备拦截点击并切换 is-open。
    var items = document.querySelectorAll(".nav-item.has-menu");
    if (!items.length) {
      return;
    }

    var isTouchLike = window.matchMedia("(max-width: 767px)").matches;

    items.forEach(function (item) {
      var link = item.firstElementChild;
      if (!link) {
        return;
      }

      link.addEventListener("click", function (event) {
        if (isTouchLike || window.matchMedia("(hover: none)").matches) {
          event.preventDefault();
          var open = item.classList.contains("is-open");
          items.forEach(function (otherItem) {
            otherItem.classList.remove("is-open");
            var otherLink = otherItem.firstElementChild;
            if (otherLink) {
              otherLink.setAttribute("aria-expanded", "false");
            }
          });
          item.classList.toggle("is-open", !open);
          link.setAttribute("aria-expanded", String(!open));
        }
      });

      item.addEventListener("mouseenter", function () {
        if (window.matchMedia("(hover: hover)").matches && !isTouchLike) {
          item.classList.add("is-open");
          link.setAttribute("aria-expanded", "true");
        }
      });

      item.addEventListener("mouseleave", function () {
        if (window.matchMedia("(hover: hover)").matches && !isTouchLike) {
          item.classList.remove("is-open");
          link.setAttribute("aria-expanded", "false");
        }
      });
    });

    document.addEventListener("click", function (event) {
      if (event.target.closest(".main-nav")) {
        return;
      }
      items.forEach(function (item) {
        item.classList.remove("is-open");
        var link = item.firstElementChild;
        if (link) {
          link.setAttribute("aria-expanded", "false");
        }
      });
    });
  }

  /* ===== Mobile Drawer ===== */
  function initDrawer() {
    // 移动抽屉通过 is-open、aria-hidden、body.menu-open 三个状态同步控制视觉、语义和滚动锁定。
    var drawer = document.getElementById("mobileDrawer");
    var openButton = document.querySelector(".nav-toggle");
    if (!drawer || !openButton) {
      return;
    }

    var closeButtons = drawer.querySelectorAll("[data-drawer-close]");

    function openDrawer() {
      // 打开时同时更新 aria-expanded，保证辅助技术知道按钮当前控制的面板已展开。
      drawer.classList.add("is-open");
      drawer.setAttribute("aria-hidden", "false");
      openButton.setAttribute("aria-expanded", "true");
      document.body.classList.add("menu-open");
    }

    function closeDrawer() {
      // 关闭时撤销所有打开状态，确保页面恢复可滚动。
      drawer.classList.remove("is-open");
      drawer.setAttribute("aria-hidden", "true");
      openButton.setAttribute("aria-expanded", "false");
      document.body.classList.remove("menu-open");
    }

    openButton.addEventListener("click", function () {
      if (drawer.classList.contains("is-open")) {
        closeDrawer();
      } else {
        openDrawer();
      }
    });

    closeButtons.forEach(function (button) {
      button.addEventListener("click", closeDrawer);
    });

    drawer.querySelectorAll("details").forEach(function (details) {
      details.addEventListener("toggle", function () {
        if (details.open) {
          drawer.querySelectorAll("details").forEach(function (other) {
            if (other !== details) {
              other.removeAttribute("open");
            }
          });
        }
      });
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && drawer.classList.contains("is-open")) {
        closeDrawer();
      }
    });
  }

  /* ===== Search Popover ===== */
  function initSearchPopover() {
    // 搜索浮层使用 hidden 属性控制显示，点击外部或按 Escape 都会关闭。
    var trigger = document.querySelector(".top-search-toggle");
    var popover = document.getElementById("siteSearchPopover");
    var input = popover ? popover.querySelector('input[type="search"]') : null;
    if (!trigger || !popover) {
      return;
    }

    function setOpen(isOpen) {
      // hidden 是实际显示开关；aria-expanded 是给辅助技术的状态说明。
      popover.hidden = !isOpen;
      trigger.setAttribute("aria-expanded", String(isOpen));
      if (isOpen && input) {
        window.setTimeout(function () {
          input.focus();
        }, 0);
      }
    }

    trigger.addEventListener("click", function () {
      setOpen(popover.hidden);
    });

    document.addEventListener("click", function (event) {
      if (popover.hidden) {
        return;
      }
      if (popover.contains(event.target) || trigger.contains(event.target)) {
        return;
      }
      setOpen(false);
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    });
  }

  /* ===== Back to Top ===== */
  function initBackToTop() {
    // 返回顶部按钮只在页面向下滚动一定距离后出现，避免首屏干扰。
    var button = document.querySelector(".back-to-top");
    if (!button) {
      return;
    }

    function toggleButton() {
      // 480px 是经验阈值：超过大半屏后用户才真正需要“回到顶部”。
      if (window.scrollY > 480) {
        button.classList.add("is-visible");
      } else {
        button.classList.remove("is-visible");
      }
    }

    window.addEventListener("scroll", toggleButton, { passive: true });
    toggleButton();

    button.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ===== Image Fallbacks ===== */
  function initImageFallbacks() {
    // 静态学习目录可能缺少远程资源；图片加载失败时隐藏 broken image 图标，避免破坏版面。
    document.querySelectorAll("img").forEach(function (img) {
      img.addEventListener("error", function () {
        img.style.display = "none";
      });
    });
  }

  /* 自动初始化 */
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  return { init };
})();
