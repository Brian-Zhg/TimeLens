
function showOverlay() {
  if (document.getElementById("overlayContainer")) return;
  // mutePage();
  const div = document.createElement("div");
  div.id = "overlayContainer";

  div.innerHTML = `
    <div id="overlay" style="
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
    <img id = "hourglass" src = "https://media.tenor.com/j1U9chTe2_0AAAAi/nope-finger-wag.gif" style="width:400px;height:400px; align-items:center;" >
    <div style ="font-size:30px; margin-bottom:200px" id="belowPic"></div>
    </div>
  `;

  document.body.appendChild(div);
}

function mutePage() {
  document.querySelectorAll("video, audio").forEach((elem) => muteMe(elem));
}

function muteMe(elem) {
  document.body.style.overflow = 'hidden';
  elem.muted = true;
  elem.pause();
}

function checkTime() {
  let change = document.getElementById("belowPic");
  chrome.storage.local.get(["leftOnTimer"], (data) => {
    change.innerHTML = data.leftOnTimer;
  });
}

// Run immediately
showOverlay();
mutePage();
checkTime();