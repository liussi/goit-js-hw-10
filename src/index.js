// import axios from "axios";

// axios.defaults.headers.common["x-api-key"] = ;
const API_KEY = "live_ZXPG0QRSYqBY2aSBeLEhQJkOW5riU7dnDWfXA3dN5D2cEW8gfClyctizlpBSN5cL";
const catInfo = document.querySelector('.cat-info');
const breedSelect = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');




function fetchBreeds() {
   const e = fetch('https://api.thecatapi.com/v1/breeds').then(response => response.json()).then()
   console.log(e)
}
fetchBreeds();