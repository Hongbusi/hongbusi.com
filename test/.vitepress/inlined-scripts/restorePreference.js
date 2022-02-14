;(() => {
  const restore = (key, cls, def = false) => {
    const saved = localStorage.getItem(key);
    if (saved ? saved !== 'false' : def) {
      document.documentElement.classList.add(cls);
    }
  }

  window.__VUE_BANNER_ID__ = 'wip';
  restore(`vue-docs-banner-${__VUE_BANNER_ID__}`, 'banner-dismissed');
})()
