$(document).ready(function () {
  const apiKey = "4537dd19b6f507cd19a6413a72acfcac"; 

  $("#getWeather").click(function () {
    const city = $("#city").val();
    if (city === "") return alert("Please enter a city name!");
    fetchWeather(city);
  });

  $("#getLocationWeather").click(function () {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      alert("Geolocation not supported by this browser.");
    }
  });

  function success(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    getData(url);
  }

  function error() {
    alert("Unable to access your location. Please allow permissions.");
  }

  function fetchWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    getData(url);
  }

  function getData(url) {
    $.ajax({
      url: url,
      type: "GET",
      dataType: "json",
      success: function (data) {
        $("#cityName").text(`${data.name}, ${data.sys.country}`);
        $("#temperature").text(`${Math.round(data.main.temp)}°C`);
        $("#description").text(data.weather[0].description);
        $("#date").text(new Date().toDateString());

        const iconCode = data.weather[0].icon;
        $("#weatherIcon").attr("src", `https://openweathermap.org/img/wn/${iconCode}@2x.png`);

        const mainWeather = data.weather[0].main.toLowerCase();
        const bg = $("#bg-animation");

        if (mainWeather.includes("clear")) {
          bg.removeClass().addClass("background-animation sunny");
        } else if (mainWeather.includes("cloud")) {
          bg.removeClass().addClass("background-animation cloudy");
        } else if (mainWeather.includes("rain")) {
          bg.removeClass().addClass("background-animation rainy");
        } else if (mainWeather.includes("snow")) {
          bg.removeClass().addClass("background-animation snowy");
        } else if (mainWeather.includes("night")) {
          bg.removeClass().addClass("background-animation night");
        } else {
          bg.removeClass().addClass("background-animation sunny");
        }
      },
      error: function () {
        alert("Unable to fetch weather data!");
      },
    });
  }
});
