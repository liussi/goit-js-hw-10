import Notiflix from 'notiflix';
import {BASE_URL, API_KEY,  catInfo, breedSelect, loader, error } from './variables'

export function handleError (error) {
  Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!');
   
};

export const showElement = (element) => element.style.display = 'block';
export const hideElement = (element) => element.style.display = 'none';
