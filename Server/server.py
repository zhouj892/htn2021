from fastapi import FastAPI, Response
from statistics import median
from Scraping.buyRates import RewPrice
from Scraping.rentRates import RentcanadaPrice

app = FastAPI()


@app.get("/")
def read_root():
    return Response("Housing Purchasing vs Renting Comparison API")


@app.get("/{city}/{province}")
def read_location(city: str, province: str):
    median_price = median(RewPrice(city, province))
    median_rent = median(RentcanadaPrice(city, province))
    ratio = median_price/median_rent
    result = {
        "Province": province.title(),
        "City": city.title(),
        "Median Home Price": median_price,
        "Median Rent Price": median_rent,
        "Price Rent Ratio": ratio
    }
    return result
