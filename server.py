from fastapi import FastAPI, Response
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import RedirectResponse
from statistics import median
from Scraping.buyRates import RewPrice
from Scraping.rentRates import RentcanadaPrice

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/static", StaticFiles(directory="Client"), name="static")

@app.get("/")
def read_root():
    return RedirectResponse(url='/static/index.html')

@app.get("/{city}/{province}")
def read_location(city: str, province: str):
    median_price = median(RewPrice(city, province))
    median_rent = median(RentcanadaPrice(city, province)) * 12
    ratio = median_price/median_rent
    result = {
        "Province": province.title(),
        "City": city.title(),
        "Median Home Price": median_price,
        "Median Rent Price": median_rent,
        "Price Rent Ratio": ratio
    }
    return result
