import { initMap } from './../map.js';

class RoutesView {
  #data;
  #parentElement;
  #favList;
  constructor() {
    this.#parentElement = document.querySelector('main');
    this.#favList = document.getElementById('fav-list');
  }

  //function used to render the page based on the curret data parameter if data is null an error will be displayed instead required markup
  //[param]  Route
  render(data) {
    this.#clear();
    if (!data) {
      this.#parentElement.insertAdjacentHTML('afterbegin', getErrorMarkup('There is no route to be displayed'));
    }
    this.#data = data;
    const markup = this.#generateMarkupRoute();
    this.#parentElement.insertAdjacentHTML('afterbegin', markup);
    initMap(data.startCoords, data.endCoords);
  }

  //function used to render list of favorite routes
  //[param] Array of routes
  renderFavorites(data) {
    this.#favList.innerHTML = '';
    if (!data || (Array.isArray(data) && data.length === 0)) {
      this.#favList.textContent = 'No routes';
      return;
    }
    const markup = data
      .map((el) => {
        return `<li class="list-group-item">${el.name}</li>`;
      })
      .join(' ');
    this.#favList.insertAdjacentHTML('afterbegin', markup);
  }

  addFavoriteListener(handler) {
    document.getElementById('btn-fav').addEventListener(
      'click',
      function () {
        document.getElementById('modal-text').textContent = handler();
      }.bind(this)
    );
  }

  #generateMarkupRoute = () => {
    return `
      <div class="row route_jumbo-1 p-5 mx-0 mb-4 rounded-3 bg-light">
        <div class="col-7 container-fluid py-5">
          <h1 class="route_title display-4 fw-bold mb-2">${this.#data.name}</h1>
          <p class="route_title fs-2">Highlights: ${this.#data.highlights.join(', ')}</p>
          <button id="btn-fav" type="button" class="btn btn-outline-secondary btn-lg fw-bold p-2 mt-3" data-bs-toggle="modal" data-bs-target="#bookTrip">Add To Favorite !  
          </button>
        </div>

        <div class="col-5 container-fluid py-5">
          <img src="src/img/${this.#data.image}" class="d-block mx-auto img-fluid" />
        </div>
      </div>

      <div class="row align-items-md-stretch">
        <div class="col-md-6">
          <div class="h-100 p-5 text-white bg-dark rounded-3">
            <h2>Tour Details</h2>
            <ul>
              <li class="fs-3 mt-4">Day: ${this.#data.day}</li>
              <li class="fs-3">Starts: ${this.#data.time}</li>
            </ul>
          </div>
        </div>

        <div class="col-md-6">
          <div id="map" class="h-100 p-5 bg-light border rounded-3">
        </div>
      </div>

      <div class="modal fade" id="bookTrip" tabindex="-1" aria-labelledby="bookTrip" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Add the Scouty tour to you favorites list!</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div id="modal-text" class="modal-body">STUB</div>
            <div class="modal-footer">
              <button type="button" class="btn btn-outline-success" data-bs-dismiss="modal">Close
              </button>
            </div>
          </div>
        </div>
      </div>`;
  };

  #clear() {
    this.#parentElement.innerHTML = '';
  }
}

export default new RoutesView();
