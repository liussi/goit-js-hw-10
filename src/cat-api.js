import axios from "axios";
import { showElement, hideElement, handleError } from './downloads-processing';


const BASE_URL = "https://api.thecatapi.com/v1";
const API_KEY = "live_ZXPG0QRSYqBY2aSBeLEhQJkOW5riU7dnDWfXA3dN5D2cEW8gfClyctizlpBSN5cL";
const catInfo = document.querySelector('.cat-info');
const breedSelect = document.querySelector('.breed-select');
// const breedSelect = document.querySelector('#selectElement');
console.log(breedSelect)
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');

axios.defaults.headers.common["x-api-key"] = API_KEY;


export const fetchBreeds = () => {
  return axios.get(`${BASE_URL}/breeds`)
    .then(response => response.data)
    .catch(error => {
      handleError(error);
    });
};

export const fetchCatByBreed = (breedId) => {
  return axios.get(`${BASE_URL}/images/search?breed_ids=${breedId}`)
    .then(response => {
      if (response.status !== 200)  {
        throw new Error(response.status);
      }
      console.log(response.data)
      return response.data;
    })
    .then(data => {
            console.log(data)

      const { url, breeds: [{
        description, temperament, name }]} = data[0];

        const markup = `
        <img src="${url}" alt="${name}" width="500px">
        <div>
        <h2>${name}</h2>
        <p>${description}</p>
        <p><strong>Temperament:</strong>&nbsp; ${temperament}</p>
        </div>
       
      `;

        catInfo.innerHTML = markup;

        hideElement(loader);
        showElement(catInfo);
      })
      .catch(error => {
        handleError(error);
        catInfo.innerHTML = "";
        hideElement(loader);
        showElement(error);
      });
  };








