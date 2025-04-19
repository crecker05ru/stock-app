export function debounce (cb, delay = 300){
  let timer
  return (...args){
    clearTimeout(timer)
    timer = setTimeout(() => {
      cb.aplly(this,args)
    }, delay);
  }
}

export function intervalPromise(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
