import _ from 'lodash'
import './css/style.css'
import { getCoordinatesFromCityName, getWeatherForecast } from './js/requests'
import {
  generateLocationString,
  getDateString,
  clearChildrenFromNode,
  getUserInput
} from './js/utils'
import { getNextSlide, getPrevSlide, generateSlideHTML } from './js/slider'
import { handleError  } from './js/errorHandler'

// get elements from the DOM
const CONTAINER_BODY = document.querySelector('.container-body')
const DEGREES = document.querySelector('.degrees')
const LOCATION = document.querySelector('#location')
const DATE = document.querySelector('.todays-date')
const SLIDING_CONTAINER = document.querySelector('.sliding-container')
const INPUT = document.getElementById('location-input')
const INPUT_ERROR = document.querySelector('.input-error-span')
const NEXT = document.querySelector('.next')
const PREV = document.querySelector('.prev')
const DOTS = document.querySelectorAll('.dot')
const MAG_GLASS = document.querySelector('#mag-glass')
const LOADER = document.querySelector('.loader')


// onload: get user's location and submit

const buildDashboard = async (city) => {
  // hides main container until data is loaded
  CONTAINER_BODY.style.display = 'none'
  LOADER.classList.remove('hide')
  // Clears current slides
  clearChildrenFromNode(SLIDING_CONTAINER)
  // Get current date/time and add to dashbaord
  // document.querySelector('.container').style.display = "none"
  // const city = prompt("What is your city?")
  const now = Date.now()
  DATE.innerHTML = getDateString(now)

  // Get City Coordinates and add location to dashboard
  const cityRaw = await getCoordinatesFromCityName(city)
  if (!cityRaw.data.length) {
    loadApp(localStorage.getItem('city'))
    handleError('Error: City Does Not Exist', INPUT_ERROR)
  }
  const { name, country, lat, lon } = cityRaw.data[0]
  const cityString = generateLocationString(name, country)
  LOCATION.innerHTML = cityString
  // TODO store location in local storage

  // Get local weather data from openweather API and add current temp to titantron
  const weatherDataRaw = await getWeatherForecast(lat, lon)
  const { current, hourly } = weatherDataRaw.data
  DEGREES.innerHTML = Math.round(current.temp * 10) / 10

  // generate HTML for the slider
  generateSlideHTML(hourly, 4, 2, SLIDING_CONTAINER)
  const slides = document.querySelectorAll('.slide')
  slides[1].style.display = 'none'
  DOTS[0].classList.add('active')
  // restores container once data has loaded
  LOADER.classList.add('hide')
  CONTAINER_BODY.style.display = 'flex'
  localStorage.setItem('city', city)
}

function handleSubmit() {
  try {
    const userInput = getUserInput(INPUT)
    loadApp(userInput)
    
  } catch (error) {
    handleError(error, INPUT_ERROR)
  }
}


// Event Listeners
NEXT.addEventListener('click', getNextSlide)
PREV.addEventListener('click', getPrevSlide)
MAG_GLASS.addEventListener('click', handleSubmit)
INPUT.addEventListener('keydown', (e) => {
  if (e.key.charCodeAt() === 69) {
    handleSubmit()
  }
})

// Starts App
function loadApp(city) {
  try {
    buildDashboard(city)
  } catch (error) {
    handleError(error, INPUT_ERROR)
  }
}

(function start() {
  let city = localStorage.getItem('city')
  if (!city) {
    city = 'london'
  }
  loadApp(city)
})()
