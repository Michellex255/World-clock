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
}
updateTime();
