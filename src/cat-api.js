import axios from "axios";
import {BASE_URL, API_KEY} from './variables'


axios.defaults.headers.common["x-api-key"] = API_KEY;


function fetchBreeds() {
   return axios.get(`${BASE_URL}/breeds`)
        .then(response => {
            return response.data;
        })
        .catch(error => {

            throw new Error("Помилка запиту:", error.message);
        });

}

function fetchCatByBreed(breedId) {
   return axios.get(`${BASE_URL}/images/search?breed_ids=${breedId}`)
        .then(response => {
            return response.data;
        })
        .catch(error => {

            throw new Error("Помилка запиту:", error.message);
        });
}

export { fetchBreeds, fetchCatByBreed };