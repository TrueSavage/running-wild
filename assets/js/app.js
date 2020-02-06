const fourSQClientID = 'CRSKEDVVUMFVQG4DEUTMNL1PXPXIRZ33GX4HS43AJHRDLZI5'
const fourSQclientSecret = 'OUCMLRN5AMDOO1UIATTFQVZYBVYCWYV53OLM54N0ERO25OUM'
const fourSQbaseURL = 'https://api.foursquare.com/'
const fourSQVenuePath = 'v2/venues/'
const fourSQPathCat = '/categories?'
const urlFourSQClientInfo = `client_id=${fourSQClientID}&client_secret=${fourSQclientSecret}&v=20200203`

const fourSQMainURL = fourSQbaseURL + fourSQVenuePath

const activityArtsAndEntertainmentId = '4d4b7104d754a06370d81259'
const activityEventId = '4d4b7105d754a06373d81259'
const activityShopAndService = '4d4b7105d754a06378d81259'
const activityOutdoorsAndRecreation = '4d4b7105d754a06377d81259'
const foodSection = '4d4b7105d754a06374d81259'
const travelAndTransport = '4d4b7105d754a06379d81259'

const fourSQCatURL = fourSQMainURL + fourSQPathCat + `id=${activityArtsAndEntertainmentId}&` + urlFourSQClientInfo

let fiveDayForecast
let fiveDay = []
let browserGeolocation = ''
let geoCode = ''
const fourSQGeo = () => {
  if (navigator.geolocation) {
    navigator.geolocation.watchPosition(fourSQGeoStore)
  } else {
    //Defaults to Irvine
    browserGeolocation = '33.68687203696294,-117.788172854784'
  }
}
const fourSQGeoStore = () => {
  browserGeolocation = `${position.coords.latitude},${position.coords.longitude}`
}

document.addEventListener('DOMContentLoaded', function () {
  let elems = document.querySelectorAll('.dropdown-trigger');
  let instances = M.Dropdown.init(elems, {});

  let select = document.querySelectorAll('select');
  let selectInstances = M.FormSelect.init(select, {});
  let collapsible = document.querySelectorAll('.collapsible');
  let collapsibleInstances = M.Collapsible.init(collapsible, {});

  var dateChooser = document.querySelectorAll('.datepicker');
  var dateInstances = M.Datepicker.init(dateChooser, {});


});

const searchItems = () => {

  let rad = document.getElementById('dpnRadius').value
  let categoryId = document.getElementById('mFoodOptions').value
  let category = '&categoryId=' + categoryId
  let searchURL = fourSQMainURL + 'search?near=' + geoCode + category + rad + '&' + urlFourSQClientInfo
}

const getDropDowns = () => {
  fetch(fourSQCatURL)
    .then(r => r.json())
    .then(data => {
      let selectArtsAndEntertainment = document.getElementById('mArtsAndEntertainment')

      let selectEvents = document.getElementById('mEvents')
      let selectShopAndService = document.getElementById('mShopAndService')
      let selectOutdoorsAndRecreation = document.getElementById('mOutdoorsAndRecreation')
      let selectFoodOptions = document.getElementById('mFoodOptions')
      let selectTravelAndTransport = document.getElementById('mTravelAndTransport')

      let { response: anotherResponse } = data
      let { categories } = anotherResponse

      categories.forEach((element) => {
        switch (element.id) {
          case activityArtsAndEntertainmentId:
            // let valueId = 0
            // let categoryArray = element.categories.slice();
            // categoryArray.forEach((item) => {
            //   let option = document.createElement('option')
            //   option.textContent = item.name
            //   option.id = item.id
            //   option.value = item.id
            //   valueId++
            //   selectArtsAndEntertainment.append(option)
            // })
            appendToMaterialSelect(element, selectArtsAndEntertainment)
            break
          case activityEventId:
            appendToMaterialSelect(element, selectEvents)
            break
          case activityShopAndService:
            appendToMaterialSelect(element, selectShopAndService)
            break
          case activityOutdoorsAndRecreation:
            appendToMaterialSelect(element, selectOutdoorsAndRecreation)
            break
          case foodSection:
            appendToMaterialSelect(element, selectFoodOptions)
            break
          case travelAndTransport:
            appendToMaterialSelect(element, selectTravelAndTransport)
            break
        }
      })
      let select = document.querySelectorAll('select');
      let selectInstances = M.FormSelect.init(select, {});
      // categories.forEach((element) => {
      //   let { name, pluralName, shortName, icon } = element
      // })

    })
    .catch(e => console.error(e))
}

const appendToMaterialSelect = (element, dropdown) => {
  let valueId = 0
  let categoryArray = element.categories.slice();
  categoryArray.forEach((item) => {
    let option = document.createElement('option')
    option.textContent = item.name
    option.id = item.id
    option.value = item.id
    valueId++
    dropdown.append(option)
  })
}
getDropDowns()



//This is based off passing through a venue object from 4 square
const createVenueCard = (venueItem) => {
  let { id, name, location, categories, referralId, hasPerk } = venueItem

  let { address, city, state, postalCode, country } = location

  let venueCard = document.createElement('div')
  venueCard.innerHTML =
    `  <div class="row">
       <div class="col s12 m6">
      <div class="card blue-grey darken-1">
        <div class="card-content white-text">
          <span class="card-title">${name}</span>
          address: ${address}<br>
          city: ${city}<br>
          state:${state}<br>
          zip: ${postalCode}<br>
          country: ${country}
        </div>        
      </div>
    </div>
  </div>
`
  return venueCard
}

const searchByCity = (city, urlWeather) => {
  fetch(urlWeather)
    .then(r => r.json())
    .then(response => {
      let { coord, weather, base, main, visibility, wind, clouds, dt, sys, timezone, id, name, cod } = response
      geoCode = `${coord.lat},${coord.lon}`
      getFiveDayForecastByCity(coord.lat, coord.lon)
    })
    .catch(e => { console.error(e) })

}
const getFiveDayForecastByCity = (lat, long) => {
  let forecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=3c181a9afca27b382c5754bb9706b06f`
  fetch(forecastURL)
    .then(r => r.json())
    .then(response => {

      if (response !== undefined || response != null) {
        fiveDayForecast = response
        displayForecast()
      }
    })
    .catch(e => { console.error(e) })

}

const displayForecast = () => {
  if (fiveDayForecast !== undefined) {
    fiveDay = []
    let { list: items } = fiveDayForecast
    for (let i = 0; i < items.length; i++) {
      let dayTime = items[i].dt_txt
      let currentHour = moment(dayTime).format('HH')
      // since its a 5 day hourly forecast we will look at the weather at 12noon

      if (currentHour === '12') {
        fiveDay.push(items[i])
      }

    }
    let container = document.getElementById
      ('weather')
    container.innerHTML = ""

    let cardHTML = "<div class='forecastLabel'>5-day forecast</div>: <br>"
    for (let j = 0; j < fiveDay.length; j++) {
      let newCard = renderForecastCard(fiveDay[j])
      cardHTML += newCard.innerHTML
    }
    container.innerHTML = cardHTML
  }
}

const renderForecastCard = (cardData) => {
  let newForecastCard = document.createElement('div')

  let { dt, main, weather, clouds, wind, sys, dt_txt } = cardData
  let forecastDay = moment(dt_txt).format('MM/DD/YYYY')

  newForecastCard.innerHTML = `<div class="card forecastCard">
  <div class="card-body">
  <div class="card-title"><h4>${forecastDay}  </h4> <img src='https://openweathermap.org/img/wn/${weather[0].icon}@2x.png'> </div>
      <br> Temperature: ${main.temp} &#8457;
      <br>Humidity: ${main.humidity}% 
      <br>Wind Speed: ${wind.speed} MPH 
      </div>
      </div>`
  return newForecastCard
}


document.getElementById('search').addEventListener('click', event => {
  event.preventDefault()
  let city = document.getElementById('cityName').value
  let urlWeather = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=3c181a9afca27b382c5754bb9706b06f`
  searchByCity(city, urlWeather)

  searchItems()
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



