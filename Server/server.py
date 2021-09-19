from fastapi import FastAPI, Response
from fastapi.staticfiles import StaticFiles
from fastapi.responses import RedirectResponse
from statistics import median
from Scraping.buyRates import RealtorPrice
from Scraping.rentRates import RentcanadaPrice

app = FastAPI()

app.mount("/static", StaticFiles(directory="../Client"), name="static")

@app.get("/")
def read_root():
    return RedirectResponse(url='/static/index.html')

@app.get("/{city}/{province}")
def read_location(city: str, province: str):
    median_price = median(RealtorPrice(city, province))
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
