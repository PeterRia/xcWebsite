/* study-note: utils.js
 * 作用：轻量通用工具命名空间。
 * 当前首页没有强依赖这些工具，但保留节流、防抖、日期格式化、模板替换，适合滚动、搜索、列表渲染等后续扩展。
 * 学习重点：工具函数保持纯粹，不读取 DOM，不依赖具体页面，这样才能真正复用。
 */
/**
 * Utils - 通用工具函数
 * 命名空间：Utils
 */

/* IIFE 返回一个只暴露必要方法的对象，避免把临时变量泄露到全局作用域。 */
const Utils = (function () {
  /**
   * 节流函数
   * @param {Function} fn - 要执行的函数
   * @param {number} wait - 等待时间（毫秒）
   */
  function throttle(fn, wait) {
    // lastTime 记录上一次真正执行 fn 的时间，用时间差控制执行频率。
    let lastTime = 0;
    return function (...args) {
      const now = Date.now();
      if (now - lastTime >= wait) {
        lastTime = now;
        fn.apply(this, args);
      }
    };
  }

  /**
   * 防抖函数
   * @param {Function} fn - 要执行的函数
   * @param {number} wait - 等待时间（毫秒）
   */
  function debounce(fn, wait) {
    // timer 保存待执行任务；新事件到来时清掉旧任务，只保留最后一次。
    let timer = null;
    return function (...args) {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => fn.apply(this, args), wait);
    };
  }

  /**
   * 格式化日期
   * @param {string|Date} date
   * @param {string} format - 如 'YYYY-MM-DD'
   */
  function formatDate(date, format = "YYYY-MM-DD") {
    // 这里用简单 token 替换满足静态页需求；复杂国际化场景应改用成熟日期库。
    const d = new Date(date);
    const pad = (n) => String(n).padStart(2, "0");
    return format
      .replace("YYYY", d.getFullYear())
      .replace("MM", pad(d.getMonth() + 1))
      .replace("DD", pad(d.getDate()));
  }

  /**
   * 简易模板替换
   * @param {string} template - 含 {{key}} 的字符串
   * @param {Object} data
   */
  function renderTemplate(template, data) {
    // 只支持 {{key}} 这种浅层字段，适合静态列表模板，不处理表达式以保持简单。
    return template.replace(/\{\{(\w+)\}\}/g, (_, key) => data[key] ?? "");
  }

  return {
    throttle,
    debounce,
    formatDate,
    renderTemplate,
  };
})();
