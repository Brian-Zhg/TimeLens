
function showOverlay() {
  if (document.getElementById("overlayContainer")) return;
  window.__blockerRunning = true;
  const div = document.createElement("div");
  div.id = "overlayContainer";

  div.innerHTML = `
    <div id="overlay" style="
      font-family: 'BodoniPoster', serif;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 10000;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      background-color: #FFFFFF;
    ">
    <img id = "hourglass"  style="width:400px;height:400px; align-items:center;" >
    <div style ="font-size:30px; margin-top:20px" id="belowPic"></div>
    </div>
  `;

  document.body.appendChild(div);
  randomImage();
}

function randomImage() {
  let images = ["https://media.tenor.com/OaGe6QGDbLIAAAAM/asian-baby-finger.gif", "https://media.tenor.com/divc98ce49MAAAAM/nono-nuh-uh.gif",
    "https://media.tenor.com/gfR97oQJltoAAAAM/you-know-better-shame.gif", "https://media.tenor.com/8K-11cIclxkAAAAm/unt-unt-yellow-emoji.webp",
    "https://media.tenor.com/Qc4n4QN0DAUAAAAM/shaking-finger-no-no.gif", "https://media.tenor.com/bn1buOTlXD4AAAAM/mo-finger-wag.gif",
    "https://media.tenor.com/jmgxANJ6FocAAAAM/ngmibp-ngmi-meme.gif", "https://media1.tenor.com/m/lctqQaixfs4AAAAd/no-nope.gif"];
  const icon = document.getElementById("hourglass");
  icon.src = images[Math.floor(Math.random() * images.length)];
}

function mutePage(what) {
  if (what == "mute") {
    document.querySelectorAll("video, audio").forEach((elem) => mute(elem));
  }
  else {
    document.querySelectorAll("video, audio").forEach((elem) => unmute(elem));
  }

}

function mute(elem) {
  document.body.style.overflow = 'hidden';
  elem.muted = true;
  elem.pause();
}

function unmute(elem) {
  document.body.style.overflow = 'visible';
  elem.muted = false;
}

function checkTime() {
  chrome.storage.local.get(["endTime", "focus"], (data) => {
    let change = document.getElementById("belowPic");
    let timeRN = Date.now();
    if(data.focus){change.innerHTML = "You're Locked In Twin";}
    else {
      let d = Math.floor((data.endTime - timeRN) / (86400000));
      let h = Math.floor(((data.endTime - timeRN) % 86400000) / 3600000);
      let m = Math.floor(((data.endTime - timeRN) % 3600000) / 60000);
      let s = Math.floor(((data.endTime - timeRN) % 60000) / 1000);
      let tString = " ";
      if (d > 0) tString += (d + " Days ");
      if (h > 0) tString += (h + " Hours ");
      if (m > 0) tString += (m + " Minutes ");
      tString += (s + " Seconds");
      change.innerHTML = tString;
    }
  });
}


function hideOverlay() {
  var element = document.getElementById("overlayContainer");
  element.parentNode.removeChild(element);
}

// blocker.js
const myInterval = setInterval(() => {
  if (!chrome.runtime?.id) {
    clearInterval(myInterval);
    return;
  }
  chrome.storage.local.get(["endTime", "focus"], (data) => {
    if (data.focus || Date.now() < data.endTime) {
      showOverlay();
      mutePage("mute");
      checkTime();
    } else {
      hideOverlay();
      mutePage();
    }
  });
}, 1000);

