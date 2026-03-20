document.addEventListener("DOMContentLoaded", () => {
  startTime();
});

var initialTs = Date.now();

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
document.getElementById("current_time").addEventListener("click", stopWatch(0));
document.getElementById("current_time").addEventListener("click", timer(500));

function stopWatch(seconds) {

  const el = document.getElementById('newTxt');
  if (!el) {
    console.error("Element #txt not found");
    return;
  }
    el.innerHTML = seconds;
    setTimeout(stopWatch, 1000, seconds+1);
}

/*
tLength: timer length 
initialT: initial Time
*/
function timer(tLength){
  if(tLength <=0 ) 
    {
      alert("Timer Finished");
      return;
    }
  const el = document.getElementById('countdown');
  if (!el) {
    console.error("Element #txt not found");
    return;
  }
  el.innerHTML = tLength; 

  setTimeout(timer, 1000, tLength-1);
}

function checkTime(i) {
  return i < 10 ? "0" + i : i;
}