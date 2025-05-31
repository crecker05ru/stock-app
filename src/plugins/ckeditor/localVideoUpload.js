import { Plugin, Command, ButtonView, createElement, FileDialogButtonView } from 'ckeditor5'

export default class LocalVideoUpload extends Plugin {
  // static get requires() {
  //   return ['VideoInsertCommand'] // Регистрируем зависимость
  // }

  init() {
    const editor = this.editor
    // editor.commands.add('videoInsert', new VideoInsertCommand(editor))
    this._registerVideoInsertCommand(editor)
    // 1. Регистрация элемента video
    editor.model.schema.register('video', {
      isObject: true,
      allowWhere: '$block',
      allowAttributes: ['src', 'controls'],
    })

    // 2. Конвертеры
    editor.conversion.for('downcast').elementToElement({
      model: 'video',
      view: (modelElement, { writer }) => {
        const src = modelElement.getAttribute('src') || ''
        return writer.createEmptyElement('video', {
          src: src,
          controls: 'controls',
          style: 'max-width: 100%; height: auto;',
        })
      },
    })

    editor.conversion.for('upcast').elementToElement({
      view: {
        name: 'video',
        attributes: ['src', 'controls'],
      },
      model: (viewElement, { writer }) => {
        return writer.createElement('video', {
          src: viewElement.getAttribute('src') || '',
          controls: viewElement.getAttribute('controls') || 'controls',
        })
      },
    })

    // 3. Кнопка в тулбаре
    editor.ui.componentFactory.add('localVideoUpload', (locale) => {
      const button = new ButtonView(locale)

      button.set({
        label: 'Вставить видео',
        icon: this._getVideoIcon(),
        tooltip: true,
      })

      button.on('execute', () => this._openFileDialog(editor))
      return button
    })

    // 4. Drag-and-Drop с полной защитой
    this._setupDragAndDrop(editor)
    this._setupVideoInsertionTracking(editor)
  }

  _registerVideoInsertCommand(editor) {
    editor.commands.add('videoInsert', {
      execute: (options) => {
        editor.model.change((writer) => {
          const videoElement = writer.createElement('video', {
            src: options.src,
            controls: options.controls || 'controls',
          })
          editor.model.insertContent(videoElement)

          // Фокусируемся на вставленном видео
          writer.setSelection(videoElement, 'on')
        })
      },

      // Опционально: проверка возможности вставки
      refresh: function () {
        this.isEnabled = editor.model.schema.checkChild(
          editor.model.document.selection.focus.parent,
          'video',
        )
      },
    })
  }

  _getVideoIcon() {
    return `
    <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill="#ffffff" d="M9.5 9V15M6.5 12H12.5M16 10L18.5768 8.45392C19.3699 7.97803 19.7665 7.74009 20.0928 7.77051C20.3773 7.79703 20.6369 7.944 20.806 8.17433C21 8.43848 21 8.90095 21 9.8259V14.1741C21 15.099 21 15.5615 20.806 15.8257C20.6369 16.056 20.3773 16.203 20.0928 16.2295C19.7665 16.2599 19.3699 16.022 18.5768 15.5461L16 14M6.2 18H12.8C13.9201 18 14.4802 18 14.908 17.782C15.2843 17.5903 15.5903 17.2843 15.782 16.908C16 16.4802 16 15.9201 16 14.8V9.2C16 8.0799 16 7.51984 15.782 7.09202C15.5903 6.71569 15.2843 6.40973 14.908 6.21799C14.4802 6 13.9201 6 12.8 6H6.2C5.0799 6 4.51984 6 4.09202 6.21799C3.71569 6.40973 3.40973 6.71569 3.21799 7.09202C3 7.51984 3 8.07989 3 9.2V14.8C3 15.9201 3 16.4802 3.21799 16.908C3.40973 17.2843 3.71569 17.5903 4.09202 17.782C4.51984 18 5.07989 18 6.2 18Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`
  }
  _setupConverters(editor) {
    // Конвертер для модели → view
    editor.conversion.for('downcast').elementToElement({
      model: 'video',
      view: (modelElement, { writer }) => {
        const base64Data = modelElement.getAttribute('data-base64') || ''
        return writer.createEmptyElement('video', {
          src: base64Data, // Используем base64 напрямую
          controls: 'controls',
          style: 'max-width: 100%; height: auto;',
        })
      },
    })

    // Конвертер для view → модели
    editor.conversion.for('upcast').elementToElement({
      view: {
        name: 'video',
        attributes: ['src', 'controls'],
      },
      model: (viewElement, { writer }) => {
        const src = viewElement.getAttribute('src')
        return writer.createElement('video', {
          'data-base64': src.startsWith('data:') ? src : '',
          src: src,
          controls: viewElement.getAttribute('controls') || 'controls',
        })
      },
    })
  }

  _openFileDialog(editor) {
    const input = createElement(document, 'input', {
      type: 'file',
      accept: 'video/*',
    })

    input.addEventListener('change', async (event) => {
      const file = event.target.files?.[0]
      if (!file) return

      try {
        const videoUrl = URL.createObjectURL(file)
        this._insertVideo(editor, videoUrl)
      } catch (error) {
        console.error('Ошибка загрузки видео:', error)
      }

      input.remove()
    })

    input.click()
  }

  // _setupDragAndDrop(editor) {
  //   const editingView = editor.editing.view

  //   // Защищенная проверка типа файла
  //   const isVideoFile = (dataTransfer) => {
  //     try {
  //       return dataTransfer?.files?.length > 0 && dataTransfer.files[0]?.type?.startsWith('video/')
  //     } catch {
  //       return false
  //     }
  //   }

  //   // Обработка dragover
  //   editingView.document.on('dragover', (evt, data) => {
  //     if (isVideoFile(data.dataTransfer)) {
  //       data.preventDefault()
  //       editingView.domConverter.domDocument.body.style.cursor = 'copy'
  //     }
  //   })

  //   // Обработка drop
  //   editingView.document.on('drop', async (evt, data) => {
  //     editingView.domConverter.domDocument.body.style.cursor = ''

  //     if (!isVideoFile(data.dataTransfer)) {
  //       return
  //     }

  //     data.preventDefault()
  //     data.stopPropagation()

  //     try {
  //       const file = data.dataTransfer.files[0]
  //       const videoUrl = URL.createObjectURL(file)
  //       this._insertVideo(editor, videoUrl)
  //     } catch (error) {
  //       console.error('Ошибка обработки DnD:', error)
  //     }
  //   })

  //   // Обработка dragleave
  //   editingView.document.on('dragleave', () => {
  //     editingView.domConverter.domDocument.body.style.cursor = ''
  //   })
  // }

  _setupDragAndDrop(editor) {
    const editingView = editor.editing.view

    editingView.document.on('dragover', (evt, data) => {
      if (this._isVideoFile(data.dataTransfer)) {
        data.preventDefault()
      }
    })

    editingView.document.on('drop', async (evt, data) => {
      if (!this._isVideoFile(data.dataTransfer)) return
      data.preventDefault()

      const file = data.dataTransfer.files[0]
      editor.execute('videoInsert', {
        src: 'data:video/mp4;base64,...',
        controls: 'controls',
      })

      try {
        const base64Video = await this._fileToBase64(file)
        this._insertBase64Video(editor, base64Video, file.type)
      } catch (error) {
        console.error('Ошибка обработки видео:', error)
      }
    })
  }

  _insertVideo(editor, src) {
    editor.model.change((writer) => {
      // const videoElement = writer.createElement('video', {
      //   src: src,
      //   controls: 'controls',
      // })

      // const insertPosition = editor.model.document.selection.getFirstPosition()
      // writer.insert(videoElement, insertPosition)

      const urlParagraph = writer.createElement('paragraph')
      writer.appendText(`Video URL: ${src}`, urlParagraph)

      // Создаем элемент видео
      const videoElement = writer.createElement('video', {
        src: src,
        // src: dataUrl, // Формат: data:video/mp4;base64,...
        controls: 'controls',
      })

      // Вставляем сначала URL, затем видео
      editor.model.insertContent(urlParagraph)
      editor.model.insertContent(videoElement)
      editor.execute('videoInsert', {
        // Используем команду
        src: src,
        controls: 'controls',
      })
    })
  }

  _setupVideoInsertionTracking(editor) {
    // Отслеживание изменений модели
    editor.model.document.on('change:data', () => {
      const changes = editor.model.document.differ.getChanges()

      changes.forEach((change) => {
        this._handleVideoInsertion(editor, change)
      })
    })

    // Кастомное событие для внешних подписчиков
    editor.on('videoInserted', (event, data) => {
      console.log('Кастомное событие:', data)
    })
  }

  _handleVideoInsertion(editor, change) {
    if (change.type !== 'insert' || change.name !== 'video') return

    const videoElement = change.position.nodeAfter
    const videoSrc = videoElement.getAttribute('src')

    // Анализ типа видео
    const videoType = this._getVideoType(videoSrc)

    console.log(`Вставлено видео (${videoType}):`, {
      src: videoSrc,
      element: videoElement,
      position: change.position,
    })

    // editor.setData(videoSrc) // вставка непосредтвенно в content
    // Можно добавить дополнительные обработчики
    this._processVideoInsertion(editor, videoElement)
  }

  _getVideoType(src) {
    if (src.startsWith('data:')) return 'embedded'
    if (src.startsWith('blob:')) return 'temporary'
    if (src.match(/youtube|vimeo/)) return 'external'
    return 'regular'
  }

  _processVideoInsertion(editor, videoElement) {
    // Пример: автоматическая установка размеров
    editor.model.change((writer) => {
      writer.setAttribute('width', '100%', videoElement)
    })

    // Пример: отправка аналитики
    if (typeof window.ga === 'function') {
      ga('send', 'event', 'Video', 'insert')
    }
  }

  async _fileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(reader.result)
      reader.onerror = reject
      reader.readAsDataURL(file)
    })
  }

  _insertBase64Video(editor, base64Data, mimeType) {
    editor.model.change((writer) => {
      const videoElement = writer.createElement('video', {
        'data-base64': base64Data,
        src: base64Data,
        controls: 'controls',
        'data-mime': mimeType,
      })

      editor.model.insertContent(videoElement)
      // editor.model.insertContent(base64Data) // insert в content

      // const imageElement = writer.createElement('image', {
      //   src: base64Data,
      //   customData: 'hidden-meta-data', // невидимый атрибут
      // })

      // Вставка в модель, но без рендеринга (если не подключен соответствующий конвертер)
      // editor.model.insertContent(imageElement)

      //   const paragraph = writer.createElement('paragraph', {
      //   src: base64Data,
      //   customData: 'hidden-meta-data', // невидимый атрибут
      // })

      // editor.model.insertContent(paragraph)

      // Триггерим событие вручную
      if (editor.plugins.has('VueEvents')) {
        editor.plugins.get('VueEvents').fire('input')
      }
      // editor.setData(videoElement) // Автоматически триггерит input

      // Альтернативно для CKEditor 5 >= 34.0.0
      editor.editing.view.document.fire('change')
    })
  }

  // async _fileToBase64(file) {
  //   const reader = new FileReader()
  //   reader.readAsDataURL(file)
  //   return await new Promise((resolve) => {
  //     reader.onload = () => resolve(reader.result)
  //   })
  // }

  setMaxSize(size = 10) {
    const config = editor.config.get('localVideoUpload')
    const MAX_SIZE_MB = size || config?.maxSize
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      alert(`Максимальный размер видео: ${MAX_SIZE_MB}MB`)
      return
    }
  }

  _isVideoFile(dataTransfer) {
    return dataTransfer.files?.length > 0 && dataTransfer.files[0]?.type?.startsWith('video/')
  }
}

export class VideoUpload extends Plugin {
  static get pluginName() {
    return 'VideoUpload'
  }

  init() {
    const editor = this.editor
    const config = editor.config.get('videoUpload')

    // Добавляем кнопку в тулбар (если настроено)
    if (config?.toolbar) {
      this._createToolbarButton()
    }

    // Обработка вставки видео (через Ctrl+V / drag-and-drop)
    this._setupPasteAndDrop()
  }

  // Создаем кнопку в тулбаре
  _createToolbarButton() {
    const editor = this.editor
    const t = editor.t

    editor.ui.componentFactory.add('videoUpload', (locale) => {
      const button = new FileDialogButtonView(locale)

      button.set({
        acceptedType: 'video/*',
        allowMultipleFiles: false,
        label: t('Insert Video'),
        icon: `
        <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill="#ffffff" d="M12.5 13V9M12.5 9H8.5M12.5 9L6.5 15M16 10L18.5768 8.45392C19.3699 7.97803 19.7665 7.74009 20.0928 7.77051C20.3773 7.79703 20.6369 7.944 20.806 8.17433C21 8.43848 21 8.90095 21 9.8259V14.1741C21 15.099 21 15.5615 20.806 15.8257C20.6369 16.056 20.3773 16.203 20.0928 16.2295C19.7665 16.2599 19.3699 16.022 18.5768 15.5461L16 14M6.2 18H12.8C13.9201 18 14.4802 18 14.908 17.782C15.2843 17.5903 15.5903 17.2843 15.782 16.908C16 16.4802 16 15.9201 16 14.8V9.2C16 8.0799 16 7.51984 15.782 7.09202C15.5903 6.71569 15.2843 6.40973 14.908 6.21799C14.4802 6 13.9201 6 12.8 6H6.2C5.0799 6 4.51984 6 4.09202 6.21799C3.71569 6.40973 3.40973 6.71569 3.21799 7.09202C3 7.51984 3 8.0799 3 9.2V14.8C3 15.9201 3 16.4802 3.21799 16.908C3.40973 17.2843 3.71569 17.5903 4.09202 17.782C4.51984 18 5.07989 18 6.2 18Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`, // Иконка видео
        tooltip: true,
      })

      button.on('done', (_, files) => {
        this._uploadVideo(files[0])
      })

      return button
    })
  }

  // Обработка вставки видео через Ctrl+V / drag-and-drop
  _setupPasteAndDrop() {
    const editor = this.editor
    const editingView = editor.editing.view

    editingView.document.on('clipboardInput', (evt, data) => {
      const files = Array.from(data.dataTransfer.files).filter((file) =>
        file.type.startsWith('video/'),
      )

      if (files.length) {
        evt.stop()
        this._uploadVideo(files[0])
      }
    })

    editingView.document.on('drop', (evt, data) => {
      const files = Array.from(data.dataTransfer.files).filter((file) =>
        file.type.startsWith('video/'),
      )

      if (files.length) {
        evt.stop()
        this._uploadVideo(files[0])
      }
    })
  }

  // Загрузка видео на сервер и вставка в редактор
  async _uploadVideo(file) {
    const editor = this.editor
    const config = editor.config.get('videoUpload')

    if (!file || !file.type.startsWith('video/')) {
      return
    }

    // 1. Временный Base64 для превью (опционально)
    const tempVideoUrl = URL.createObjectURL(file)

    // 2. Вставляем временный `<video>` (если нужно превью)
    editor.model.change((writer) => {
      const videoElement = writer.createElement('video', {
        src: tempVideoUrl,
        controls: 'true',
        'data-temp': 'true',
      })

      editor.model.insertContent(videoElement)
    })

    // 3. Загружаем на сервер (если настроен endpoint)
    if (config?.uploadConfig) {
      try {
        const formData = new FormData()
        formData.append('video', file)

        const response = await fetch(config.uploadConfig?.url, {
          method: 'POST',
          body: formData,
          headers: config?.uploadConfig?.headers,
        })

        const { url } = await response.json()

        // 4. Заменяем временный src на серверный URL
        editor.model.change((writer) => {
          const videoElements = Array.from(editor.model.document.getRoot().getChildren()).filter(
            (element) => element.is('video') && element.getAttribute('data-temp'),
          )

          for (const videoElement of videoElements) {
            writer.setAttribute('src', url, videoElement)
            writer.removeAttribute('data-temp', videoElement)
          }
        })
      } catch (error) {
        console.error('Video upload failed:', error)
        // Можно показать ошибку в редакторе
      }
    }
  }
}

export class VideoUploadEditing extends Plugin {
  static get pluginName() {
    return 'VideoUploadEditing'
  }

  init() {
    const editor = this.editor

    // Разрешаем тег `<video>` в модели
    editor.model.schema.register('videoUploadEditing', {
      inheritAllFrom: '$block',
      allowAttributes: ['src', 'controls', 'width', 'height'],
    })

    // Конвертер модель → view (как отображать `<video>` в HTML)
    editor.conversion.for('downcast').elementToElement({
      model: 'video',
      view: (modelItem, { writer }) => {
        return writer.createContainerElement('video', {
          src: modelItem.getAttribute('src'),
          controls: 'true',
          width: modelItem.getAttribute('width') || '100%',
        })
      },
    })

    // Конвертер view → модель (если видео вставлено вручную в HTML)
    editor.conversion.for('upcast').elementToElement({
      view: {
        name: 'video',
        attributes: ['src'],
      },
      model: (viewVideo, { writer }) => {
        return writer.createElement('video', {
          src: viewVideo.getAttribute('src'),
          controls: 'true',
        })
      },
    })
  }
}

// Правильная реализация команды как класса
class VideoInsertCommand extends Command {
  execute(options) {
    const model = this.editor.model

    model.change((writer) => {
      const videoElement = writer.createElement('video', {
        src: options.src,
        controls: options.controls || 'controls',
      })

      model.insertContent(videoElement)
      writer.setSelection(videoElement, 'on')
    })
  }

  // Опционально: метод для проверки возможности вставки
  refresh() {
    const model = this.editor.model
    const selection = model.document.selection
    this.isEnabled = model.schema.checkChild(selection.focus.parent, 'video')
  }

  // Опционально: метод destroy для очистки ресурсов
  destroy() {
    // Очистка ресурсов, если необходимо
    super.destroy()
  }
}
