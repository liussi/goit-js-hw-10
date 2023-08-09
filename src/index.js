
import { fetchBreeds, fetchCatByBreed} from "./cat-api";
import { catInfo, breedSelect, loader, error } from './variables'
import { showElement, hideElement, handleError } from './downloads-processing';
// import SlimSelect from 'slim-select';
// import 'slim-select/dist/slimselect.css';

breedSelect.addEventListener('input',onSelectedBreedId);

showElement(loader);

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

      handleError(error);
      hideElement(loader);
        
    });


hideElement(error); 
hideElement(catInfo);


function onSelectedBreedId() {

showElement(loader);
hideElement(catInfo);
   
const selectedBreedId = breedSelect.value;
  
 fetchCatByBreed(selectedBreedId)
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
  
}
