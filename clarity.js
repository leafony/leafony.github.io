/* Requires project cookies OFF. GA4 is managed separately in astro.config.mjs. */
(() => {
  if (window.leafonyClaritySettings) return;
  const key = 'leafony-docs-clarity-consent-v1';
  const panel = document.querySelector('[data-clarity-panel]');
  const status = document.querySelector('[data-clarity-status]');
  if (!panel || !status) return;
  const english = document.documentElement.lang.startsWith('en');
  const restricted = () => navigator.globalPrivacyControl === true ||
    navigator.doNotTrack === '1' || window.doNotTrack === '1';
  let storageFailed = false;
  // Automatic measurement requires a working place to save a later refusal.
  const probeKey = `${key}.check`;
  try {
    localStorage.setItem(probeKey, '1');
    if (localStorage.getItem(probeKey) !== '1') throw new Error('Storage is not writable');
    localStorage.removeItem(probeKey);
  } catch { storageFailed = true; }
  let forcedDenied = false;
  const readChoice = () => {
    if (forcedDenied || new URL(location.href).searchParams.get('clarity') === 'off') return 'denied';
    try {
      const value = localStorage.getItem(key);
      return value === null || ['basic', 'granted', 'denied'].includes(value) ? value : 'unavailable';
    } catch { storageFailed = true; return 'unavailable'; }
  };
  let choice = readChoice();
  let active = false;
  let inserted = false;
  let stopped = false;
  let unloading = false;
  let script;
  const consent = () => ({ analytics_Storage: choice === 'granted' ? 'granted' : 'denied', ad_Storage: 'denied' });
  const safeUrl = (value, referrer = false) => {
    try {
      const url = new URL(value, location.href);
      if (!['http:', 'https:'].includes(url.protocol) || url.search) return false;
      if (referrer) return !url.hash && !/%40|@/i.test(url.pathname);
      if (url.origin !== 'https://docs.leafony.com' || /\/(contacts|privacy)(\/|$)/.test(decodeURIComponent(url.pathname))) return false;
      return !url.hash || Boolean(document.getElementById(decodeURIComponent(url.hash.slice(1))));
    } catch { return false; }
  };
  function clearCookies() {
    if (location.origin !== 'https://docs.leafony.com') return;
    // The SDK writes Path=/ on .leafony.com, with current-host fallback.
    for (const name of ['_clck', '_clsk']) {
      for (const domain of ['', '; Domain=docs.leafony.com', '; Domain=leafony.com']) {
        try { document.cookie = `${name}=; Max-Age=0; Path=/${domain}; SameSite=Lax; Secure`; }
        catch { /* A browser that blocks cookie access must not block the stop action. */ }
      }
    }
  }
  function stop() {
    stopped = true;
    if (!active) return;
    // Protective stops must not revoke consent: consentv2 can schedule an SDK restart.
    window.clarity('stop');
    script?.remove();
    active = false;
  }
  function revoke(fallback = false) {
    if (unloading) return;
    if (inserted) {
      window.clarity('consentv2', { analytics_Storage: 'denied', ad_Storage: 'denied' });
      stop();
    }
    clearCookies();
    // Denial may schedule an SDK restart. Failed saves must never reload into the automatic default.
    if (fallback) {
      unloading = true;
      const target = new URL(location.href);
      target.searchParams.set('clarity', 'off');
      location.replace(target.href);
    } else if (inserted) {
      unloading = true;
      location.reload();
    }
  }
  function start() {
    if (!document.querySelector('link[rel="canonical"]')) return;
    if (stopped || unloading || storageFailed || choice === 'denied' || choice === 'unavailable' || restricted() ||
      !safeUrl(location.href) || (document.referrer && !safeUrl(document.referrer, true))) return;
    // A later explicit cookie choice must update an already running cookieless SDK.
    if (active) { window.clarity('consentv2', consent()); return; }
    // Do not install a second tag or take ownership of another integration.
    if (window.clarity || document.querySelector('script[src*="clarity.ms/tag/"]')) return;
    document.documentElement.setAttribute('data-clarity-mask', 'true');
    window.clarity = function () { (window.clarity.q = window.clarity.q || []).push(arguments); };
    window.clarity('consentv2', consent());
    script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.clarity.ms/tag/yhfkgd4isf';
    active = true;
    inserted = true;
    document.head.appendChild(script);
  }
  function apply(previous, fallback = false) {
    if (choice !== 'granted' || restricted() || storageFailed) clearCookies();
    if (fallback || storageFailed || choice === 'denied' || choice === 'unavailable' || restricted() ||
      (previous === 'granted' && choice !== 'granted')) revoke(fallback || storageFailed);
    else start();
  }
  function update() {
    status.textContent = storageFailed
      ? (english ? 'Your choice could not be saved or read. Clarity is stopped on this page.' : '設定を保存または読み取れないため、このページのClarityは停止中です。')
      : restricted()
        ? (english ? 'Clarity is off because of your browser privacy preference.' : 'ブラウザーのプライバシー設定によりClarityは停止中です。')
        : choice === 'denied' || choice === 'unavailable'
          ? (english ? 'Clarity: collection is off.' : 'Clarity：計測を停止しています。')
          : choice === 'granted'
            ? (english ? 'Clarity: cookies are allowed on eligible pages.' : 'Clarity：対象ページでCookieを許可して計測します。')
            : (english ? 'Clarity: eligible pages are measured without cookies.' : 'Clarity：対象ページでCookieを使わず計測します。');
    for (const value of ['basic', 'granted']) {
      panel.querySelector(`[data-clarity-choice="${value}"]`).disabled = restricted() || storageFailed;
    }
  }
  window.leafonyClaritySettings = () => { panel.hidden = false; update(); };
  document.querySelectorAll('[data-clarity-settings]').forEach(button => {
    button.hidden = false;
    button.addEventListener('click', () => { window.leafonyClaritySettings(); panel.querySelector('button').focus(); });
  });
  panel.querySelector('[data-clarity-close]').addEventListener('click', () => {
    panel.hidden = true;
    document.querySelector('[data-clarity-settings]')?.focus();
  });
  panel.querySelectorAll('[data-clarity-choice]').forEach(button => {
    button.addEventListener('click', () => {
      const previous = choice;
      const next = button.dataset.clarityChoice;
      if (!['basic', 'granted', 'denied'].includes(next) || ((restricted() || storageFailed) && next !== 'denied')) return;
      let fallback = false;
      try {
        localStorage.setItem(key, next);
        if (localStorage.getItem(key) !== next) throw new Error('Choice was not saved');
        choice = next;
      } catch {
        storageFailed = true;
        forcedDenied = true;
        choice = 'denied';
        // Removing an old grant can expose the automatic null default; always use an excluded URL.
        try { localStorage.removeItem(key); } catch { /* The excluded URL also overrides a stale grant. */ }
        fallback = true;
      }
      panel.hidden = !storageFailed;
      if (!fallback && next !== 'denied' && new URL(location.href).searchParams.has('clarity')) {
        if (next === 'basic') clearCookies();
        const target = new URL(location.href);
        target.searchParams.delete('clarity');
        unloading = true;
        location.replace(target.href);
        update();
        return;
      }
      apply(previous, fallback);
      update();
    });
  });
  function sync() {
    const previous = choice;
    choice = readChoice();
    apply(previous);
    update();
  }
  window.addEventListener('storage', event => {
    if (event.key === key || event.key === null) sync();
  });
  window.addEventListener('pageshow', sync);
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
  panel.hidden = true;
  update();
  if (choice !== 'granted' || restricted() || storageFailed) clearCookies();
  start();
})();
