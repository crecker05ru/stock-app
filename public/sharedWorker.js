console.log('Shared worker')
let sum = 0

onconnect = (connect) => {
  const port = connect.ports[0] // В ports всегда один элемент

  port.onmessage = (event) => {
    sum += event
  }

  port.postMessage(sum)
}
