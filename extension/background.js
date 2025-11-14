// The URL where your Gist PWA is hosted.
// IMPORTANT: You must change this to your actual deployed URL.
const GIST_APP_URL = 'https://thethomascoin.github.io/Gist//';

// Function to create the context menu
const createContextMenu = () => {
  // Use chrome.contextMenus.removeAll to ensure a clean setup, especially during development
  chrome.contextMenus.removeAll(() => {
    chrome.contextMenus.create({
      id: 'save-page-to-gist',
      title: 'Save page to Gist',
      contexts: ['page'],
    });

    chrome.contextMenus.create({
      id: 'save-selection-to-gist',
      title: 'Save selection to Gist',
      contexts: ['selection'],
    });
  });
};

// Create menu when the extension is installed
chrome.runtime.onInstalled.addListener(() => {
  createContextMenu();
});

// Handler for the browser action (toolbar icon) click
chrome.action.onClicked.addListener((tab) => {
  if (tab && tab.url && !tab.url.startsWith('chrome://')) {
    const targetUrl = `${GIST_APP_URL}?url=${encodeURIComponent(tab.url)}`;
    chrome.tabs.create({ url: targetUrl });
  }
});

// Handler for context menu clicks
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (!tab || !tab.url) return;

  let contentToSave = '';
  let paramType = '';

  if (info.menuItemId === 'save-selection-to-gist' && info.selectionText) {
    contentToSave = info.selectionText;
    paramType = 'text';
  } else if (info.menuItemId === 'save-page-to-gist') {
    contentToSave = tab.url;
    paramType = 'url';
  }

  if (contentToSave && paramType) {
    const targetUrl = `${GIST_APP_URL}?${paramType}=${encodeURIComponent(contentToSave)}`;
    chrome.tabs.create({ url: targetUrl });
  }
});
