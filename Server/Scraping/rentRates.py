import requests


def RentcanadaPrice(city: str, province: str):
    cityId = getCityId(city, province)
    return getRate(cityId)


def getCityId(city: str, province: str):
    url = "https://www.rentcanada.com/api/routing?pageUrl=%2F" + city + "-" + province
    result = requests.get(url).json()
    cityId = result['pageData']['objects']['id']
    return cityId


def getRate(cityId: int):
    rates = []
    url = "https://www.rentcanada.com/api/listings?cityId="+str(cityId)
    result = requests.get(url).json()
    allListings = result['listings']

    for listing in allListings:
        maxRate = int(listing["maxRate"])
        minRate = int(listing["minRate"])
        if maxRate == minRate:
            rates.append(maxRate)
        else:
            rates.append(minRate)
            rates.append(maxRate)
    return(rates)
