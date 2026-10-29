(() => {
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
      const imageMarkup = image ? `<img class="card-image" src="${esc(image.href)}" alt="" loading="lazy" referrerpolicy="no-referrer" onerror="this.remove()">` : '';
      return `<a class="card" href="${esc(url.href)}" target="_blank" rel="noopener noreferrer" aria-label="Open ${esc(item.title)} in a new tab"><div class="card-art${image ? ' has-image' : ''}" style="--art:${esc(item.color || '#30394b')};--glow:${esc(item.glow || 'rgba(255,255,255,.3)')}">${imageMarkup}<span class="art-index">${String(index + 1).padStart(2, '0')} / ${String(filtered.length).padStart(2, '0')}</span><span class="art-glyph" aria-hidden="true">${esc(item.glyph || '✳')}</span></div><div class="card-content"><div class="card-top"><span class="domain">${esc(domainOf(url.href))}</span><span class="external" aria-hidden="true">↗</span></div><h3>${esc(item.title)}</h3><p>${esc(item.description)}</p><div class="tags">${tags}</div></div></a>`;
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
