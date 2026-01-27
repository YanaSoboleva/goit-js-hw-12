import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const galleryContainer = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.load-more');

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

export function showLoader() {
  if (loader) loader.classList.remove('hidden');
}

export function hideLoader() {
  if (loader) loader.classList.add('hidden');
}

export function showLoadMoreButton() {
  loadMoreBtn?.classList.remove('hidden');
}

export function hideLoadMoreButton() {
  loadMoreBtn?.classList.add('hidden');
}

export function clearGallery() {
  if (galleryContainer) galleryContainer.innerHTML = '';
}

export function createGallery(images) {
  if (!galleryContainer) return;

  const markup = images
    .map(
      ({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `
    <li class="gallery-item">
      <a class="gallery-link" href="${largeImageURL}">
        <img class="gallery-image" src="${webformatURL}" alt="${tags}" width="360"/>
        <div class="info">
          <p><b>Likes</b><br>${likes}</p>
          <p><b>Views</b><br>${views}</p>
          <p><b>Comments</b><br>${comments}</p>
          <p><b>Downloads</b><br>${downloads}</p>
        </div>
      </a>
    </li>
  `
    )
    .join('');

  galleryContainer.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
};