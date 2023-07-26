import axios from "axios";
import { fetchBreeds, fetchCatByBreed} from "./cat-api";
import { showElement, hideElement, handleError } from './downloads-processing';
import SlimSelect from 'slim-select'


const BASE_URL = "https://api.thecatapi.com/v1";
const API_KEY = "live_ZXPG0QRSYqBY2aSBeLEhQJkOW5riU7dnDWfXA3dN5D2cEW8gfClyctizlpBSN5cL";
const catInfo = document.querySelector('.cat-info');
const breedSelect = document.querySelector('.breed-select');
// const breedSelect = document.querySelector('#selectElement');
console.log(breedSelect)
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');

axios.defaults.headers.common["x-api-key"] = API_KEY;


showElement(loader);
hideElement(breedSelect);
// hideElement(error);  




fetchBreeds()
  .then(breedsData => {
    const breedOptions = breedsData.map(breed => {
      const option = document.createElement('option');
      option.value = breed.id;
      option.text = breed.name;
      return option;
    });

   
    breedOptions.forEach(option => {
      breedSelect.appendChild(option);
    });
   showElement(breedSelect);
   hideElement(loader);
    

  })
   .catch(error => {
   hideElement(loader);  
    showElement(error);   
     handleError(error);
   });


showElement(loader);
hideElement(catInfo);
hideElement(error); 


 


breedSelect.addEventListener('input', () => {
   const selectedBreedId = breedSelect.value;
  fetchCatByBreed(selectedBreedId);
   });
 
  
  // const selectedBreedId = breedSelect.value;
  // console.log(selectedBreedId);

  // if (selectedBreedId) {
  //   fetchCatByBreed(selectedBreedId)
  //     .then(catData => {
    
  //       const { description, temperament, image: { url }, name } = catData;

  //       const markup = `
  //       <img src="${url}" alt="${name}" width="500px">
  //       <div>
  //       <h2>${name}</h2>
  //       <p>${description}</p>
  //       <p><strong>Temperament:</strong>&nbsp; ${temperament}</p>
  //       </div>
       
  //     `;

  //       catInfo.innerHTML = markup;

  //       hideElement(loader);
  //       showElement(catInfo);
  //     })
  //     .catch(error => {
  //       handleError(error);
  //       catInfo.innerHTML = "";
  //       hideElement(loader);
  //       showElement(error);
  //     });
  // };
