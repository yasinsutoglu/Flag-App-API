/*FETCHING THE COUNTRIES AND FILL THE SELECT*/
let isError = false;
const formSelect = document.querySelector(".form-select")

const fetchAllCountries = async () =>{
    const url = `https://restcountries.com/v3.1/all`;

    try {
        const res = await fetch(url);
        if (!res.ok) {           
          isError = true;
        //   throw new Error(`My Error is : ${res.status}`)
        }
        const data = await res.json();
        loadCountriesToSelect(data);
    } catch (error) {
        console.log(error)
    }
}

fetchAllCountries()

const loadCountriesToSelect = (countries)=>{

    if(isError){
        document.querySelector("body").innerHTML = ` <h2>Countries cannot be fetched</h2>
                                <img src="./img/404.png" alt="">`;
    return;
    }

    countries.forEach(country => {
        formSelect.innerHTML += `<option value="${country.name.common}">${country.name.common}</option>`;
    })
}

//!formselect onchange event
formSelect.addEventListener("change" , (e)=>{
    fetchCountryByName(e.target.value);
})


/*SHOWING THE COUNTRY AS A  DOM ELEMENT*/
const fetchCountryByName = (name) => {
  const url = `https://restcountries.com/v3.1/name/${name}`;
  fetch(url)
    .then((res) => {
      if (!res.ok) {
        renderError(`Something went wrong : ${res.status}`);
        throw new Error();
      }

      return res.json();
    })
    .then((data) => renderCountries(data))
    .catch((err) => console.log(err));
};

//!after fetching country by name  use the data with function
const renderCountries = (data) => {
//   console.log(data);

  const countryDiv = document.querySelector(".countries");
  const {capital, currencies, flags: { svg }, languages, name: { common }, region, maps:{googleMaps} } = data[0];

//   console.log(Object.values(currencies)[0]);

  countryDiv.innerHTML = `
        <div class="card mx-auto m-3 shadow-lg" style="width: 18rem;">
            <img src="${svg}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${common}</h5>
                <p class="card-text">${region}</p>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">
                    <i class="fas fa-lg fa-landmark"></i> ${capital}
                </li>
                <li class="list-group-item">
                    <i class="fa-solid fa-comments"></i> ${Object.values(
                      languages
                    )}
                </li>
                <li class="list-group-item">
                    <i class="fas fa-lg fa-money-bill-wave"></i> ${Object.values(
                      currencies
                    ).map((item) => Object.values(item) + " ")}
                </li>
            </ul>
            <div class="card-body text-center">
                <a href="${googleMaps}" target="_blank" class="card-link btn btn-danger">Google Maps</a>
                
            </div>
       </div>`;
};

const renderError = (err) => {
    formSelect.style.display = "none";
  const countryDiv = document.querySelector(".countries");
  countryDiv.innerHTML = `<h2>${err}</h2>
                            <img src="./img/404.png" alt=""/>`;
  
};


