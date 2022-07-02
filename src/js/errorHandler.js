export function handleInputError(message, target) {
  target.innerHTML = message
  target.classList.remove('hide')
}

export function clearInputError(target) {
  target.innerHTML = ""
  target.classList.add('hide')
}