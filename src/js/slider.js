import {generateHourString} from './utils'

// Keeps track of which slide is displaying
let slideIndex = 1

// goes back a slide
function getPrevSlide() {
  slideIndex -= 1
  console.log(slideIndex)
  showSlides(slideIndex)
}

// goes to next slide
function getNextSlide() {
  slideIndex += 1
  showSlides(slideIndex)
}

// decides what slide shows based on 'n'
function showSlides(newSlideIndex) {
  //   get all dots
  let dots = document.getElementsByClassName('dot')
  let slides = document.getElementsByClassName('slide')

  if (newSlideIndex > slides.length) {
    newSlideIndex = 1
  }

  if (newSlideIndex < 1) {
    newSlideIndex = slides.length
  }

  slideIndex = newSlideIndex

  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = 'none'
  }

  slides[newSlideIndex - 1].style.display = 'flex'

  for (let i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(' active', '')
  }

  slides[newSlideIndex - 1].style.display = 'flex'
  dots[newSlideIndex - 1].className += ' active'
}

function generateForeCastContainer(hourlyWeatherData, limit, parent) {
  // iterates based on number of forecasts each slide should have
  for (let i = 0; i < limit; i++) {
    const hourlyForecastContainer = document.createElement('div')
    hourlyForecastContainer.classList.add('hourly-forecast-container')
    const hourlyForecastTime = document.createElement('div')
    hourlyForecastTime.classList.add('hourly-forecast-time')
    hourlyForecastTime.innerHTML = `${generateHourString(
      hourlyWeatherData[i].dt
    )}`
    const hourlyForecastDegrees = document.createElement('div')
    hourlyForecastDegrees.classList.add('hourly-forecast-degrees')
    hourlyForecastDegrees.innerHTML = `${hourlyWeatherData[i].temp.toFixed(
      1
    )} &#8451`
    hourlyForecastContainer.appendChild(hourlyForecastTime)
    hourlyForecastContainer.appendChild(hourlyForecastDegrees)
    parent.appendChild(hourlyForecastContainer)
  }
}

function generateSlideHTML(weatherData, limit, iterations, parent) {
  // Iterates based on how many slides are required
  for (let i = 1; i <= iterations; i++) {
    const slide = document.createElement('div')
    slide.classList.add('slide')
    slide.classList.add('fade')
    const start = (i - 1) * limit
    const finish = (i - 1) * limit + iterations * 2
    console.log(start, finish)
    generateForeCastContainer(weatherData.slice(start + 1, finish + 1), limit, slide)
    parent.appendChild(slide)
  }
}

export { getNextSlide, getPrevSlide, generateSlideHTML }
