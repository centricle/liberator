import { load, save } from '../lib/settings.js';
import { applyFeatures } from '../lib/features.js';

const features = ['paste', 'sticky', 'select'];

async function loadSettings() {
  const settings = await load();
  features.forEach(id => {
    document.getElementById(id).checked = settings[id];
  });
}

async function saveSettings() {
  const settings = {};
  features.forEach(id => {
    settings[id] = document.getElementById(id).checked;
  });
  await save(settings);
}

async function apply() {
  const settings = {};
  features.forEach(id => {
    settings[id] = document.getElementById(id).checked;
  });

  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: applyFeatures,
    args: [settings]
  });

  window.close();
}

document.addEventListener('DOMContentLoaded', () => {
  loadSettings();
  features.forEach(id => {
    document.getElementById(id).addEventListener('change', saveSettings);
  });
  document.getElementById('apply').addEventListener('click', apply);
});
