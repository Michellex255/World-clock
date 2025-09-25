setInterval(updateTime, 1000);

function updateTime() {
  let sydneyElement = document.querySelector("#sydney");
  let sydneyDateElement = sydneyElement.querySelector(".date");
  let sydneyTimeElement = sydneyElement.querySelector(".time");
  let sydneytime = moment().tz("Australia/Sydney");

  sydneyDateElement.innerHTML = sydneytime.format("MMMM Do YYYY");
  sydneyTimeElement.innerHTML = sydneytime.format(
    "h:mm:ss [<small>]A[</small>]"
  );

  let londonElement = document.querySelector("#london");
  let londonDateElement = londonElement.querySelector(".date");
  let londonTimeElement = londonElement.querySelector(".time");
  let londontime = moment().tz("Europe/London");
  londonDateElement.innerHTML = londontime.format("MMMM Do YYYY");
  londonTimeElement.innerHTML = londontime.format(
    "h:mm:ss [<small>]A[</small>]"
  );

  let newYorkElement = document.querySelector("#new-york");
  let newYorkDateElement = newYorkElement.querySelector(".date");
  let newYorkTimeElement = newYorkElement.querySelector(".time");
  let newYorktime = moment().tz("America/New_York");
  newYorkDateElement.innerHTML = newYorktime.format("MMMM Do YYYY");
  newYorkTimeElement.innerHTML = newYorktime.format(
    "h:mm:ss [<small>]A[</small>]"
  );
}

function updateCity(event) {
  let cityTimeZone = event.target.value;

  let cityTime = moment().tz(cityTimeZone);
  let citiesElement = document.querySelector("#cities");
  citiesElement.innerHTML = `
  <div class="city">
  <div>
  <h2>${cityTimeZone.replace("_", " ").split("/")[1]}</h2>
  <div class="date">${cityTime.format("MMMM Do YYYY")}</div>
    </div>
    <div class="time">${cityTime.format("h:mm:ss")} <small>${cityTime.format(
    "A"
  )}</small></div></div>`;
}
updateTime();

let citiesSelect = document.querySelector("#city");
citiesSelect.addEventListener("change", updateCity);
