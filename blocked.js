document.getElementById("addWebsite").addEventListener("click", function () { addWeb() })
let listOfSites = [];

chrome.storage.local.get(["blockedSites"], (data) => {
    let listOfSites = data.blockedSites ?? [];
    
    // do everything that needs listOfSites in here
    console.log(listOfSites);
});

function addWeb() {
    let el = document.getElementById("websiteInput").value;
    if (el != null && el != "") {
        listOfSites.push(el);
        chrome.storage.local.set({ "blockedSites": listOfSites || [] });
    }
    displayList();
}

async function displayList() {
    let result = await chrome.storage.local.get("blockedSites");
    let list = result.blockedSites || [];
    list.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
    for (let i = 0; i < list.length; i++) {
        var entry = document.createElement('li');
        entry.appendChild(document.createTextNode(list[i]));
        textList.appendChild(entry);
    }
}

document.getElementById("clear").addEventListener("click", function () { clearList() });
//clears list of blocked websites
function clearList() {
    let conformation = confirm("Are you sure you want to clear the list ? ");
    if(conformation){
        chrome.storage.local.set({ "blockedSites":[] });
        displayList();
    }
}
