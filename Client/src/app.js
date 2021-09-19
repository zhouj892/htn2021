const citiesArr = ["Hamilton, ON", "Toronto, ON", "Waterloo, ON"]
const locationTextBox = document.getElementById("location-textbox");
const autocompleteBox = document.getElementById("autocomplete-box");
const searchIconBox = document.getElementById("search-icon-container");
let response;
let province = "";
let city = "";
let medianHomePrice;
let medianRentPrice;
let priceRentRatio;

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
            cityLink.addEventListener('click', sendCall)
            autocompleteBox.append(cityLink);
        }
    }
})

async function sendCall(e) {
    let cityProvince = e.target.innerText.split(", ");
    let provinceString = cityProvince[1].toLowerCase();
    let cityString = cityProvince[0].toLowerCase();
    response = await axios.get(`https://house-ca.herokuapp.com/${cityString}/${provinceString}`)
    province = response.data["Province"];
    city = response.data["City"];
    medianHomePrice = response.data["Median Home Price"];
    medianRentPrice = response.data["Median Rent Price"];
    priceRentRatio = response.data["Price Rent Ratio"];
}