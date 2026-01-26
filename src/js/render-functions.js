import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const galleryContainer = document.querySelector('.gallery');
const loader = document.querySelector('.loader');

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

export function showLoader() {
  if (loader) {
    loader.classList.add('is-active'); 
    loader.classList.remove('hidden');
  }
}

export function hideLoader() {
  if (loader) {
    loader.classList.remove('is-active');
    loader.classList.add('hidden');
  }
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

  galleryContainer.innerHTML = markup;
  lightbox.refresh();
}

export function clearGallery() {
  if (galleryContainer) {
    galleryContainer.innerHTML = '';
  }
}