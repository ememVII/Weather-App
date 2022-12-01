// Today
const today = document.getElementById('today')
const todayDate = document.getElementById('todayDate')
const cityLocation = document.getElementById('cityLocation')
const todayIcon = document.getElementById('todayIcon')
const todayTemp = document.getElementById('todayTemp')
const todayDescription = document.getElementById('todayDescription')
const humdity = document.getElementById('humdity')
const wind = document.getElementById('wind')
const compass = document.getElementById('compass')
// NextDays
const nextDay = document.querySelectorAll('.nextDay')
const nextDayIcon = document.querySelectorAll('.nextDayIcon')
const nextDayMaxTemp = document.querySelectorAll('.nextDayMaxTemp')
const nextDayMinTemp = document.querySelectorAll('.nextDayMinTemp')
const nextDayDescription = document.querySelectorAll('.nextDayDescription')
// SearchBar
const search = document.getElementById('search')
// API
let apiResponese
let responseData
// CreateDaysAndMonths Arrays
let days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
]
let months = [
  'Jan',
  'Feb',
  'March',
  'April',
  'May',
  'June',
  'July',
  'Aug',
  'Spet',
  'Oct',
  'Nov',
  'Dec',
]

async function getWeatherData(currentCity = 'cairo') {
  apiResponese = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=51f98e4d9fb64934b1275415220106&q=${currentCity}&days=7`
  )
  responseData = await apiResponese.json()
  console.log(responseData)
  displayTodayWeather()
  displayNextDayWeather()
  // detectImage()
}
getWeatherData()

function displayTodayWeather() {
  let date = new Date()
  today.innerHTML = days[date.getDay()]
  todayDate.innerHTML = `${date.getDate()} ${months[date.getMonth()]}`
  cityLocation.innerHTML = responseData.location.name
  todayIcon.setAttribute('src', `https:${responseData.current.condition.icon}`)
  todayTemp.innerHTML = `${responseData.current.temp_c} &#176;C`
  todayDescription.innerHTML = responseData.current.condition.text
  humdity.innerHTML = responseData.current.humidity
  wind.innerHTML = responseData.current.wind_kph
  compass.innerHTML = responseData.current.wind_dir

  // TEST Images
  //     todayCondition = responseData.current.condition.text
  //     if(todayCondition == 'Sunny') {
  //         todayCard.style.backgroundImage = `url(../images/sunny.jpg)`
  //     } else if(todayCondition == 'Partly cloudy' || todayCondition == "Cloudy") {
  //         todayCard.style.backgroundImage = `url(../images/cloudy.jpg)`
  //     } else if(todayCondition == 'Patchy rain possible' || todayCondition == 'Heavy rain' || todayCondition == 'Moderate rain' || todayCondition == 'Moderate or heavy rain shower' || todayCondition == 'Thundery outbreaks possible') {
  //         todayCard.style.backgroundImage = `url(../images/patchyrain.jpg)`
  //     } else if(todayCondition == 'Clear') {
  //         todayCard.style.backgroundImage = `url(../images/clear.jpg)`
  //     }
  // }

  // todayCard = document.getElementById('todayCard')
  // tomorrowCard = document.getElementById('tomorrowCard')
  // afterTomorrowCard = document.getElementById('afterTomorrowCard')
}

function displayNextDayWeather() {
  for (let i = 0; i < nextDay.length; i++) {
    nextDay[i].innerHTML =
      days[new Date(responseData.forecast.forecastday[i + 1].date).getDay()]
    nextDayIcon[i].setAttribute(
      'src',
      `https:${responseData.forecast.forecastday[i + 1].day.condition.icon}`
    )
    nextDayMaxTemp[i].innerHTML = `${
      responseData.forecast.forecastday[i + 1].day.maxtemp_c
    } &#176;C`
    nextDayMinTemp[i].innerHTML = `${
      responseData.forecast.forecastday[i + 1].day.mintemp_c
    } &#176;C`
    nextDayDescription[i].innerHTML = `${
      responseData.forecast.forecastday[i + 1].day.condition.text
    }`
  }

  //     dayCondition = responseData.forecast.forecastday[i+1].day.condition.text

  //     if(dayCondition == 'Sunny') {
  //         tomorrowCard.style.backgroundImage = `url(../images/sunny.jpg)`
  //         afterTomorrowCard.style.backgroundImage = `url(../images/sunny.jpg)`
  //     } else if(dayCondition == 'Partly cloudy' || dayCondition == "Cloudy") {
  //         tomorrowCard.style.backgroundImage = `url(../images/cloudy.jpg)`
  //         afterTomorrowCard.style.backgroundImage = `url(../images/cloudy.jpg)`
  //     } else if(dayCondition == 'Patchy rain possible' || dayCondition == 'Heavy rain' || dayCondition == 'Moderate rain') {
  //         tomorrowCard.style.backgroundImage = `url(../images/patchyrain.jpg)`
  //         afterTomorrowCard.style.backgroundImage = `url(../images/patchyrain.jpg)`
  //     } else if(dayCondition == 'Clear') {
  //         tomorrowCard.style.backgroundImage = `url(../images/clear.jpg)`
  //         afterTomorrowCard.style.backgroundImage = `url(../images/clear.jpg)`
  //     }
  // }
}

search.addEventListener('input', function () {
  currentCity = search.value
  getWeatherData(currentCity)
})

// function detectImage() {
//     if(responseData.current.condition.text == 'Sunny' || responseData.forecast.forecastday[i+1].day.condition.text == 'Sunny') {
//         todayCard.style.backgroundImage = `url(../images/rainy.jpg)`
//     } else {
//         todayCard.style.backgroundImage = `url(../images/image01.jpg)`
//     }
// }
