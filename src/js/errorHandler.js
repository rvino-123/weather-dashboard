export function handleError(message, target) {
  target.innerHTML = message
  target.classList.remove('hide')
  setTimeout(() => {
    clearError(target)
  }, 3000);
}

function clearError(target) {
  target.innerHTML = ""
  target.classList.add('hide')
}