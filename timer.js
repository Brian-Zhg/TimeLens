
chrome.storage.local.get(["endTime"], (data) => {
  if (data.endTime > Date.now()) {
    endTime = data.endTime;
    time = Date.now();
  }
  timeRemain();
})

async function timeRemain() {
  if (time > endTime) {
    alert("Timer Finished");
    change("basic_toggle", "basic_toggle");
    return;
  }
  
  let e = document.getElementById('timeRemain');
  if (!e) return;
  let d = Math.floor((endTime - time) / (86400000));
  let h = Math.floor(((endTime - time) % 86400000) / 3600000);
  let m = Math.floor(((endTime - time) % 3600000) / 60000);
  let s = Math.floor(((endTime - time) % 60000) / 1000);
  let tString = " ";
  if (d > 0) tString += (d + " Days ");
  if (h > 0) tString += (h + " Hours ");
  if (m > 0) tString += (m + " Minutes ");
  tString += (s + " Seconds");
  e.innerHTML = tString;

  time = Date.now();
  chrome.storage.local.set({ "time": time });
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  const url = new URL(tab.url);

  // Get user’s blocked sites from storage
  const data = await chrome.storage.local.get("listOfSites");
  const blockedSites = data.listOfSites || []; // array of domains

  // Check if current site is blocked
  if (blockedSites.some(site => url.hostname.includes(site))) {
    // Inject overlay script dynamically
    if (time < endTime) {
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ["blocker.js"]
      });
    }
  }

  setTimeout(timeRemain, 1000);
}

function reset() {
  time = 0;
  chrome.storage.local.set({ "time": time });
  change("basic_toggle", "basic_toggle");
}

document.getElementById("endTimer").addEventListener("click", async function () { await change("quiz", "quiz"); });

