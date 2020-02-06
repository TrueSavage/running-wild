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


let browserGeolocation = ''

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
  let collapsibleInstances = M.Collapsible.init(elems, {});

});

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
      console.log(categories)
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



document.getElementById('search').addEventListener('click', event => {
  event.preventDefault()
  let city = document.getElementById('cityName').value

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



