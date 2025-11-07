function updateTime() {
  
  document.querySelectorAll(".city").forEach((cityElement) => {
    let cityId = cityElement.getAttribute("id");
    let timeZone = cityElement.dataset.tz || getTimeZone(cityId);

    if (!timeZone) return;

    let cityTime = moment().tz(timeZone);
    cityElement.querySelector(".date").innerHTML = cityTime.format("MMMM Do YYYY");
    cityElement.querySelector(".time").innerHTML = cityTime.format("h:mm:ss [<small>]A[</small>]");
  });
}


function getTimeZone(cityId) {
  const zones = {
    johannesburg: "Africa/Johannesburg",
    london: "Europe/London",
    berlin: "Europe/Berlin",
    "sao-paulo": "America/Sao_Paulo",
    auckland: "Pacific/Auckland",
  };
  return zones[cityId];
}

function updateCity(event) {
  let cityTimeZone = event.target.value;
  if (!cityTimeZone) return;

  let cityName = cityTimeZone.replace("_", " ").split("/")[1];
  let citiesContainer = document.querySelector("#cities");


  if (document.querySelector(`[data-tz="${cityTimeZone}"]`)) {
    alert(`${cityName} is already displayed.`);
    return;
  }

 
  let cityElement = document.createElement("div");
  cityElement.classList.add("city");
  cityElement.dataset.tz = cityTimeZone;
  cityElement.innerHTML = `
    <div>
      <h2>${cityName}</h2>
      <div class="date"></div>
    </div>
    <div class="time"></div>
  `;
  citiesContainer.appendChild(cityElement);

 
  updateTime();
}


updateTime();
setInterval(updateTime, 1000);


let citySelect = document.querySelector("#city");
citySelect.addEventListener("change", updateCity);
