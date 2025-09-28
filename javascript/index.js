setInterval(updateTime, 1000);
let autoResetTimer = null;

function updateTime() {
  let sydneyElement = document.querySelector("#sydney");
  if (sydneyElement) {
    let sydneyDateElement = sydneyElement.querySelector(".date");
    let sydneyTimeElement = sydneyElement.querySelector(".time");
    let sydneytime = moment().tz("Australia/Sydney");

    sydneyDateElement.innerHTML = sydneytime.format("MMMM Do YYYY");
    sydneyTimeElement.innerHTML = sydneytime.format(
      "h:mm:ss [<small>]A[</small>]"
    );
  }

  let londonElement = document.querySelector("#london");
  if (londonElement) {
    let londonDateElement = londonElement.querySelector(".date");
    let londonTimeElement = londonElement.querySelector(".time");
    let londontime = moment().tz("Europe/London");
    londonDateElement.innerHTML = londontime.format("MMMM Do YYYY");
    londonTimeElement.innerHTML = londontime.format(
      "h:mm:ss [<small>]A[</small>]"
    );
  }

  let newYorkElement = document.querySelector("#new-york");
  if (newYorkElement) {
    let newYorkDateElement = newYorkElement.querySelector(".date");
    let newYorkTimeElement = newYorkElement.querySelector(".time");
    let newYorktime = moment().tz("America/New_York");
    newYorkDateElement.innerHTML = newYorktime.format("MMMM Do YYYY");
    newYorkTimeElement.innerHTML = newYorktime.format(
      "h:mm:ss [<small>]A[</small>]"
    );
  }
}

function highlightCountry(countryName) {
  console.log("Highlighting country:", countryName);

  removeAllHighlights();

  const countryPaths = document.querySelectorAll(`path.${countryName}`);
  console.log("Country paths found:", countryPaths.length);

  countryPaths.forEach((path) => {
    console.log("Highlighting path:", path);
    path.classList.add("country-highlight", "country-glow");
  });
}

function removeAllHighlights() {
  const allPaths = document.querySelectorAll("path.country-highlight");
  allPaths.forEach((path) => {
    path.classList.remove("country-highlight", "country-glow");
  });
}

function updateCity(event) {
  let cityTimeZone = event.target.value;
  if (cityTimeZone === "current") {
    cityTimeZone = moment.tz.guess();
  }

  if (cityTimeZone === "") {
    return;
  }

  let cityTime = moment().tz(cityTimeZone);
  let citiesElement = document.querySelector("#cities");

  const cityToCountry = {
    "America/New_York": "United.States.one",
    "Europe/London": "United.Kingdom",
    "Australia/Sydney": "Australia",
  };

  const countryName = cityToCountry[cityTimeZone];
  if (countryName) {
    highlightCountry(countryName);
  }

  citiesElement.innerHTML = `
    <div class="city">
      <div>
        <h2>${cityTimeZone.replace("_", " ").split("/")[1]}</h2>
        <div class="date">${cityTime.format("MMMM Do YYYY")}</div>
      </div>
      <div class="time">${cityTime.format("h:mm:ss")} <small>${cityTime.format(
    "A"
  )}</small></div>
    </div>
    <p class="instruction-text">Click anywhere to show all cities, or wait 10 seconds for autoreset</p>`;

  if (autoResetTimer) {
    clearTimeout(autoResetTimer);
  }

  autoResetTimer = setTimeout(() => {
    resetToAllCities();
  }, 10000);
}

function resetToAllCities() {
  let citiesElement = document.querySelector("#cities");
  let citiesSelect = document.querySelector("#city");

  removeAllHighlights();

  if (autoResetTimer) {
    clearTimeout(autoResetTimer);
    autoResetTimer = null;
  }

  citiesSelect.value = "";

  citiesElement.innerHTML = `
    <div class="city" id="new-york">
      <div>
        <h2>New York</h2> 
        <div class="date"></div>
      </div>
      <div class="time"></div>  
    </div>
    <div class="city" id="london">
      <div>
        <h2>London</h2>
        <div class="date"></div>
      </div>
      <div class="time"></div>  
    </div>
    <div class="city" id="sydney">
      <div>
        <h2>Sydney</h2>   
        <div class="date"></div>
      </div>
      <div class="time"></div>  
    </div>`;

  updateTime();
}

updateTime();

let citiesSelect = document.querySelector("#city");
citiesSelect.addEventListener("change", updateCity);

document.addEventListener("click", (e) => {
  if (e.target.id === "city" || e.target.tagName === "OPTION") {
    return;
  }

  if (document.querySelector("#city").value !== "") {
    resetToAllCities();
  }
});
