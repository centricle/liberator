// This function is injected into the page via chrome.scripting.executeScript.
// It must be self-contained since it runs in the page context, not the extension.
export function applyFeatures(settings) {
  // Allow Paste - re-enable copy/paste/cut on restrictive sites
  if (settings.paste) {
    const events = ['paste', 'copy', 'cut'];
    events.forEach(evt => {
      document.addEventListener(evt, e => e.stopImmediatePropagation(), true);
    });

    document.querySelectorAll('input, textarea, [contenteditable]').forEach(el => {
      el.removeAttribute('onpaste');
      el.removeAttribute('oncopy');
      el.removeAttribute('oncut');
    });
  }

  // Kill Sticky - convert fixed/sticky positioned elements to static
  if (settings.sticky) {
    const style = document.createElement('style');
    style.textContent = `
      [style*="position: fixed"],
      [style*="position:fixed"],
      [style*="position: sticky"],
      [style*="position:sticky"] {
        position: static !important;
      }
    `;
    document.head.appendChild(style);

    document.querySelectorAll('*').forEach(el => {
      const pos = getComputedStyle(el).position;
      if (pos === 'fixed' || pos === 'sticky') {
        el.style.position = 'static';
      }
    });
  }

  // Force Select - re-enable text selection
  if (settings.select) {
    const style = document.createElement('style');
    style.textContent = `
      *, *::before, *::after {
        user-select: text !important;
        -webkit-user-select: text !important;
      }
    `;
    document.head.appendChild(style);

    document.querySelectorAll('*').forEach(el => {
      el.style.userSelect = '';
      el.removeAttribute('onselectstart');
      el.removeAttribute('ondragstart');
    });

    ['selectstart', 'dragstart'].forEach(evt => {
      document.addEventListener(evt, e => e.stopImmediatePropagation(), true);
    });
  }
}
