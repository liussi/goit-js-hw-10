import axios from "axios";
import { showElement, hideElement, handleError } from './downloads-processing';
import {BASE_URL, API_KEY,  catInfo, breedSelect, loader, error } from './variables'


axios.defaults.headers.common["x-api-key"] = API_KEY;


export const fetchBreeds = () => {
  showElement(loader);

  return axios.get(`${BASE_URL}/breeds`)
    .then(response => response.data)
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

      handleError(error);
      hideElement(loader);
        
    });
};

hideElement(error); 
hideElement(catInfo);

export const fetchCatByBreed = (breedId) => {
  showElement(loader);
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
        <div class='wrapper'>
        <img src="${url}" alt="${name}" width="500px" height ='400px'>
         <div>
       <h2>${name}</h2>
        <p>${description}</p>
        <p><strong>Temperament:</strong>&nbsp; ${temperament}</p>
        </div>
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








