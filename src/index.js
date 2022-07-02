import _ from 'lodash'
import './css/style.css'
import { getCoordinatesFromCityName, getWeatherForecast } from './js/requests'
import {
  generateLocationString,
  getDateString,
  clearChildrenFromNode,
} from './js/utils'
import { getNextSlide, getPrevSlide, generateSlideHTML } from './js/slider'

// get elements from the DOM
const CONTAINER = document.querySelector('.container')
const DEGREES = document.querySelector('.degrees')
const LOCATION = document.querySelector('#location')
const DATE = document.querySelector('.todays-date')
const SLIDING_CONTAINER = document.querySelector('.sliding-container')
const INPUT = document.getElementById('location-input')
const NEXT = document.querySelector('.next')
const PREV = document.querySelector('.prev')
const DOTS = document.querySelectorAll('.dot')
const MAG_GLASS = document.querySelector('#mag-glass')

CONTAINER.style.display = 'none'

// onload: get user's location and submit

const buildDashboard = async (city) => {
  // hides main container until data is loaded
  CONTAINER.style.display = 'none'
  // Clears current slides
  clearChildrenFromNode(SLIDING_CONTAINER)
  // Get current date/time and add to dashbaord
  // document.querySelector('.container').style.display = "none"
  // const city = prompt("What is your city?")
  const now = Date.now()
  DATE.innerHTML = getDateString(now)

  // Get City Coordinates and add location to dashboard
  // TODO: if city not in local storage, ask user
  const cityRaw = await getCoordinatesFromCityName(city)
  try {
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
    CONTAINER.style.display = 'block'
  } catch (error) {
    console.log(error)
  }
}

const getUserInput = (e) => {
  const userInput = INPUT.value
  if (!/^[a-zA-Z]+$/.test(userInput)) {
    alert('Error: City can not have a number in the name')
    return
  }
  localStorage.setItem('city', userInput.toLowerCase())
  buildDashboard(userInput.toLowerCase())
  INPUT.value = ''
}

// Event Listeners
NEXT.addEventListener('click', getNextSlide)
PREV.addEventListener('click', getPrevSlide)
MAG_GLASS.addEventListener('click', getUserInput)


buildDashboard('london')