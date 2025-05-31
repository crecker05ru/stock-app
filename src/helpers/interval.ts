export function intervalPromise(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

export function intervalCallback(cb: () => any, ms) {
  return new Promise((resolve) => {
    setTimeout(resolve(cb), ms)
  })
}
