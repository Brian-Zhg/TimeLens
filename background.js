
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status !== "complete" || !tab.url) return;

  // Skip restricted pages
  if (tab.url.startsWith("chrome://") ||
    tab.url.startsWith("edge://") ||
    tab.url.startsWith("about:")) return;
  let name;
  try {
    const hostname = new URL(tab.url).hostname;
    name = hostname.split('.').slice(-2)[0];
  } catch {
    return;
  }

  chrome.storage.local.get(["blockedSites", "endTime", "focus"], (data) => {
    const blockedSites = (data.blockedSites || []).filter(site => site && site.trim() !== "");
    const endTime = data.endTime || 0;
    const focus = data.focus;

    if (!focus) { if (Date.now() >= endTime) return; }

    if (blockedSites.some(site => name === site)) {
      chrome.scripting.executeScript({
        target: { tabId: tabId }, // use tabId directly, not tab.id
        files: ["blocker.js"]
      });
    }

  });
});


chrome.tabs.onActivated.addListener((activeInfo) => {
  chrome.tabs.get(activeInfo.tabId, (tab) => {
    if (!tab.url) return;
    if (tab.url.startsWith("chrome://") ||
      tab.url.startsWith("edge://") ||
      tab.url.startsWith("about:")) return;

    let name;
    try {
      const hostname = new URL(tab.url).hostname;
      name = hostname.split('.').slice(-2)[0];
    } catch {
      return;
    }

    chrome.storage.local.get(["blockedSites", "endTime", "focus"], (data) => {
      const blockedSites = (data.blockedSites || []).filter(site => site && site.trim() !== "");
      const endTime = data.endTime || 0;
      const focus = data.focus;

      if (!focus) { if (Date.now() >= endTime) return; }

      if (blockedSites.some(site => name === site)) {
        chrome.scripting.executeScript({
          target: { tabId: activeInfo.tabId },
          files: ["blocker.js"]
        });
      }
    });
  });
});