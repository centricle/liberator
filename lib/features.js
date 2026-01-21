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
}
