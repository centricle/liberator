const DEFAULTS = {
  paste: true,
  sticky: true,
  select: true
};

export async function load() {
  const { settings = DEFAULTS } = await chrome.storage.local.get('settings');
  return { ...DEFAULTS, ...settings };
}

export async function save(settings) {
  await chrome.storage.local.set({ settings });
}
