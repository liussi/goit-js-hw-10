import Notiflix from 'notiflix';

function handleError () {
  Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!');
   
};

const showElement = (element) => element.style.display = 'block';
const hideElement = (element) => element.style.display = 'none';

export { showElement, hideElement, handleError };