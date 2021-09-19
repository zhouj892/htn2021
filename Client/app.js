const citiesArr = ["Hamilton, ON", "Toronto, ON", "Waterloo, ON"]
const locationTextBox = document.getElementById("location-textbox");
const autocompleteBox = document.getElementById("autocomplete-box");
const searchIconBox = document.getElementById("search-icon-container");

locationTextBox.addEventListener('click', () => {
    autocompleteBox.style.height = "150px";
    locationTextBox.style.borderRadius = "5px 5px 0px 0px";
    searchIconBox.style.borderRadius = "5px 0px 0px 0px";
})
locationTextBox.addEventListener('blur', () => {
    autocompleteBox.style.height = "";
    locationTextBox.style.borderRadius = "0px 5px 5px 0px";
    searchIconBox.style.borderRadius = "5px 0px 0px 5px";
})
locationTextBox.addEventListener('keyup', (e) => {
    while (autocompleteBox.firstChild) {
        autocompleteBox.removeChild(autocompleteBox.lastChild)
    }
    for (let city of cities) {
        if (city.toLowerCase().includes(locationTextBox.value.toLowerCase()) && locationTextBox.value != ""){
            let cityLink = document.createElement("a");
            cityLink.innerText = city;
            autocompleteBox.append(cityLink);
        }
    }
})