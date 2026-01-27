import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import { getImagesByQuery } from './js/pixabay-api.js';
import * as render from './js/render-functions.js';

const searchForm = document.querySelector('.form');
const loadMoreBtn = document.querySelector('.load-more');

let query = "";
let page = 1;

searchForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const userQuery = event.currentTarget.elements['search-text'].value.trim();
  
  if (!userQuery) {
    iziToast.warning({ message: "Please enter a search query" });
    return;
  }

  query = userQuery;
  page = 1;

  render.clearGallery();
  render.hideLoadMoreButton();
  
  await handleFetch();
  searchForm.reset();
});

loadMoreBtn.addEventListener('click', async () => {
  page += 1;
  render.hideLoadMoreButton(); 
  render.showLoader(); 
  await handleFetch();
});

async function handleFetch() {
  render.showLoader(); 

  try {
    const data = await getImagesByQuery(query, page);

    if (data.totalHits === 0) {
      iziToast.error({
        message: 'Sorry, there are no images matching <br> your search query.',
        position: 'topRight',
      });
      return;
    }

    render.createGallery(data.hits);

    if (page > 1) {
      smoothScroll();
    }

    const totalLoaded = page * 15;
    if (totalLoaded >= data.totalHits) {
      render.hideLoadMoreButton();
      if (data.totalHits > 0) {
        iziToast.info({ message: "We're sorry, but you've reached the end of search results." });
      }
    } else {
      render.showLoadMoreButton();
    }

  } catch (error) {
    iziToast.error({ message: 'Error fetching images!' });
    console.error(error);
  } finally {
    render.hideLoader(); 
  }
}

function smoothScroll() {
  const card = document.querySelector('.gallery-item');
  if (card) {
    const cardHeight = card.getBoundingClientRect().height;
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  }
}