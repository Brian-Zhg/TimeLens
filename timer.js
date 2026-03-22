chrome.storage.local.get(["time"], (data)=> {
    if(data.time > 0){
      time = data.time;
    }
  })
  timeRemain();

function timeRemain()
{
    if(time < 0 ){
        alert("Timer Finished");
        change();
        return;
    } 
  let e = document.getElementById('timeRemain');
  if(!e) 
    {
        console.log("i cant find time");
        return; 
    }
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
  setTimeout(timeRemain, 1000);
}

async function change(){
  const content = document.getElementById('content');

  // Fetch the HTML of the other file
  const response = await fetch(chrome.runtime.getURL('basic_toggle.html'));
  const html = await response.text();

  // Replace current popup content
  content.innerHTML = html;

  //loads js file
  const script = document.createElement("script");
  script.src = chrome.runtime.getURL("basic_toggle.js");
  script.type = "text/javascript";

  document.body.appendChild(script);
}