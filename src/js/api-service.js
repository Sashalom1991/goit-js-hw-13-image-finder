const BASE_URL = 'https://pixabay.com/api/?image_type=photo&orientation=horizontal';
const API_KEY = '21948648-940e5752284e9bc56aa424f61';
const PER_PAGE = 12;

export default class PixabayApi {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  fetchPixabay() {
    const url = `${BASE_URL}&q=${this.searchQuery}&page=${this.page}&per_page=${PER_PAGE}&key=${API_KEY}`;

    return fetch(url)
      .then(res => res.json())
      .then(({hits}) =>{
         this.incrementPage();
        console.log(hits);
         return hits;
      }).catch(error => console.log(error));
  }

  incrementPage() {
      this.page += 1;
  }

  resetPage() {
      this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
