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
  setTimeout(timeRemain, 1000);
}

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

document.getElementById("endTimer").addEventListener("click", async function () {await change("quiz"); password(); });

function reset()
{
    time = 0;
    chrome.storage.local.set({"time": time});
    change("basic_toggle", "basic_toggle");
}

function createPassword()
{
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let random = ''
    for(let length = 0; length < 10; length++ )
    {
        const randomIndex = Math.floor(Math.random() * charset.length);
        random += charset[randomIndex];
    }
    return random; 
}

function password()
{
    let passwordString = createPassword();
    console.log(passwordString);
}

document.getElementById("submitPassword").addEventListener("click", passCheck);

function passCheck()
{
    let entered = document.getElementById("gatekeeper");
    let e = document.getElementById("password");
    if(!e) console.log("still cant find password");
    e.innerHTML = passwordString;
    if(entered.value == passwordString){
        reset();
    }
    else 
    {
        document.getElementById("incorrect").style.display = 'block';
    }
}

