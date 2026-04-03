chrome.runtime.onInstalled.addListener(() => {
  chrome.alarms.create("myAlarm", { periodInMinutes: 0.1 });
});

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name !== "myAlarm") return;

  // Load blocked sites + time window from storage
  chrome.storage.local.get(["blockedSites", "endTime"], (data) => {
    const blockedSites = data.blockedSites || [];
    const now = Date.now();
    const endTime = data.endTime || 0;

    // Only proceed if we're within the blocked time window
    if (now > endTime) return;

    chrome.tabs.query({}, (tabs) => {
      for (let tab of tabs) {
        if (!tab.url) continue;

        // Skip restricted pages
        if (tab.url.startsWith("chrome://") ||
          tab.url.startsWith("edge://") ||
          tab.url.startsWith("about:")) continue;

        let hostname;
        try {
          hostname = new URL(tab.url).hostname; // safely parse
        } catch {
          continue;
        }

        // Only inject if hostname matches a blocked site
        if (blockedSites.some(site => hostname.includes(site))) {
          chrome.scripting.executeScript({
            target: { tabId: tab.id },
            files: ["blocker.js"]
          });
        }
      }
    });
  });
});



chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status !== "complete" || !tab.url) return;

  // Skip restricted pages
  if (tab.url.startsWith("chrome://") ||
      tab.url.startsWith("edge://") ||
      tab.url.startsWith("about:")) return;

  let hostname;
  try {
    hostname = new URL(tab.url).hostname;
  } catch {
    return;
  }

  chrome.storage.local.get(["blockedSites", "endTime"], (data) => {
    const blockedSites = (data.blockedSites || []).filter(site => site && site.trim() !== "");
    const endTime = data.endTime || 0;

    if (Date.now() > endTime) return;

    if (blockedSites.some(site => hostname.includes(site))) {
      chrome.scripting.executeScript({
        target: { tabId: tabId }, // use tabId directly, not tab.id
        files: ["blocker.js"]
      });
    }
  });
});