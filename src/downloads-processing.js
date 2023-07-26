import Notiflix from 'notiflix';

export function handleError(error) {
  Notiflix.Notify.failure("Oops! Something went wrong! Try reloading the page!");
  throw error;
};

export const showElement = (element) => element.style.display = 'block';
export const hideElement = (element) => element.style.display = 'none';
