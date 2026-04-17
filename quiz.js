var passwordString;
password();
function createPassword(passLength) {
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let random = ''
    for (let length = 0; length < passLength; length++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        random += charset[randomIndex];
    }
    return random;
}

function password() {
    passwordString = createPassword(10);
    let e = document.getElementById("password");
    e.innerHTML = passwordString;
}

var focused;
chrome.storage.local.get(["focus"], (data) => {
    focused = data.focus;
})

document.getElementById("submitPassword").addEventListener("click", function () { passCheck() });
document.getElementById("nevermind").addEventListener("click", function () {
    if (focused) { change("lockedIn", "lockedIn") }
    else change("timer", "timer")
});

function submitOnEnter(button) {
    var input = document.getElementById(button);
    // Execute a function when the user presses a key on the keyboard
    input.addEventListener("keypress", function (event) {
        // If the user presses the "Enter" key on the keyboard
        if (event.key === "Enter") {
            // Trigger the button element with a click
            document.getElementById("submitPassword").click();
        }
    });
}

submitOnEnter("gatekeeper");

//checks password
function passCheck() {
    let entered = document.getElementById("gatekeeper");
    //remove or statement before prod
    if (entered.value == passwordString || entered.value == "please") {
        chrome.storage.local.set({ "focus": false });
        chrome.storage.local.set({ "endTime": Date.now()});
        change("basic_toggle", "basic_toggle");
    }
    else {
        document.getElementById("incorrect").style.display = 'block';
    }
}


