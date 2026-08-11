(function(){
  const STORAGE_KEY = 'emoji-tcg-save-v1';

  function makeEmojiWallpaperDataUrl(emoji) {
    const size = 200;
    const svg = `<?xml version="1.0" encoding="UTF-8"?><svg xmlns='http://www.w3.org/2000/svg' width='${size}' height='${size}' viewBox='0 0 ${size} ${size}'>` +
      `<rect width='100%' height='100%' fill='transparent'/>` +
      `<text x='50%' y='50%' font-size='64' dominant-baseline='middle' text-anchor='middle'>${emoji}</text>` +
      `</svg>`;
    return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
  }

  function applyBgFromValue(bg) {
    try {
      if (!bg) {
        document.body.style.backgroundImage = '';
        document.body.style.backgroundColor = '';
        return;
      }
      if (typeof bg === 'string' && bg.includes('.')) {
        const url = encodeURI(bg);
        document.body.style.backgroundImage = `url('${url}')`;
        document.body.style.backgroundRepeat = 'repeat';
        document.body.style.backgroundSize = '200px 200px';
        document.body.style.backgroundPosition = 'center center';
        return;
      }
      const url = makeEmojiWallpaperDataUrl(bg);
      document.body.style.backgroundImage = `url("${url}")`;
      document.body.style.backgroundRepeat = 'repeat';
      document.body.style.backgroundSize = '200px 200px';
      document.body.style.backgroundPosition = 'center center';
    } catch (e) {
      // noop
      console.warn('applySavedBackground failed', e);
    }
  }

  function applySavedBackground() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw);
      const bg = parsed?.currentBackground ?? null;
      applyBgFromValue(bg);
    } catch (e) {
      // ignore
    }
  }

  // Run on load
  applySavedBackground();

  // Listen for storage events from other tabs/windows
  window.addEventListener('storage', (ev) => {
    if (ev.key === STORAGE_KEY) {
      try {
        const newValue = ev.newValue ? JSON.parse(ev.newValue) : null;
        applyBgFromValue(newValue?.currentBackground ?? null);
      } catch (e) {}
    }
  });
})();
