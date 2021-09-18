def constructUrl(city, province):
    rentUrl = "https://www.rentcanada.com/" + city + "-" + province
    buyBaseUrl = "https://www.realtor.ca/" + province + "/" + city + "/real-estate"

    return [rentUrl, buyBaseUrl]
