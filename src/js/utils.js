import { countries } from './countries'

const DAYS_OF_THE_WEEK = {
  0: 'Sunday',
  1: 'Monday',
  2: 'Tuesday',
  3: 'Wednesday',
  4: 'Thursday',
  5: 'Friday',
  6: 'Saturday',
}

const MONTHS = {
  1: 'January',
  2: 'February',
  3: 'March',
  4: 'April',
  5: 'May',
  6: 'June',
  7: 'July',
  8: 'August',
  9: 'September',
  10: 'October',
  11: 'November',
  12: 'December',
}

// getDateStringFromMs
export function getDateString(dt, isUnix) {
  let date
  if (isUnix) {
    date = new Date(dt * 1000)
  } else {
    date = new Date(dt)
  }
  return `${DAYS_OF_THE_WEEK[date.getDay()]}, ${date.getDate()} ${
    MONTHS[date.getMonth() + 1]
  } ${date.getFullYear()}`
}

export function generateHourString(dt) {
  const hours = new Date(dt * 1000).getHours()

  if (hours === 0) {
    return '12 am'
  } else if (hours > 0 && hours < 12) {
    return `${hours} am`
  } else if (hours == 12) {
    return '12 pm'
  } else if (hours > 12 && hours < 24) {
    return `${hours - 12} pm`
  }
}

export function generateLocationString(city, countryCode) {
  const country = countries.filter((country) => country.code === countryCode)[0]
    .name

  return `${city}, ${country}`
}

export function clearChildrenFromNode(parent) {
  parent.innerHTML = ''
  return
}

export function getUserInput(inputElement) {
  const numericRegex = /^[0-9]+$/;
  const userInput = inputElement.value
  if (userInput.match(numericRegex)) {
    throw new Error("City Name Can't Contain a Number")
  }
  inputElement.value = ''
  return userInput.toLowerCase()
}
