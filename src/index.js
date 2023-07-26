import axios from "axios";
import { fetchBreeds, fetchCatByBreed,showElement,hideElement} from "./cat-api";
import SlimSelect from 'slim-select'


const API_KEY = "live_ZXPG0QRSYqBY2aSBeLEhQJkOW5riU7dnDWfXA3dN5D2cEW8gfClyctizlpBSN5cL";
const catInfo = document.querySelector('.cat-info');
const breedSelect = document.querySelector('#single');
console.log(breedSelect)
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');

axios.defaults.headers.common["x-api-key"] = API_KEY;


showElement(loader);
hideElement(breedSelect);
hideElement(error);  

new SlimSelect({
  select: '#single'
})


fetchBreeds()
  .then(breedsData => {
    // Використовуємо метод map для створення опцій для випадаючого списку
    const breedOptions = breedsData.map(breed => {
      const option = document.createElement('option');
      option.value = breed.id;
      option.text = breed.name;
      return option;
    });

    // Додаємо всі опції до випадаючого списку breedSelect
    breedOptions.forEach(option => {
      breedSelect.appendChild(option);
    });
   showElement(breedSelect);
   hideElement(loader);

     
  })
   .catch(error => {
   hideElement(loader);  
   showElement(error);   
    console.error("Помилка при отриманні порід:", error);
  });


showElement(loader);
hideElement(catInfo);


breedSelect.addEventListener('input', () => {
  const selectedBreedId = breedSelect.value;
  console.log(selectedBreedId);

  if (selectedBreedId) {
    fetchCatByBreed(selectedBreedId)
    .then(catData => {
        console.log(catData);
       const { description, temperament, image :{url}, name } = catData;

      const markup = `
        <img src="${url}" alt="${name}" width="200px">
        <h2>${name}</h2>
        <p>${description}</p>
        <p>Temperament:${temperament}</p>
      `;

      catInfo.innerHTML = markup;



showElement(catInfo);
hideElement(loader);
      })
      .catch(error => {
        console.error("Помилка при отриманні даних про кота:", error);
        catInfo.innerHTML = ""; // Очищення блоку catInfo
         hideElement(loader);
         showElement(error);

      });
  } else {
    catInfo.innerHTML = ""; // Очищення блоку catInfo
  }
});