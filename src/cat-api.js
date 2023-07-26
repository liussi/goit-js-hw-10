import axios from "axios";

const BASE_URL = "https://api.thecatapi.com/v1";

export const fetchBreeds = () => {
  return axios.get(`${BASE_URL}/breeds`)
    .then(response => response.data)
    .catch(error => {
      throw new Error("Помилка при отриманні порід");
    });
};

export const fetchCatByBreed = (breedId) => {
  return axios.get(`${BASE_URL}/breeds`)
//   return axios.get(`https://api.thecatapi.com/v1/breeds`)
  .then(response => {
    if (response.status !== 200 || !response.data || response.data.length === 0) {
      throw new Error("Помилка при отриманні даних про породи котів.");
    }
    const breedsData = response.data;

    // Знаходимо інформацію про вибрану породу за допомогою breedId
    const selectedBreed = breedsData.find(breed => breed.id === breedId);

    if (!selectedBreed) {
      throw new Error("Кота з такою породою не знайдено.");
    }

    return selectedBreed;
  })
  .catch(error => {
    throw new Error("Помилка при отриманні даних про кота.");
  });
}

export function showElement(element) {
  element.style.display = 'block';
}

export function hideElement(element) {
  element.style.display = 'none';
}


