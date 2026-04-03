
var time; 
var endTime;
chrome.storage.local.get(["endTime"], (data) => {
  if (data.endTime > Date.now()) {
    endTime = data.endTime;
  }
  timeRemain();
})

async function timeRemain() {
  if (time > endTime) {
    alert("Timer Finished");
    change("basic_toggle", "basic_toggle");
    return;
  }
  time = Date.now();
  
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
  chrome.storage.local.set({"leftOnTimer": tString});
  e.innerHTML = tString;
  setTimeout(timeRemain, 1000);
}

function reset() {
  chrome.storage.local.set({ "endTime": Date.now() });
  change("basic_toggle", "basic_toggle");
}


var endingTimer = document.getElementById("endTimer");
if(endingTimer) endingTimer.addEventListener("click", async function () { await change("quiz", "quiz"); });


