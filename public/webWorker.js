console.log('Web worker')

onmessage = function (e) {
  // Слушаем сообщения из основного потока
  if (e.data.message === 'connect webworker') {
    // Отправляем сообщение из воркера в основной поток
    postMessage('Webworker connected')
  }
}
