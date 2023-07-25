import axios from "axios";
import { fetchBreeds, fetchCatByBreed } from "./cat-api";

const API_KEY = "live_ZXPG0QRSYqBY2aSBeLEhQJkOW5riU7dnDWfXA3dN5D2cEW8gfClyctizlpBSN5cL";
const catInfo = document.querySelector('.cat-info');
const breedSelect = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');

axios.defaults.headers.common["x-api-key"] = API_KEY;
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
  })
  .catch(error => {
    // Обробка помилок, якщо такі є
    console.error("Помилка при отриманні порід:", error);
  });



breedSelect.addEventListener('input', () => {
  const selectedBreedId = breedSelect.value;
  console.log(selectedBreedId);

  if (selectedBreedId) {
    fetchCatByBreed(selectedBreedId)
    .then(catData => {
        console.log(selectedBreedId);

        const markup = catData.map(( {description,temperament,url,name}) => `<img src="${url}" alt="${name}" width = 200px>
        <h2>${name}</h2>
        <p>${description}</p>
        <p>${temperament}</p>`)

        catInfo.insertAdjacentHTML('beforeend', markup.join(''));
  console.log(catInfo)


        loader.style.display = 'none';
        error.style.display = 'none';
      })
      .catch(error => {
        console.error("Помилка при отриманні даних про кота:", error);
        catInfo.innerHTML = ""; // Очищення блоку catInfo
        loader.style.display = 'none';
        error.style.display = 'block';
      });
  } else {
    catInfo.innerHTML = ""; // Очищення блоку catInfo
  }
});
