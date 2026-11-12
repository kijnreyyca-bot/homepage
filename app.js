(() => {
  const root = document.documentElement;

  /* ---------------- Theme switcher ---------------- */
  // The theme background lives in CSS (--bg) per theme, so read it instead of
  // keeping a duplicate colour table in JS.
  const THEMES = ['void', 'dark', 'white', 'blue'];
  const THEME_LABELS = { void: 'The Void', dark: 'Dark', white: 'White', blue: 'Dark Blue' };
  const themeBtn = document.querySelector('#theme-btn');
  const themeMenu = document.querySelector('#theme-menu');
  const themeMeta = document.querySelector('#theme-color');
  const themeOpts = themeMenu ? Array.from(themeMenu.querySelectorAll('.theme-opt')) : [];

  function themeColor() {
    const bg = getComputedStyle(root).getPropertyValue('--bg').trim();
    return bg || '#1a1a1d';
  }

  function applyTheme(name, save) {
    if (!THEMES.includes(name)) name = 'dark';
    root.dataset.theme = name;
    if (themeMeta) themeMeta.setAttribute('content', themeColor());
    themeOpts.forEach(opt => {
      const active = opt.dataset.t === name;
      opt.setAttribute('aria-checked', String(active));
      opt.setAttribute('tabindex', active ? '0' : '-1');
    });
    if (themeBtn) themeBtn.setAttribute('aria-label', `Theme: ${THEME_LABELS[name]}`);
    if (save) { try { localStorage.setItem('theme', name); } catch {} }
  }

  function toggleThemeMenu(open) {
    if (!themeBtn || !themeMenu) return;
    themeMenu.hidden = !open;
    themeBtn.setAttribute('aria-expanded', String(open));
  }

  function focusOption(index) {
    const opt = themeOpts[index];
    if (!opt) return;
    themeOpts.forEach((item, i) => item.setAttribute('tabindex', i === index ? '0' : '-1'));
    opt.focus();
  }

  function openThemeMenu() {
    if (!themeBtn || !themeMenu) return;
    toggleThemeMenu(true);
    const checked = themeOpts.findIndex(opt => opt.dataset.t === root.dataset.theme);
    focusOption(checked < 0 ? 0 : checked);
  }

  applyTheme(root.dataset.theme, false);

  if (themeBtn && themeMenu) {
    themeBtn.addEventListener('click', event => {
      event.stopPropagation();
      if (themeMenu.hidden) openThemeMenu();
      else toggleThemeMenu(false);
    });
    themeOpts.forEach(opt => {
      opt.addEventListener('click', () => {
        applyTheme(opt.dataset.t, true);
        toggleThemeMenu(false);
        themeBtn.focus();
      });
    });
    themeMenu.addEventListener('keydown', event => {
      const current = themeOpts.indexOf(document.activeElement);
      if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
        event.preventDefault();
        focusOption((current + 1) % themeOpts.length);
      } else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
        event.preventDefault();
        focusOption((current - 1 + themeOpts.length) % themeOpts.length);
      } else if (event.key === 'Home') {
        event.preventDefault();
        focusOption(0);
      } else if (event.key === 'End') {
        event.preventDefault();
        focusOption(themeOpts.length - 1);
      } else if (event.key === 'Tab') {
        toggleThemeMenu(false);
      }
    });
    document.addEventListener('click', event => {
      if (!themeMenu.hidden && !themeMenu.contains(event.target) && !themeBtn.contains(event.target)) toggleThemeMenu(false);
    });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && !themeMenu.hidden) {
        toggleThemeMenu(false);
        themeBtn.focus();
      }
    });
  }

  /* ---------------- Density switcher ---------------- */
  const densityBtns = Array.from(document.querySelectorAll('.density button'));

  function applyDensity(mode, save) {
    if (mode !== 'comfy') mode = 'compact';
    root.dataset.density = mode;
    densityBtns.forEach(btn => btn.setAttribute('aria-checked', String(btn.dataset.d === mode)));
    if (save) { try { localStorage.setItem('density', mode); } catch {} }
  }

  applyDensity(root.dataset.density, false);
  densityBtns.forEach(btn => btn.addEventListener('click', () => applyDensity(btn.dataset.d, true)));

  // Live-sync when another tab or site on this origin changes theme or density.
  window.addEventListener('storage', event => {
    if (event.key === 'theme') applyTheme(event.newValue, false);
    if (event.key === 'density') applyDensity(event.newValue, false);
  });

  /* ---------------- Link collection ---------------- */
  const items = Array.isArray(window.LINKS) ? window.LINKS : [];
  const grid = document.querySelector('#card-grid');
  const tabsEl = document.querySelector('#tabs');
  const searchEl = document.querySelector('#search');
  const emptyEl = document.querySelector('#empty-state');
  const categories = ['All', ...new Set(items.map(item => item.category).filter(Boolean))];
  let activeCategory = 'All';
  const safeURL = value => { try { const u = new URL(value, window.location.href); return ['http:', 'https:'].includes(u.protocol) ? u : null; } catch { return null; } };
  const domainOf = url => { try { return new URL(url).hostname.replace(/^www\./, ''); } catch { return url; } };
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  document.querySelector('#link-count').textContent = String(items.length).padStart(2, '0');
  document.querySelector('#category-count').textContent = String(categories.length - 1).padStart(2, '0');
  document.querySelector('.footer-year').textContent = `© ${new Date().getFullYear()}`;

  function drawTabs() {
    tabsEl.innerHTML = categories.map(category => {
      const count = category === 'All' ? items.length : items.filter(item => item.category === category).length;
      return `<button class="tab${activeCategory === category ? ' active' : ''}" type="button" data-category="${esc(category)}" aria-pressed="${activeCategory === category}">${esc(category)}<span class="tab-count">${count}</span></button>`;
    }).join('');
  }

  function render() {
    const query = searchEl.value.trim().toLowerCase();
    const filtered = items.filter(item => {
      const url = safeURL(item.url);
      if (!url) return false;
      const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
      const haystack = [item.title, item.description, item.category, item.url, ...(item.tags || [])].join(' ').toLowerCase();
      return matchesCategory && haystack.includes(query);
    });
    grid.innerHTML = filtered.map((item, index) => {
      const url = safeURL(item.url);
      const image = item.image ? safeURL(item.image) : null;
      const tags = (Array.isArray(item.tags) ? item.tags : []).slice(0, 4).map(tag => `<span class="tag">${esc(tag)}</span>`).join('');
      const loading = index === 0 ? 'loading="eager" fetchpriority="high"' : index < 4 ? 'loading="eager"' : 'loading="lazy"';
      const imageMarkup = image ? `<img class="card-image" src="${esc(image.href)}" alt="" ${loading} decoding="async" referrerpolicy="no-referrer" onerror="this.remove()">` : '';
      return `<article class="card"><div class="card-art${image ? ' has-image' : ''}" style="--art:${esc(item.color || '#30394b')};--glow:${esc(item.glow || 'rgba(255,255,255,.3)')}">${imageMarkup}<span class="art-index" aria-hidden="true">${String(index + 1).padStart(2, '0')} / ${String(filtered.length).padStart(2, '0')}</span><span class="art-glyph" aria-hidden="true">${esc(item.glyph || '✳')}</span></div><div class="card-content"><div class="card-top"><span class="domain" aria-hidden="true">${esc(domainOf(url.href))}</span><span class="external" aria-hidden="true">↗</span></div><h3>${esc(item.title)}</h3><p>${esc(item.description)}</p><div class="tags" aria-hidden="true">${tags}</div></div><a class="card-link" href="${esc(url.href)}" target="_blank" rel="noopener noreferrer"><span class="sr-only">Open ${esc(item.title)} in a new tab</span></a></article>`;
    }).join('');
    emptyEl.hidden = filtered.length > 0;
    document.querySelector('#result-count').textContent = `${String(filtered.length).padStart(2, '0')} ${filtered.length === 1 ? 'LINK' : 'LINKS'}`;
    document.querySelector('#active-label').textContent = `${activeCategory === 'All' ? 'EVERYTHING, IN ONE PLACE' : activeCategory.toUpperCase()}`;
  }

  tabsEl.addEventListener('click', event => {
    const button = event.target.closest('[data-category]');
    if (!button) return;
    activeCategory = button.dataset.category;
    drawTabs(); render();
  });
  searchEl.addEventListener('input', render);
  document.addEventListener('keydown', event => {
    if (event.key === '/' && !['INPUT','TEXTAREA'].includes(document.activeElement.tagName)) { event.preventDefault(); searchEl.focus(); }
    if (event.key === 'Escape' && document.activeElement === searchEl) { searchEl.value = ''; searchEl.blur(); render(); }
  });
  drawTabs(); render();
})();
