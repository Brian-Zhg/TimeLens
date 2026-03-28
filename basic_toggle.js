/*
Current issue: need to figure out how to get the timer to be remembered and not just cancelled
after joining 2 or 3 times thinking maybe redo timer to have it based off of the world time 
*/


src = "https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js" >
  document.addEventListener("DOMContentLoaded", () => {
    chrome.storage.local.get(["time"], (data) => {
      if (data.time > 0) {
        console.log("time:" +time + "\n");
        time = data.time;
        change("timer", "timer");
      }
    })
  });

var initialTs = Date.now();
var sliderNum = 15, minutes = 0, hours = 0, time = 0;

function startTime() {
  const today = new Date();
  let h = today.getHours();
  let m = checkTime(today.getMinutes());
  let s = checkTime(today.getSeconds());
  //part of the day pm vs am 
  let p;
  if (h > 12) p = "PM";
  else p = "AM";

  const el = document.getElementById('txt');
  if (!el) return;
  
  el.innerHTML = Math.abs(h - 12) + ":" + m + ":" + s + " " + p;

  setTimeout(startTime, 1000);
}



document.getElementById("start").addEventListener("click", function () { getTime(); });

async function getTime() {
  const hRaw = document.getElementById("hours").value.trim();
  const mRaw = document.getElementById("minutes").value.trim();

  // Parse to numbers, default to 0 if empty
  hours  = hRaw !== "" ? parseInt(hRaw, 10) : 0;
  minutes = mRaw !== "" ? parseInt(mRaw, 10) : 0;

  if ((hRaw !== "" && isNaN(hours)) || (mRaw !== "" && isNaN(minutes))) {
    document.getElementById("incorrect").style.display = "block";
    return;
  }

  if (hours > 0 || minutes > 0) {
    time = hours * 3600 + minutes * 60;
  } else {
    time = sliderNum * 60;
  }

  chrome.storage.local.set({ "time": time });
  change("timer", "timer");
}

// Slider number 
var slider = document.getElementById("minSlider");
var output = document.getElementById("slideText");
output.innerHTML = slider.value;

slider.oninput = function () {
  sliderNum = this.value;
  output.innerHTML = sliderNum;
}

// prevent negative inputs 
function preventNegative(e) {
  let value = e.target.value;

  // Remove anything that's not a digit
  value = value.replace(/[^0-9]/g, "");
  
  e.target.value = value;
}

document.getElementById("hours").addEventListener("input", preventNegative);
document.getElementById("minutes").addEventListener("input", preventNegative);

async function change(htmlLink, js){
  const content = document.getElementById('content');

  // Fetch the HTML of the other file
  const response = await fetch(chrome.runtime.getURL(htmlLink + '.html'));
  const html = await response.text();

  // Replace current popup content
  content.innerHTML = html;

  if(js){
    //deletes old scrips
  const oldScript = document.getElementById("page-script");
  if (oldScript) oldScript.remove();

  //loads js file
  const script = document.createElement("script");
  script.src = chrome.runtime.getURL(js +".js");
  script.type = "text/javascript";

  document.body.appendChild(script);
  }
}
document.getElementById("add").addEventListener("click", function () {change("blocked", "blocked")});

function checkTime(i) {
  return i < 10 ? "0" + i : i;
}