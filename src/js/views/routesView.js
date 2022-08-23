class RoutesView {
  #TABLE_FIELDS = ['name', 'day', 'time', 'highlights'];
  #data;
  #parentElement = document.querySelector('main');

  //function used to render the page based on the curret data parameter if data is null an error will be displayed instead required markup
  //[param] data list of Routes
  render(data) {
    this.#clear();
    if (!data || (Array.isArray(data) && data.length === 0)) {
      this.#parentElement.insertAdjacentHTML('afterbegin', getErrorMarkup('There are no routes to be displayed'));
      return;
    }
    this.#data = data;
    const markup = this.#generateTableMarkup();
    this.#parentElement.appendChild(markup);
  }

  //function used to generate the overall markup of the page that will be introduce within the parent main element
  #generateTableMarkup = () => {
    //I TABLE SECTIONS HEAD/BODY + BOOTSTRAP classes
    const table = document.createElement('table');
    table.classList.add('table', 'fs-5', 'table-dark', 'table-bordered', 'table-hover', 'table-striped');
    //II TABLE HEADER
    const tableHead = this.#generateTableHeaderMarkup();
    table.appendChild(tableHead);
    //III TABLE ROWS
    const tableBody = this.#generateTableBodyMarkup();
    table.appendChild(tableBody);
    return table;
  };

  #generateTableHeaderMarkup() {
    const tableHead = document.createElement('thead');
    const tableFields = document.createElement('tr');
    //Add heading to the table header based on predifined table heading list
    this.#TABLE_FIELDS.forEach((field) => {
      const heading = document.createElement('th');
      //Simple txt formatting
      heading.textContent = `${field[0].toUpperCase()}${field.substring(1)}`;
      tableFields.appendChild(heading);
      //Bootstrap styling
      for (const i of tableFields.children) {
        i.setAttribute('scope', 'col');
      }
    });
    //Add the empty filed used for the details column
    const emptyHeading = document.createElement('th');
    emptyHeading.textContent = '';
    tableFields.appendChild(emptyHeading);
    //Add fields to the header element
    tableHead.appendChild(tableFields);
    return tableHead;
  }

  #generateTableBodyMarkup() {
    const tableBody = document.createElement('tbody');
    this.#data.forEach((route) => {
      //TABLE ROW
      const tableRow = document.createElement('tr');
      tableBody.appendChild(tableRow);
      //Inflate data within the row based on the requried fields based on the predifined table fields
      this.#TABLE_FIELDS.forEach((field) => {
        const tableData = document.createElement('td');
        //Highlights are represented as an array
        if (field === 'highlights') {
          tableData.textContent = route[field].join(', ');
        } else {
          tableData.textContent = route[field];
        }
        tableRow.appendChild(tableData);
      });
      //Add link with the query string representing the route name
      const tableData = document.createElement('td');
      const tableLink = document.createElement('a');
      //ADD REF and the query string that will be used to fetch the data from the list
      tableLink.href = `route.html?route=${route.slug}`;
      //ADD BOOTSTRAP CLASS
      tableLink.classList.add('link-primary');
      tableData.appendChild(tableLink);
      tableLink.textContent = 'Details';
      tableRow.appendChild(tableData);
    });
    return tableBody;
  }

  #clear() {
    this.#parentElement.innerHTML = '';
  }
}

export default new RoutesView();
