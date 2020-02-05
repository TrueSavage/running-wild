document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('.dropdown-trigger');
  var instances = M.Dropdown.init(elems);
  console.log('ping')
});

document.getElementById('search').addEventListener('click', event => {
  event.preventDefault()
  let city = document.getElementById('city-name').value
  console.log('ping')
  console.log(city)

  // let urlWeather = `http://api.openweathermap.org/data/2.5/weather?q=${city}&&units=imperial&APPID=3c181a9afca27b382c5754bb9706b06f`
  // fetch(urlWeather)
  //   .then(r => r.json())
  //   .then(weather => {
  //     //console.log(weather)
  //     document.getElementById('weather').textContent = Math.floor(weather.main.temp) + " " + String.fromCharCode(176) + "F"

  //   })
  //   .catch(e => console.error(e))


  let fiveDayForecast = `http://api.openweathermap.org/data/2.5/forecast?q=${city},us&units=imperial&APPID=3c181a9afca27b382c5754bb9706b06f`



  fetch(fiveDayForecast)
    .then(r => r.json())
    .then(forecast => {
      console.log(forecast)
      console.log(forecast.list[0])
    })



})



