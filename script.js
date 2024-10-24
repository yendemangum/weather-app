let searchTerm;
const form = document.querySelector("form");
const input = document.querySelector("input");
const container = document.querySelector(".container");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  searchTerm = input.value;

  fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${searchTerm}?key=HBMVUK6PBW5CJPS6A3XD8YWJF`,
    { mode: "cors" }
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      const location = document.createElement("p");
      location.setAttribute("class", "para");
      location.textContent = response.resolvedAddress;
      container.appendChild(location);
      for (let i = 0; i < 5; i++) {
        const day = document.createElement("div");
        const img = document.createElement("img");
        function setImage() {
          switch (response.days[i].conditions) {
            case "Rain, Overcast":
              img.src = "weather-pouring.svg";
              break;
              case "Rain, Partially cloudy":
                img.src = "weather-pouring.svg";
                break;  
            case "Overcast":
              img.src = "weather-cloudy.svg";
              break;
            case "Clear":
              img.src = "weather-sunny.svg";
              break;
            case "Partially cloudy":
              img.src = "weather-partly-cloudy.svg";
              break;
          }
        }
        setImage();
        day.setAttribute("class", "day " + i);
        const date = response.days[i].datetime
        day.textContent = `Date: ${new Date(date).toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"})}
          Conditions: ${response.days[i].conditions}
          High: ${response.days[i].tempmax}
          Low: ${response.days[i].tempmin}`;
        day.appendChild(img);
        container.appendChild(day);
      }
    });
});
