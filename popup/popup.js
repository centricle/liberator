import { load, save } from '../lib/settings.js';

const features = [];

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

document.addEventListener('DOMContentLoaded', () => {
  loadSettings();
  features.forEach(id => {
    document.getElementById(id).addEventListener('change', saveSettings);
  });
});
