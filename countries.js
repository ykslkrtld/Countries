const selectCountry = document.querySelector("select");
const countries = document.querySelector(".countries");

const countryFunc = async () => {
  try {
    const res = await fetch("https://restcountries.com/v3/all");
    // console.log(res);
    if (!res.ok) {
      throw new Error(`${res.status}`);
    }
    const data = await res.json();
    // console.log(data);
    countriesList(data);
  } catch (error) {
    console.log(error);
  }
};

const countriesList = (countryData) => {
  countryData.forEach((item) => {
    let optionCountry = document.createElement("option");
    optionCountry.textContent = item.name.common;
    optionCountry.value = item.name.common;
    selectCountry.appendChild(optionCountry);
 
  selectCountry.addEventListener("change", (event) => {
    const selectedCountry = event.target.value;
    const selectedCountryData = countryData.find(country => country.name.common === selectedCountry);

    if(selectedCountryData){
      countries.innerHTML = `
        <div class="card" style="width: 20rem;">
          <img src="${selectedCountryData.flags[0]}" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title text-center fw-bold">${selectedCountryData.name.common}</h5>
          </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item"><span class="fw-bold">Region:</span> ${selectedCountryData.region || "None"}</li>
            <li class="list-group-item"><span class="fw-bold">Capital:</span> ${selectedCountryData.capital || "None"}</li>
            <li class="list-group-item"><span class="fw-bold">Languages:</span> ${Object.values(selectedCountryData.languages) || "None"}</li>
            <li class="list-group-item"><span class="fw-bold">Population:</span> ${selectedCountryData.population.toLocaleString() || "None"}  </li>
            <li class="list-group-item"><span class="fw-bold">Borders:</span> ${selectedCountryData.borders || "None"}</li>
            <li class="list-group-item"><span class="fw-bold">Map:</span> <a href="${selectedCountryData.maps.googleMaps || "None"}">Google Map</a></li>
          </ul>
          </div>
        `;
      }
});
});
};

countryFunc();