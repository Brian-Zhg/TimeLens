var passwordString;
password();
function createPassword(passLength)
{
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let random = ''
    for(let length = 0; length < passLength; length++ )
    {
        const randomIndex = Math.floor(Math.random() * charset.length);
        random += charset[randomIndex];
    }
    return random; 
}

function password()
{
    passwordString = createPassword(10);
    console.log("I think this is the password" + passwordString);
    let e = document.getElementById("password");
    e.innerHTML = passwordString;
}

document.getElementById("submitPassword").addEventListener("click", function() {passCheck()});
document.getElementById("nevermind").addEventListener("click", function() {change("timer", "timer")});

function submitOnEnter(button)
{
var input = document.getElementById(button);
// Execute a function when the user presses a key on the keyboard
input.addEventListener("keypress", function(event) {
  // If the user presses the "Enter" key on the keyboard
  if (event.key === "Enter") {
    // Trigger the button element with a click
    document.getElementById("submitPassword").click();
  }
});
}

submitOnEnter("gatekeeper");

function passCheck()
{
    let entered = document.getElementById("gatekeeper");
    //remove or statement before prod
    if(entered.value == passwordString || entered.value == "please"){
        reset();
    }
    else 
    {
        document.getElementById("incorrect").style.display = 'block';
    }
}


