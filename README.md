# Liberator

A Chrome extension that removes annoying web page restrictions.

## Features

- **Allow Paste** - Re-enables copy/paste on sites that block it
- **Kill Sticky** - Removes fixed/sticky positioned elements (headers, banners, etc.)
- **Force Select** - Re-enables text selection on sites that disable it

## Installation

1. Clone or download this repository
2. Open Chrome and navigate to `chrome://extensions`
3. Enable "Developer mode" (toggle in top right)
4. Click "Load unpacked" and select the extension folder

## Usage

1. Navigate to a page with restrictions
2. Click the Liberator extension icon
3. Select which features to enable (settings are remembered)
4. Click "Liberate this page"

## Permissions

- **activeTab** - Access the current tab to inject fixes
- **storage** - Remember your checkbox preferences
- **scripting** - Inject the fix scripts into pages

## License

[MIT](LICENSE)
