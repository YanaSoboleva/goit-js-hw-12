import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import { getImagesByQuery } from './js/pixabay-api.js';
import { createGallery, clearGallery, showLoader, hideLoader } from './js/render-functions.js';

const searchForm = document.querySelector('.form');

searchForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const query = event.currentTarget.elements['search-text'].value.trim();

  if (!query) return;

  clearGallery();
    showLoader();   
    
getImagesByQuery(query)
    .then(data => {
      if (data.hits.length === 0) {
          iziToast.error({
              message: 'Sorry, there are no images matching<br>your search query. Please try again!',
              position: 'topRight',
              messageColor: '#FAFAFB',
              iconColor: '#FAFAFB',   
              closeColor: '#FAFAFB',
              backgroundColor: '#fd4343',
         });
      } else {
        createGallery(data.hits); 
      }
    })
    .catch(error => {
      iziToast.error({ message: 'Something went wrong!' });
      console.log(error);
    })
    .finally(() => {
        hideLoader();
        searchForm.reset();
    });
});