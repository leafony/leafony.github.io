/* Clarity is optional. GA4 is managed separately in astro.config.mjs. */
(() => {
  if (window.leafonyClaritySettings) return;
  const key = 'leafony-docs-clarity-consent-v1';
  const panel = document.querySelector('[data-clarity-panel]');
  const status = document.querySelector('[data-clarity-status]');
  if (!panel || !status) return;
  const english = document.documentElement.lang.startsWith('en');
  const restricted = () => navigator.globalPrivacyControl === true ||
    navigator.doNotTrack === '1' || window.doNotTrack === '1';
  const readChoice = () => {
    if (new URL(location.href).searchParams.get('clarity') === 'off') return 'denied';
    try { return localStorage.getItem(key); } catch { return null; }
  };
  let choice = readChoice();
  let active = false;
  let inserted = false;
  let stopped = false;
  let script;
  const safeUrl = (value, referrer = false) => {
    try {
      const url = new URL(value, location.href);
      if (!['http:', 'https:'].includes(url.protocol) || url.search) return false;
      if (referrer) return !url.hash && !/%40|@/i.test(url.pathname);
      if (url.origin !== 'https://docs.leafony.com' || /\/(contacts|privacy)(\/|$)/.test(url.pathname)) return false;
      return !url.hash || Boolean(document.getElementById(decodeURIComponent(url.hash.slice(1))));
    } catch { return false; }
  };
  function stop() {
    stopped = true;
    if (!active) return;
    // Protective stops must not revoke consent: consentv2 can schedule an SDK restart.
    window.clarity('stop');
    script?.remove();
    active = false;
  }
  function revoke(fallback = false) {
    if (!inserted) return;
    window.clarity('consentv2', { analytics_Storage: 'denied', ad_Storage: 'denied' });
    stop();
    // Clarity may schedule a restart after denial; unload this document entirely.
    if (fallback) {
      const target = new URL(location.href);
      target.searchParams.set('clarity', 'off');
      location.replace(target.href);
    } else location.reload();
  }
  function start() {
    if (!document.querySelector('link[rel="canonical"]')) return;
    if (active || stopped || choice !== 'granted' || restricted() || !safeUrl(location.href) ||
      (document.referrer && !safeUrl(document.referrer, true))) return;
    // Do not install a second tag or take ownership of another integration.
    if (window.clarity || document.querySelector('script[src*="clarity.ms/tag/"]')) return;
    document.documentElement.setAttribute('data-clarity-mask', 'true');
    window.clarity = function () { (window.clarity.q = window.clarity.q || []).push(arguments); };
    window.clarity('consentv2', { analytics_Storage: 'granted', ad_Storage: 'denied' });
    script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.clarity.ms/tag/yhfkgd4isf';
    active = true;
    inserted = true;
    document.head.appendChild(script);
  }
  function update() {
    status.textContent = restricted()
      ? (english ? 'Clarity is off because of your browser privacy preference.' : 'ブラウザーのプライバシー設定によりClarityは停止中です。')
      : choice === 'granted'
        ? (english ? 'Clarity: allowed on eligible pages.' : 'Clarity：対象ページで許可しています。')
        : (english ? 'Clarity: not allowed.' : 'Clarity：許可していません。');
    panel.querySelector('[data-clarity-choice="granted"]').disabled = restricted();
  }
  window.leafonyClaritySettings = () => { panel.hidden = false; update(); };
  document.querySelectorAll('[data-clarity-settings]').forEach(button => {
    button.hidden = false;
    button.addEventListener('click', () => { window.leafonyClaritySettings(); panel.querySelector('button').focus(); });
  });
  panel.querySelectorAll('[data-clarity-choice]').forEach(button => {
    button.addEventListener('click', () => {
      choice = button.dataset.clarityChoice;
      let fallback = false;
      try { localStorage.setItem(key, choice); } catch {
        if (choice === 'denied') {
          try { localStorage.removeItem(key); } catch { /* Keep the current page unrecorded. */ }
          fallback = readChoice() === 'granted';
        }
      }
      panel.hidden = true;
      if (choice === 'granted') start(); else revoke(fallback);
      update();
    });
  });
  window.addEventListener('storage', event => {
    if (event.key !== key && event.key !== null) return;
    choice = readChoice();
    if (choice !== 'granted') revoke();
    update();
  });
  window.addEventListener('pageshow', () => {
    choice = readChoice();
    if (choice !== 'granted' || restricted()) revoke();
    update();
  });
  // Stop before free text, search, or an external/private navigation reaches Clarity.
  document.addEventListener('focusin', event => {
    if (event.target.closest?.('input, textarea, select, [contenteditable="true"]')) stop();
  }, true);
  document.addEventListener('click', event => {
    const link = event.target.closest?.('a[href]');
    if (link && !safeUrl(link.href)) stop();
  }, true);
  for (const method of ['pushState', 'replaceState']) {
    const original = history[method];
    history[method] = function (state, unused, url) {
      // Installed before the SDK: its outer wrapper checks active() after this returns.
      stop();
      if (inserted && url != null && !safeUrl(url)) {
        const next = new URL(url, location.href);
        if (next.origin === location.origin) {
          // Do not expose a private URL to a still-downloading SDK in this document.
          location[method === 'replaceState' ? 'replace' : 'assign'](next.href);
          return;
        }
      }
      return original.apply(this, arguments);
    };
  }
  window.addEventListener('popstate', stop, true);
  window.addEventListener('hashchange', () => { if (!safeUrl(location.href)) stop(); });
  panel.hidden = Boolean(choice) || restricted();
  update();
  start();
})();
