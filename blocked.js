

var listOfSites = window.listOfSites || [];
var blockedSites = window.blockedSites || [];
chrome.storage.local.get(["listOfSites"], (data) => {
    listOfSites = data.listOfSites ?? [];
    // do everything that needs listOfSites in here
});
chrome.storage.local.get(["blockedSites"], (data) => {
    blockedSites = data.blockedSites ?? [];
    displayList();
});

//refreshes list and shows it 
async function displayList() {
    listOfSites.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
    let a = document.getElementById("listContainer");
    document.getElementById("listContainer").innerHTML = "";
    for (let i = 0; i < listOfSites.length; i++) {
        let li = document.createElement("li");
        li.style.fontSize = "15px";
        li.style.marginTop = "5px";
        li.style.display = "flex";
        li.style.alignItems = "center";
        li.setAttribute('id', listOfSites[i]);
        addCheckBox(li, blockedSites.includes(listOfSites[i]));
        li.appendChild(document.createTextNode(listOfSites[i]));
        addDelButton(li);
        a.appendChild(li);
    }
}

//add item to list 
function addItem() {
    var candidate = document.getElementById("websiteInput");
    let lCandidate = candidate.value.toLowerCase();
    if (!listOfSites.includes(lCandidate) && !lCandidate.includes(" ") && lCandidate != null && lCandidate != '') {
        listOfSites.push(lCandidate);
        blockedSites.push(lCandidate);
        chrome.storage.local.set({ "blockedSites": blockedSites });
        chrome.storage.local.set({ "listOfSites": listOfSites });
        document.getElementById("included").style.display = 'none';
        document.getElementById("invalid").style.display = 'none';
        displayList();
    }
    else if (candidate.value.includes(" ") && candidate.value != null && candidate.value != '') {
        document.getElementById("included").style.display = 'none';
        document.getElementById("invalid").style.display = 'block';
    }
    else {
        document.getElementById("included").style.display = 'block';
        document.getElementById("invalid").style.display = 'none';
    }
    document.getElementById("websiteInput").value = "";

}


//just a helper function to add a checkbox next to the list values
function addCheckBox(parent, checked) {
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = checked;
    parent.appendChild(checkbox);
}

//same thing but for delete button
function addDelButton(parent) {
    var buttonElem = parent.appendChild(document.createElement("p"));
    buttonElem.style.color = "red";
    buttonElem.textContent = "\u{274C}";
    buttonElem.style.fontSize = "7px";
    buttonElem.style.marginLeft = "auto";
    buttonElem.style.cursor = 'pointer';
    buttonElem.onclick = function () {
        this.parentElement.remove();
        let value = this.parentElement.id;
        const listIndex = listOfSites.indexOf(value);
        if (listIndex > -1) { // only splice array when item is found
            listOfSites.splice(listIndex, 1); // 2nd parameter means remove one item only
            chrome.storage.local.set({"listOfSites" : listOfSites});
        }
        const blockedIndex = blockedSites.indexOf(value);
        if (blockedIndex > -1) { // only splice array when item is found
            blockedSites.splice(listIndex, 1); 
            chrome.storage.local.set({"blockedsites" : blockedSites});
        }
    }
}

document.getElementById("clear").addEventListener("click", function () { clearList() });

//clears list of blocked websites
function clearList() {
    let conformation = confirm("Are you sure you want to clear the list ? ");
    if (conformation) {
        listOfSites = [];
        chrome.storage.local.set({ "listOfSites": [] });
        document.getElementById("included").style.display = 'none';
        document.getElementById("invalid").style.display = 'none';
        displayList();
    }
}

document.getElementById("websiteInput").addEventListener("input", filterList)

//filters list as you type inputs
function filterList(e) {
    let value = e.target.value;
    listOfSites.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
    let a = document.getElementById("listContainer");
    document.getElementById("listContainer").innerHTML = "";
    for (let i = 0; i < listOfSites.length; i++) {
        if (listOfSites[i].indexOf(value) > -1) {
            let li = document.createElement("li");
            li.style.fontSize = "15px";
            li.style.marginTop = "5px";
            li.setAttribute('id', listOfSites[i]);
            addCheckBox(li, blockedSites.includes(listOfSites[i]));
            li.appendChild(document.createTextNode(listOfSites[i]));
            a.appendChild(li);
        }
    }
}

document.getElementById("backButton").addEventListener("click", function(){ change("basic_toggle", "basic_toggle") });

document.getElementById("addWebsite").addEventListener("click", function () { addItem() });
function submitOnEnter(button)
{
var input = document.getElementById(button);
// Execute a function when the user presses a key on the keyboard
input.addEventListener("keypress", function(event) {
  // If the user presses the "Enter" key on the keyboard
  if (event.key === "Enter") {
    // Trigger the button element with a click
    document.getElementById("addWebsite").click();
  }
});
}

submitOnEnter("websiteInput");