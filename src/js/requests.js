import axios from 'axios'

const BASE_WEATHER_URL = 'https://api.openweathermap.org/data/2.5/onecall'
const BASE_GEOLOCATION_URL = 'http://api.openweathermap.org/geo/1.0/direct'
const API_KEY = '3820ef6fe8b3609b65a28b81357b8323'
const API_KEY_HEADER = 'appid'
const ADDITONAL_WEATHER_PARAMS = {
  exclude: 'minutes,alerts',
  units: 'metric'
}
const ADDITONAL_GEOLOCATION_PARAMS = {
  
}

async function axiosRequestBuilder(baseURL, method, params) {
  const config = {
    baseURL,
    method,
    params,
  }
  return await axios(config)
}

// OpenWeather
// gets current weather + hourly updates
async function getWeatherForecast(lat, lon) {
  return await axiosRequestBuilder(BASE_WEATHER_URL, 'get', {
    lon,
    lat,
    ...ADDITONAL_WEATHER_PARAMS,
    [API_KEY_HEADER]: API_KEY,
  })
    .then((response) => response)
    .catch((err) => alert(err))
}

// Geolocation
// gets city name and returns longitude and latitude
async function getCoordinatesFromCityName(cityName) {
  const coords = await axiosRequestBuilder(BASE_GEOLOCATION_URL, 'get', {
    q: cityName,
    ...ADDITONAL_GEOLOCATION_PARAMS,
    [API_KEY_HEADER]: API_KEY,
  })
  .then((response) => response)
  .catch((err) => alert(err))
  return coords
}

export { getWeatherForecast, getCoordinatesFromCityName }
