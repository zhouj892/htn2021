const locationTextBox = document.getElementById("location-textbox");
const autocompleteBox = document.getElementById("autocomplete-box");
const searchIconBox = document.getElementById("search-icon-container");
const searchSection = document.getElementById("search-section");
const analysisModal = document.getElementById("analysis-modal");
const homeSpan = document.getElementById("median-home");
const rentSpan = document.getElementById("median-rent");
const rentBuyLevelSpan = document.getElementById("rent-buy-level");
const rentBuySpan = document.getElementById("rent-buy");
const locationSpan = document.getElementById("city-province");
const searchIcon = document.getElementById("search-icon");
const loadingIcon = document.getElementById("loading-icon");
let response, province, city, medianHomePrice, medianRentPrice, priceRentRatio;
let serverDown = false;

const cityLinks = document.getElementsByClassName("city");
for (let city of cityLinks) city.addEventListener("click", sendCall);

// Code for the autocomplete box and its functionality (which cities to show, etc)
locationTextBox.addEventListener("click", () => {
    autocompleteBox.style.height = "auto";
    autocompleteBox.style.maxHeight = "125px";
    locationTextBox.style.borderRadius = "5px 5px 0px 0px";
    searchIconBox.style.borderRadius = "5px 0px 0px 0px";
    searchSection.style.boxShadow = "0px 2px 4px 0px #00000040";
    autocompleteBox.style.boxShadow = "0px 2px 4px 0px #00000040";
});
locationTextBox.addEventListener("blur", () => {
    autocompleteBox.style.height = "";
    locationTextBox.style.borderRadius = "0px 5px 5px 0px";
    searchIconBox.style.borderRadius = "5px 0px 0px 5px";
    searchSection.style.boxShadow = "";
    autocompleteBox.style.boxShadow = "";
});
locationTextBox.addEventListener("keyup", (e) => {
    // Empty the div whenever something new is entered
    while (autocompleteBox.firstChild) {
        autocompleteBox.removeChild(autocompleteBox.lastChild);
    }
    for (let city of cities) {
        if (
            city.toLowerCase().includes(locationTextBox.value.toLowerCase()) &&
            locationTextBox.value != ""
        ) {
            let cityLink = document.createElement("a");
            cityLink.innerText = city;
            cityLink.addEventListener("click", sendCall);
            autocompleteBox.append(cityLink);
        }
    }
});

// When a city link is pressed, call the API using info from the element, then create the result and display the modal
async function sendCall(e) {
    // Close the analysis modal if already open
    if (analysisModal.style.height == "65%") openCloseModal();
    showLoading();
    locationTextBox.value = e.target.innerText;
    let cityProvince = e.target.innerText.split(", ");
    let provinceString = cityProvince[1].toLowerCase();
    let cityString = cityProvince[0].toLowerCase().replace(" ", "-");

    try {
        response = await axios.get(
            `https://house-ca.herokuapp.com/${cityString}/${provinceString}`
        );
    } catch (error) {
        // If the server is down, use sample values
        response = {
            data: {
                Province: cityProvince[1],
                City: cityProvince[0],
                "Median Home Price": "861,695",
                "Median Rent Price": "17,400",
                "Price Rent Ratio": "49.5",
            },
        };
        serverDown = true;
    }

    province = response.data["Province"];
    city = response.data["City"];
    medianHomePrice = response.data["Median Home Price"];
    medianRentPrice = response.data["Median Rent Price"];
    priceRentRatio = response.data["Price Rent Ratio"];
    fillModal();
    // Stops the loading function if still running
    loadingIcon.style.display = "none";
    searchIcon.style.display = "block";
    openCloseModal();
}

document
    .getElementById("modal-open-close-btn")
    .addEventListener("click", openCloseModal);

function openCloseModal() {
    if (analysisModal.style.height == "65%") {
        analysisModal.style.height = "0%";
    } else {
        analysisModal.style.height = "65%";
    }
}

// Fill the elements within the analysis modal using the API data
function fillModal() {
    homeSpan.innerText = `$${medianHomePrice}`;
    rentSpan.innerText = `$${medianRentPrice}`;
    let decisionObject = getDecision();
    rentBuyLevelSpan.innerText = decisionObject.level;
    rentBuySpan.innerText = decisionObject.decision;
    if (serverDown)
        document.querySelector(".error").innerText = "(Our server is down, so you've been given sample data)";
    locationSpan.innerText = `${city.replace(
        "-",
        " "
    )}, ${province.toUpperCase()}`;
}

// Calculates the buy/rent decision based on the ratio
function getDecision() {
    if (priceRentRatio < 16) return { decision: "BUY", level: "much" };
    else if (priceRentRatio < 21)
        return { decision: "RENT", level: "typically" };
    else return { decision: "RENT", level: "much" };
}

function showLoading() {
    searchIcon.style.display = "none";
    loadingIcon.style.display = "block";
    setTimeout(() => {
        loadingIcon.style.display = "none";
        searchIcon.style.display = "block";
    }, 15000);
}
