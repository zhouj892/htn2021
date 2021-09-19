import requests
from bs4 import BeautifulSoup
from re import sub
from decimal import Decimal

def RewPrice(city, province):
    URL = "https://www.rew.ca/properties/areas/" + city + "-" + province
    page = requests.get(URL)
    soup = BeautifulSoup(page.content, "html.parser")

    body = soup.find("body")
    listings = body.find_all('article', {'data-listing-link': True})
    rates = []
    for listing in listings:
        rateStr = listing.find(
            'div', {'class': 'displaypanel-title visible-xs'}).string
        rate = int(Decimal(sub(r'[^\d.]', '', rateStr)))
        rates.append(rate)

    return rates
