var passwordString;
password();
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
    passwordString = createPassword();
    console.log("I think this is the password" + passwordString);
    let e = document.getElementById("password");
    e.innerHTML = passwordString;
}

document.getElementById("submitPassword").addEventListener("click", function() {passCheck()});
document.getElementById("nevermind").addEventListener("click", function() {change("timer", "timer")});

var input = document.getElementById("gatekeeper");

// Execute a function when the user presses a key on the keyboard
input.addEventListener("keypress", function(event) {
  // If the user presses the "Enter" key on the keyboard
  if (event.key === "Enter") {
    // Trigger the button element with a click
    document.getElementById("submitPassword").click();
  }
});

function passCheck()
{
    let entered = document.getElementById("gatekeeper");
    //remove or statement before prod
    if(entered.value == passwordString || entered.value == "please"){
        reset();
    }
    else 
    {
        console.log("correct value: " + passwordString);
        console.log("\n value entered: " + entered.value); 
        document.getElementById("incorrect").style.display = 'block';
    }
}


