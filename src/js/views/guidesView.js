class GuidesView {
  #data;
  #parentElement = document.querySelector('main');

  //function used to render the page based on the curret data parameter if data is null an error will be displayed instead required markup
  //[param]-data  Guide list
  render(data) {
    this.#clear();
    if (!data || (Array.isArray(data) && data.length === 0)) {
      this.#parentElement.insertAdjacentHTML('afterbegin', getErrorMarkup('There are no guides to be displayed'));
      return;
    }
    this.#data = data;
    const markup = this.#generateMarkup();
    this.#parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  //function used to generate the overall markup of the page that will be introduce within the parent main element
  #generateMarkup = () => {
    return `
    <div id="card-container" class="row row-cols-1 row-cols-lg-2 g-4">
    ${this.#generateMarkupCard(this.#data)}
    </div>`;
  };

  //function used to generate each individual markup represeted as cards
  //[param]- a list of GUIDES
  //return a String representing the markup
  #generateMarkupCard(guides) {
    return guides
      .map((guide) => {
        console.log(guide.image);
        return ` 
        <div class="col">
            <div class="card h-100 shadow">
            <div class="row">
                <div class="col-10">
                <div class="card-body">
                    <strong class="d-inline-block card-text mb-2 text-primary">${guide.lastName} ${guide.firstName}</strong>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="blue" class="bi bi-trophy-fill" viewBox="0 0 16 16">
                    <path
                        d="M2.5.5A.5.5 0 0 1 3 0h10a.5.5 0 0 1 .5.5c0 .538-.012 1.05-.034 1.536a3 3 0 1 1-1.133 5.89c-.79 1.865-1.878 2.777-2.833 3.011v2.173l1.425.356c.194.048.377.135.537.255L13.3 15.1a.5.5 0 0 1-.3.9H3a.5.5 0 0 1-.3-.9l1.838-1.379c.16-.12.343-.207.537-.255L6.5 13.11v-2.173c-.955-.234-2.043-1.146-2.833-3.012a3 3 0 1 1-1.132-5.89A33.076 33.076 0 0 1 2.5.5zm.099 2.54a2 2 0 0 0 .72 3.935c-.333-1.05-.588-2.346-.72-3.935zm10.083 3.935a2 2 0 0 0 .72-3.935c-.133 1.59-.388 2.885-.72 3.935z"
                    />
                    </svg>
                    <h2 class="card-title mb-2">${guide.occupation}</h2>

                    <small class="d-block card-text text-muted">Age: ${guide.age} </small>
                    <small class="d-block card-text text-muted">Tours: <span class="fst-italic">${guide.tours.join(', ')}</span></small>
                </div>
                </div>

                <div class="col-2">
                
                <img src="src/img/${guide.image}" class="img-fluid rounded float-end me-2" alt="guide face image" />
                </div>
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

export default new GuidesView();
