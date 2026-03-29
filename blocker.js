
function showOverlay() {
  if (document.getElementById("overlayContainer")) return;
  // mutePage();
  const div = document.createElement("div");
  div.id = "overlayContainer";
  document.body.style.overflow = 'hidden';
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
      <img id = "hourglass" src = "https://media1.tenor.com/m/i-g83DQHe_wAAAAC/scout-tf2.gif" style="width:200px;height:200px; align-items:center;" >
      <div id="timeRemain"></div>
      
    </div>
  `;
 
  document.body.appendChild(div);
}

function mutePage() {
  document.querySelectorAll("video, audio").forEach((elem) => muteMe(elem));
}

function muteMe(elem) {
  elem.muted = true;
  elem.pause();
}

// Run immediately
showOverlay();
mutePage();