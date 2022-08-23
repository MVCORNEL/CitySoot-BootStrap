import { getErrorMarkup } from './../helpers.js';

class FavoritesView {
  #data;
  #parentElement = document.querySelector('main');

  //function used to render the page based on the curret data parameter if data is null an error will be displayed instead required markup
  //[param]-data  Route list
  render(data) {
    this.#clear();
    if (!data || (Array.isArray(data) && data.length === 0)) {
      this.#parentElement.insertAdjacentHTML('afterbegin', getErrorMarkup('There are no favorites routes yet'));
      return;
    }
    this.#data = data;
    const markup = this.#generateMarkup();
    this.#parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  //function used to generate the overall markup of the page that will be introduce within the parent main element
  //return a String
  #generateMarkup = () => {
    return `
    <div class="row card-group">
        ${this.#generateMarkupCard(this.#data)}
    </div>`;
  };

  //function used to generate each individual markup represeted as cards
  //[param]- a list of Routes
  //return a String
  #generateMarkupCard(routes) {
    return routes
      .map((route) => {
        return ` 
    <div class="col-xs-12 col-md-6 col-lg-4 mb-4">
      <div class="card mt-3 h-100">
        <img src="src/img/${route.image}" class="card-img-top pt-2" alt="${route.name} image" />
        <div class="card-body">
          <h5 class="card-title">${route.name}</h5>
          <p class="card-text">Highlights: ${route.highlights.join(', ')}</p>
        </div>

        <ul class="list-group list-group-flush">
          <li class="list-group-item">Day: ${route.day}</li>
          <li class="list-group-item">Starts:${route.time}</li>
        </ul>

        <div class="card-body">
          <a href="route.html?route=${route.slug}"type="button" class="btn btn-primary text-white">See more !</a>
          <button type="button" class="btn btn-outline-danger btn-remove" data-name=${route.slug}>Remove!</button>
        </div>
      </div>
    </div>`;
      })
      .join(' ');
  }

  //EVENT DELEGATION USED HERE AND PUBLISHER CONSUMER  PATTERN
  addRemoveFavListener(handler) {
    this.#parentElement.addEventListener('click', function (e) {
      //2 Determine where the event orginated
      if (e.target.classList.contains('btn-remove')) {
        const name = e.target.dataset.name;
        handler(name);
      }
    });
  }

  #clear() {
    this.#parentElement.innerHTML = '';
  }
}

export default new FavoritesView();
