import './sass/main.scss';
import fotoTpl from './templates/card-foto.hbs';
import PixabayApi  from './js/api-service';
import LoadMoreBtn from './js/load-more-btn';

const refs = {
  serchForm: document.querySelector('.search-form'),
  pixabayContainer: document.querySelector('.gallery'),
};

const pixabayApiService = new PixabayApi();
const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});


refs.serchForm.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', fetchPixabayLiMore);

function onSearch(e) {
  e.preventDefault();

  pixabayApiService.query = e.currentTarget.elements.query.value;

  if (pixabayApiService.query === '') {
    return alert('Некорректный ввод😕');
  }

  pixabayApiService.resetPage();
  clearPixabayContainer();
  fetchPixabayList();
}

function fetchPixabayList() {
    loadMoreBtn.hide();
    pixabayApiService.fetchPixabay().then(hits => 
        {
            if(hits.length === 0){
                alert("Извините, но по Вашему запросу мы ничего не нашли! (((");
                loadMoreBtn.hide();              
              }
                  appendPixabayMarkup(hits);
        });
    loadMoreBtn.show();
    };

function fetchPixabayLiMore() {
        loadMoreBtn.hide();
        pixabayApiService.fetchPixabay().then(hits => 
            {
                if (hits.length<12){
                    alert("Извините, тут еще несколько нашли и все больше нету картинок по запросу(((");
                    appendPixabayMarkup(hits);
                    loadMoreBtn.hide();  
                  }
                    appendPixabayMarkup(hits);
            });
        loadMoreBtn.show();
        };

function appendPixabayMarkup(hits) {
  refs.pixabayContainer.insertAdjacentHTML('beforeend', fotoTpl(hits));
  refs.pixabayContainer.scrollIntoView({
    behavior: 'smooth',
    block: 'end',
  });
}

function clearPixabayContainer() {
  refs.pixabayContainer.innerHTML = '';
}