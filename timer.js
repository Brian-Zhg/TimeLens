

chrome.storage.local.get(["time"], (data)=> {
    if(data.time > 0){
      time = data.time;
    }
  })
  timeRemain();
  //hide();

async function timeRemain()
{
    if(time < 0 ){
        alert("Timer Finished");
        change("basic_toggle", "basic_toggle");
        return;
    } 
  let e = document.getElementById('timeRemain');
  if(!e) return; 
  let d = Math.floor(time/(86400));
  let h = Math.floor((time%86400)/3600);
  let m = Math.floor((time%3600)/60);
  let s = Math.floor(time%60);
  let tString = "";
  if(d > 0) tString += (d + " Days ");
  if(h > 0) tString += (h + " Hours ");
  if(m > 0) tString += (m + " Minutes ");
  tString += (s + " Seconds");
  e.innerHTML=tString;

  time--;
  chrome.storage.local.set({"time": time});
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  const url = new URL(tab.url);

  // Get user’s blocked sites from storage
  const data = await chrome.storage.local.get("listOfSites");
  const blockedSites = data.listOfSites || []; // array of domains

  // Check if current site is blocked
  if (blockedSites.some(site => url.hostname.includes(site))) {
    // Inject overlay script dynamically
    if(time > 0)
    {
        chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ["blocker.js"]
    });
    }
}
    
  setTimeout(timeRemain, 1000);
}

function reset()
{
    time = 0;
    chrome.storage.local.set({"time": time});
    change("basic_toggle", "basic_toggle");
}

document.getElementById("endTimer").addEventListener("click", async function () {await change("quiz", "quiz");});

