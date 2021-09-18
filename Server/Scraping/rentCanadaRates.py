import requests

def getCityId(city, province):
    url = "https://www.rentcanada.com/api/routing?pageUrl=%2F" + city + "-" + province
    result = requests.get(url).json()
    cityId = result['pageData']['objects']['id']
    return cityId
    

def getRate(cityId):
    rates = {}
    url = "https://www.rentcanada.com/api/listings?cityId="+str(cityId)
    result = requests.get(url).json()
    allListings = result['listings']
    listingsLedger = result['listingsLedger']

    for listing in allListings:
        listingId = listing["id"]
        maxRate = listing["maxRate"]
        minRate = listing["minRate"]
        avgRate = (int(maxRate) + int(minRate))/2
        rates[listingId] = avgRate
    return(rates)
        



