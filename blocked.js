document.getElementById("addWebsite").addEventListener("click", function () { addWeb() })

let listOfSites = [];
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
    let textList = document.getElementById("listContainer")
    for (let i = 0; i < list.length; i++) {
        var entry = document.createElement('li');
        entry.appendChild(document.createTextNode(list[i]));
        textList.appendChild(entry);
    }
}
