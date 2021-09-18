def constructUrl(city, province):
    rentUrl = "https://www.rentcanada.com/" + city + "-" + province
    buyUrl = "https://www.realtor.ca/" + province + "/" + city + "/real-estate"

    return [rentUrl, buyUrl]
