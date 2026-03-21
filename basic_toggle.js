/*
Current issue: need to figure out how to get the timer to be remembered and not just cancelled
after joining 2 or 3 times thinking maybe redo timer to have it based off of the world time 
*/

src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js">
document.addEventListener("DOMContentLoaded", () => {
  startTime();
  chrome.storage.local.get(["time"], (data)=> {
    if(data.time){
      timer(data.time);
      time = data.time;
    }
  })
});

var initialTs = Date.now();
var sliderNum=50, minutes=0, hours=0, time=0;

function startTime() {
  const today = new Date();
  let h = today.getHours();
  let m = checkTime(today.getMinutes());
  let s = checkTime(today.getSeconds());
  //part of the day pm vs am 
  let p;
  if(h > 12) p = "PM";
  else p = "AM";

  const el = document.getElementById('txt');
  if (!el) {
    console.error("Element #txt not found");
    return;
  }

    el.innerHTML = Math.abs(h-12) + ":" + m + ":" + s + " " + p;
  
  setTimeout(startTime, 1000);
}

//utilizes stopWatch function after click on current_time 
document.getElementById("current_time").addEventListener("click", function() {stopWatch(0)});

function stopWatch(seconds) {

  const el = document.getElementById('newTxt');
  if (!el) {
    console.error("Element #txt not found");
    return;
  }
    el.innerHTML = seconds;
    setTimeout(stopWatch, 1000, seconds+1);
}

document.getElementById("start").addEventListener("click", function() {getTime();});

async function getTime()
{
  let hTime = document.getElementById("hours").value;
  if(hTime != null && hTime != "") hours = hTime;
  
  let mTime = document.getElementById("minutes").value;
  if(mTime != null && mTime != "") minutes = mTime;

  if(hours > 0 || minutes >0){
    timer(hours*3600 + minutes*60);
    time = hours*3600+minutes*60;
  }
  else 
  {
    timer(sliderNum*60);
    time = sliderNum*60;
  }
  const content = document.getElementById('content');

  // Fetch the HTML of the other file
  const response = await fetch(chrome.runtime.getURL('timer.html'));
  const html = await response.text();

  // Replace current popup content
  content.innerHTML = html;
}
/*
tLength: timer length 
initialT: initial Time
*/
function timer(tLength){
  if(tLength < 0) 
    {
      alert("Timer Finished");
      return;
    }

    //might take out of prod, want to have a way to check it counting down 
  const el = document.getElementById('countdown');
  if (!el) {
    console.error("Element #txt not found");
    return;
  }
  el.innerHTML = tLength; 
  time--;
  console.log(time);
  chrome.storage.local.set({"time": time});
  setTimeout(timer, 1000, tLength-1);
}

// Slider number 
var slider = document.getElementById("minSlider");
var output = document.getElementById("slideText");
output.innerHTML = slider.value;

slider.oninput = function() {
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

function checkTime(i) {
  return i < 10 ? "0" + i : i;
}