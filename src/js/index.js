import '../css/styles.css';
import { fetchImg } from './fetchFromPixabay';
import Notiflix from 'notiflix';
import makeItemsCards from '../tamplates/items_galary.hbs';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryEl = document.querySelector('.gallery');
const formEl = document.querySelector('#search-form');
const btnFindMoreEl = document.querySelector('.btn-js');
let page = 1;
let currentTextFind = '';
let lastInputText = '';
let maxPege = 0;
let itemsPerPage = 40;
btnFindMoreEl.style.display = 'none';
btnFindMoreEl.addEventListener('click', onBtnFindMoreClick);

var lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
  /* options */
});

async function onBtnFindMoreClick(event) {
  if (maxPege === page) {
    Notiflix.Notify.info(
      "We're sorry, but you've reached the end of search results."
    );
    btnFindMoreEl.style.display = 'none';
    return;
  }
  try {
    page += 1;
    const response = await fetchImg(currentTextFind, page);
    addMoreItems(response);
  } catch (error) {
    Notiflix.Notify.failure(`${error.response.data}`);
  }
}

function addMoreItems({ data } = {}) {
  renderCardsOfGallery(data.hits);

  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

formEl.addEventListener('submit', async event => {
  event.preventDefault();
  const formInputValue = event.target.elements.searchQuery.value.trim();
  if (lastInputText !== formInputValue && formInputValue !== '') {
    page = 1;

    try {
      const response = await fetchImg(formInputValue, page);
      makeUpFirstGallery(response);

      lastInputText = formInputValue;
      currentTextFind = formInputValue;
    } catch (error) {
      Notiflix.Notify.failure(`${error.response.data}`);
    }
  }
});

function makeUpFirstGallery({ data } = {}) {
  if (data.hits.length === 0) {
    return Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
  Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);

  galleryEl.innerHTML = '';
  renderCardsOfGallery(data.hits);
  maxPege = Math.ceil(data.totalHits / itemsPerPage);
  btnFindMoreEl.style.display = 'block';
  // if (maxPege > 1) {
  //   btnFindMoreEl.style.display = 'block';
  // } else {
  //   btnFindMoreEl.style.display = 'none';
  // }
}

function renderCardsOfGallery(arrOfImg) {
  galleryEl.insertAdjacentHTML('beforeend', makeItemsCards(arrOfImg));
  lightbox.refresh();
}
