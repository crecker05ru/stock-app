export const debounce = (fn, delay = 300) => {
  let timeout
  return function (...args) {
    if (timeout) clearTimeout(timeout)
    const context = this
    timeout = setTimeout(() => fn.apply(context, args), delay)
  }
}

export const debounceArrow = (callback, wait = 300) => {
  let timeoutId = null
  return (...args) => {
    window.clearTimeout(timeoutId)
    timeoutId = window.setTimeout(() => {
      callback.apply(null, args)
    }, wait)
  }
}

export async function asyncDebounce(fn, delay = 300) {
  let timer
  return function (...args) {
    clearTimeout(timer)
    timer = setTimeout(() => fn.apply(this, args), delay)
  }
}
