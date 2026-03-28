document.getElementById("addWebsite").addEventListener("click", function () { addItem() });
let listOfSites = [];
let blockedSites = [];
chrome.storage.local.get(["listOfSites"], (data) => {
    listOfSites = data.listOfSites ?? [];
    // do everything that needs listOfSites in here
});
chrome.storage.local.get(["blockedSites"], (data) => {
    blockedSites = data.blockedSites ?? [];
    displayList();
});

async function displayList() {
    listOfSites.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
    let a = document.getElementById("listContainer");
    document.getElementById("listContainer").innerHTML = "";
    for (let i = 0; i < listOfSites.length; i++) {
        let li = document.createElement("li");
        console.log("current site: " + listOfSites[i]);
        li.style.fontSize = "15px";
        li.style.marginTop = "5px";
        li.setAttribute('id', listOfSites[i]);
        addCheckBox(li, blockedSites.includes(listOfSites[i]));
        li.appendChild(document.createTextNode(listOfSites[i]));
        a.appendChild(li);
    }
}

function addItem() {
    var candidate = document.getElementById("websiteInput");
    if (!listOfSites.includes(candidate.value) && !candidate.value.includes(" ") && candidate.value != null && candidate.value != '') {
        listOfSites.push(candidate.value);
        blockedSites.push(candidate.value);
        chrome.storage.local.set({ "blockedSites": blockedSites });
        chrome.storage.local.set({ "listOfSites": listOfSites });
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

function addDelButton(parent) {
    var buttonElem = parent.appendChild(document.createElement("button"));
    buttonElem.innerHTML = "Remove";
    buttonElem.onclick = function () {
        this.parentElement.remove();
    }
}

function addCheckBox(parent, checked)
{
    const checkbox = document.createElement("input"); 
    checkbox.type = "checkbox";    
    checkbox.checked = checked;
    parent.appendChild(checkbox); 
}

// Creating a function to remove item from list
function removeItem() {
    // Declaring a variable to get select element
    var a = document.getElementById("listContainer");
    var candidate = document.getElementById("websiteInput");
    var item = document.getElementById(candidate.value);
    a.removeChild(item);
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
