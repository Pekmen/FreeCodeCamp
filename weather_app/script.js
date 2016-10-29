$(document).ready(function() {

  var cityOutput = $("#city");
  var weatherOutput = $("#weather");
  var windOutput = $("#wind");
  var tempOutput = $("#temp");
  var humidityOutput = $("#humidity");
  var pressureOutput = $("#pressure");
  var maxTempOutput = $("#max-temp");
  var minTempOutput = $("#min-temp");
  var icon = $("#icon");
  var windSpeedOutput = $("#wind-speed");
  var windUnitsOutput = $("#wind-units");
  var windDirectionOutput = $("#rose");
  var windCompass = $(".windCompass");
  var tempUnitsOutputs = $(".units");
  var otherTempUnitsOutput = $("#other-units");
  var apiKey = '95c0da2760e680d8b27bcb6b20585631'; // this is bad practice

  $.get("http://ip-api.com/json", function(location) {
    var units = getCountryUnits(location.countryCode);
    cityOutput.text(location.city + ', ' + location.regionName);
    showWeatherInfo(location.lat, location.lon, units);
  });

  function showWeatherInfo(lat, lon, units) {
    var weatherUrl = 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + "&units=" + units + "&APPID=" + apiKey;

    $.get(weatherUrl, function(weather) {
      console.log(weather);
      var tempUnits = getTemperatureUnits(units);
      var otherUnits = getOtherTempUnits(units);

      tempOutput.text(weather.main.temp.toFixed(1));
      weatherOutput.text(weather.weather[0].description);
      humidityOutput.text(weather.main.humidity + "%");
      pressureOutput.text(weather.main.pressure + " hPa");
      maxTempOutput.text(weather.main.temp_max);
      minTempOutput.text(weather.main.temp_min);
      tempUnitsOutputs.text(tempUnits);
      otherTempUnitsOutput.text(otherUnits);
      icon.attr("src", "http://openweathermap.org/img/w/" + weather.weather[0].icon + ".png")

      var deg = weather.wind.deg;
      var windDir = getWindDirection(deg);
      windSpeedOutput.text(weather.wind.speed);
      windDirectionOutput.text(windDir);
      rotate($(".wind-circle"), deg);

      $("#toggle-units").click(toggleUnits);
      setBackground(weather.weather[0].id);
    });
  }

  function getCountryUnits(country) {
    var imperialCountries = ['US', 'BS', 'BZ', 'KY', 'PW'];
    if (imperialCountries.indexOf(country) === -1) {
      return ("metric");
    } else {
      return ("imperial");
    }
  }

  function getTemperatureUnits(units) {
    if (units == "imperial") {
      return (" °F");
    } else {
      return (" °C");
    }
  }

  function getOtherTempUnits(units) {
    if (units == "imperial") {
      return (" °C");
    } else {
      return (" °F");
    }
  }

  function toggleUnits() {
    var temp = parseFloat(tempOutput.text());
    var max_temp = parseFloat(minTempOutput.text());
    var min_temp = parseFloat(maxTempOutput.text());

    if (otherTempUnitsOutput.text() == " °C") {
      tempOutput.text(fahrToCels(temp));
      maxTempOutput.text(fahrToCels(max_temp));
      minTempOutput.text(fahrToCels(min_temp));
      tempUnitsOutputs.text(" °C")
      otherTempUnitsOutput.text(" °F");
    } else {
      tempOutput.text(celsToFahr(temp));
      maxTempOutput.text(celsToFahr(max_temp));
      minTempOutput.text(celsToFahr(min_temp));
      tempUnitsOutputs.text(" °F")
      otherTempUnitsOutput.text(" °C");
    }
  }

  function fahrToCels(n) {
    return ((n - 32) * 5 / 9).toFixed(1);
  }

  function celsToFahr(n) {
    return (n * 9 / 5 + 32).toFixed(1);
  }

  function getWindDirection(deg) {
    var compass = ["N", "NE", "E", "SE", "S", "SW", "W", "NW", "N"];
    return compass[Math.floor((deg + 22.5) / 45)];
  }

  function rotate(elem, deg) {
    elem.css("transform", "rotate(" + deg + "deg)");
  }

  function setBackground(weatherID) {
    console.log("setting bg");
    // Clouds
    if (weatherID > 800) {
      if (weatherID == 801) {
        applyBackground("https://s12.postimg.org/ram4nsy4d/sky_414198_1280.jpg");
      } else if (weatherID == 802) {
        applyBackground("http://s30.postimg.org/kmjgkg6zl/blue_sky_and_clouds_1011155_1280.jpg");
      } else if (weatherID == 803) {
        applyBackground("http://s23.postimg.org/4069fg023/clouds_210547_1280.jpg");
      } else if (weatherID == 804) {
        applyBackground("http://s14.postimg.org/tv0ymrc41/mountain_983962_1280.jpg");
      }
    }

    // Clear sky
    else if (weatherID == 800) {
      applyBackground("http://s11.postimg.org/nht095gj7/sky_background_1077084_1280.jpg");
    }

    // Fog, mist and like
    else if (weatherID >= 700) {
      applyBackground("http://s17.postimg.org/46dw7p34v/fog_571786_1280.jpg");
    }

    // Snow
    else if (weatherID >= 600) {
      applyBackground("http://s11.postimg.org/5y9m4y1gz/winter_20234_1280.jpg");
    }

    // Rain
    else if (weatherID >= 300) {
      if (weatherID <= 511 && weatherID >= 500) {
        applyBackground("http://s29.postimg.org/axy8zseif/raindrops_828954_1280.jpg");
      } else {
        applyBackground("http://s27.postimg.org/xehiuwycz/raining_828890_1280.jpg");
      }
    }

    // Thunderstorm
    else if (weatherID >= 200) {
      applyBackground("http://s1.postimg.org/4wfuvm3an/clouds_504961_1280.jpg");
    } else {
      applyBackground("http://s9.postimg.org/8kcmxf5r3/sky_176490_1280.jpg");
    }
  }

  function applyBackground(url) {
    $("body").css("background", "url(" + url + ") no-repeat fixed center");
    $("body").css("background-size", "cover");
  }
});