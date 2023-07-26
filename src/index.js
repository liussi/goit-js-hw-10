
import { fetchBreeds, fetchCatByBreed} from "./cat-api";
import { showElement, hideElement } from './downloads-processing';
import { catInfo, breedSelect, loader } from './variables'




fetchBreeds()

breedSelect.addEventListener('input', () => {

showElement(loader);
hideElement(catInfo);

const selectedBreedId = breedSelect.value;
fetchCatByBreed(selectedBreedId);
   });
  
  