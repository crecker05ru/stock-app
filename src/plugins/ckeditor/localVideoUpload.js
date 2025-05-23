import { Plugin } from 'ckeditor5'
import { ButtonView } from 'ckeditor5'
import { createElement } from 'ckeditor5'

// export default class LocalVideoUpload extends Plugin {
//   init() {
//     const editor = this.editor

//     editor.ui.componentFactory.add('localVideoUpload', (locale) => {
//       const button = new ButtonView(locale)

//       button.set({
//         label: 'Вставить видео',
//         icon: '<svg viewBox="0 0 24 24"><path d="M10 16.5l6-4.5-6-4.5v9zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>',
//         tooltip: true,
//       })

//       button.on('execute', () => {
//         this._createVideoUploadDialog(editor)
//       })

//       return button
//     })
//   }

//   _createVideoUploadDialog(editor) {
//     const input = createElement(document, 'input', {
//       type: 'file',
//       accept: 'video/*',
//     })

//     input.addEventListener('change', (event) => {
//       const file = event.target.files[0]
//       if (!file) return

//       const videoUrl = URL.createObjectURL(file)

//       editor.model.change((writer) => {
//         const videoElement = writer.createElement('video', {
//           src: videoUrl,
//           controls: 'controls',
//         })

//         editor.model.insertContent(videoElement)
//       })

//       input.remove()
//     })

//     input.click()
//   }
// }

// export default class LocalVideoUpload extends Plugin {
//   static get requires() {
//     return ['VideoInsert'] // Если используете официальный плагин Video
//   }

//   init() {
//     const editor = this.editor

//     // Разрешаем тег <video> и атрибуты
//     editor.model.schema.register('video', {
//       inheritAllFrom: '$block',
//       allowAttributes: ['src', 'controls'],
//     })

//     // Конвертер для модели → view (чтобы <video> рендерился в DOM)
//     editor.conversion.for('downcast').add((dispatcher) => {
//       dispatcher.on('insert:video', (evt, data, conversionApi) => {
//         const videoUrl = data.item.getAttribute('src')
//         const viewWriter = conversionApi.writer

//         const videoElement = viewWriter.createEmptyElement('video', {
//           src: videoUrl,
//           controls: 'controls',
//         })

//         conversionApi.mapper.bindElements(data.item, videoElement)
//         viewWriter.insert(
//           viewWriter.createPositionAt(
//             conversionApi.mapper.toViewElement(data.range.start.parent),
//             0,
//           ),
//           videoElement,
//         )
//       })
//     })

//     // Конвертер для view → модели (если видео вставлено вручную)
//     editor.conversion.for('upcast').elementToElement({
//       view: {
//         name: 'video',
//         attributes: ['src', 'controls'],
//       },
//       model: 'video',
//     })

//     // Кнопка в панели инструментов
//     editor.ui.componentFactory.add('localVideoUpload', (locale) => {
//       const button = new ButtonView(locale)

//       button.set({
//         label: 'Вставить видео',
//         icon: '<svg viewBox="0 0 24 24"><path d="M10 16.5l6-4.5-6-4.5v9zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>',
//         tooltip: true,
//       })

//       button.on('execute', () => {
//         this._handleVideoUpload(editor)
//       })

//       return button
//     })
//   }

//   _handleVideoUpload(editor) {
//     const input = createElement(document, 'input', {
//       type: 'file',
//       accept: 'video/*',
//     })

//     input.addEventListener('change', (event) => {
//       const file = event.target.files[0]
//       if (!file) return

//       const videoUrl = URL.createObjectURL(file)

//       editor.model.change((writer) => {
//         const videoElement = writer.createElement('video', {
//           src: videoUrl,
//           controls: 'controls',
//         })

//         editor.model.insertContent(videoElement)
//       })

//       input.remove()
//     })

//     input.click()
//   }
// }

// export default class LocalVideoUpload extends Plugin {
//   init() {
//     const editor = this.editor

//     // 1. Регистрируем элемент `video` в схеме модели
//     editor.model.schema.register('video', {
//       isObject: true, // Видео — это объектный элемент (как изображение)
//       allowWhere: '$block', // Разрешаем вставлять в блоки
//       allowAttributes: ['src', 'controls', 'width', 'height'],
//     })

//     // 2. Настраиваем конвертацию модель → view (для отображения)
//     editor.conversion.for('downcast').elementToElement({
//       model: 'video',
//       view: (modelItem, { writer }) => {
//         const src = modelItem.getAttribute('src')
//         return writer.createEmptyElement('video', {
//           src,
//           controls: 'controls',
//           style: 'max-width: 100%; height: auto;',
//         })
//       },
//     })

//     // 3. Настраиваем конвертацию view → модель (если видео вставлено вручную)
//     editor.conversion.for('upcast').elementToElement({
//       view: {
//         name: 'video',
//         attributes: ['src', 'controls'],
//       },
//       model: (viewVideo, { writer }) => {
//         return writer.createElement('video', {
//           src: viewVideo.getAttribute('src'),
//           controls: viewVideo.getAttribute('controls') || 'controls',
//         })
//       },
//     })

//     // 4. Добавляем кнопку в тулбар
//     editor.ui.componentFactory.add('localVideoUpload', (locale) => {
//       const button = new ButtonView(locale)

//       button.set({
//         label: 'Вставить видео',
//         icon: '<svg viewBox="0 0 24 24"><path d="M10 16.5l6-4.5-6-4.5v9zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>',
//         tooltip: true,
//       })

//       button.on('execute', () => {
//         this._handleVideoUpload(editor)
//       })

//       return button
//     })
//   }

//   _handleVideoUpload(editor) {
//     const input = createElement(document, 'input', {
//       type: 'file',
//       accept: 'video/*',
//     })

//     input.addEventListener('change', (event) => {
//       const file = event.target.files[0]
//       if (!file) return

//       const videoUrl = URL.createObjectURL(file)

//       editor.model.change((writer) => {
//         const videoElement = writer.createElement('video', {
//           src: videoUrl,
//           controls: 'controls',
//         })

//         editor.model.insertContent(videoElement)
//       })

//       input.remove()
//     })

//     input.click()
//   }
// }

// export default class LocalVideoUpload extends Plugin {
//   init() {
//     const editor = this.editor

//     // 1. Регистрируем элемент `video` в схеме модели
//     editor.model.schema.register('video', {
//       isObject: true,
//       allowWhere: '$block',
//       allowAttributes: ['src', 'controls', 'width', 'height'],
//     })

//     // 2. Конвертеры для видео
//     editor.conversion.for('downcast').elementToElement({
//       model: 'video',
//       view: (modelItem, { writer }) => {
//         const src = modelItem.getAttribute('src')
//         return writer.createEmptyElement('video', {
//           src,
//           controls: 'controls',
//           style: 'max-width: 100%; height: auto;',
//         })
//       },
//     })

//     editor.conversion.for('upcast').elementToElement({
//       view: {
//         name: 'video',
//         attributes: ['src', 'controls'],
//       },
//       model: (viewVideo, { writer }) => {
//         return writer.createElement('video', {
//           src: viewVideo.getAttribute('src'),
//           controls: viewVideo.getAttribute('controls') || 'controls',
//         })
//       },
//     })

//     // 3. Добавляем кнопку с корректной SVG-иконкой
//     editor.ui.componentFactory.add('localVideoUpload', (locale) => {
//       const button = new ButtonView(locale)

//       // Исправленная SVG-иконка
//       const iconSvg = `<svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><polygon points="14 12 10 9 10 15"/></svg>`

//       button.set({
//         label: 'Вставить видео',
//         icon: iconSvg,
//         tooltip: true,
//         class: 'ck-video-upload-button',
//       })

//       // button.set({
//       //   label: 'Вставить видео',
//       //   icon: '<svg viewBox="0 0 24 24"><path d="M10 16.5l6-4.5-6-4.5v9zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>',
//       //   tooltip: true,
//       // })

//       button.on('execute', () => {
//         this._handleVideoUpload(editor)
//       })

//       return button
//     })
//   }

//   _handleVideoUpload(editor) {
//     const input = createElement(document, 'input', {
//       type: 'file',
//       accept: 'video/*',
//     })

//     input.addEventListener('change', (event) => {
//       const file = event.target.files[0]
//       if (!file) return

//       const videoUrl = URL.createObjectURL(file)

//       editor.model.change((writer) => {
//         const videoElement = writer.createElement('video', {
//           src: videoUrl,
//           controls: 'controls',
//         })

//         editor.model.insertContent(videoElement)
//       })

//       input.remove()
//     })

//     input.click()
//   }
// }

// export default class LocalVideoUpload extends Plugin {
//   init() {
//     const editor = this.editor
//     const editingView = editor.editing.view

//     // 1. Регистрация элемента video в схеме
//     editor.model.schema.register('video', {
//       isObject: true,
//       allowWhere: '$block',
//       allowAttributes: ['src', 'controls', 'width', 'height'],
//     })

//     // 2. Конвертеры
//     editor.conversion.for('downcast').elementToElement({
//       model: 'video',
//       view: (modelElement, { writer }) => {
//         return writer.createEmptyElement('video', {
//           src: modelElement.getAttribute('src'),
//           controls: 'controls',
//           style: 'max-width: 100%; height: auto;',
//         })
//       },
//     })

//     editor.conversion.for('upcast').elementToElement({
//       view: {
//         name: 'video',
//         attributes: ['src', 'controls'],
//       },
//       model: (viewElement, { writer }) => {
//         return writer.createElement('video', {
//           src: viewElement.getAttribute('src'),
//           controls: viewElement.getAttribute('controls') || 'controls',
//         })
//       },
//     })

//     // 3. Кнопка в тулбаре
//     editor.ui.componentFactory.add('localVideoUpload', (locale) => {
//       const button = new ButtonView(locale)

//       button.set({
//         label: 'Вставить видео',
//         icon: this._getVideoIcon(),
//         tooltip: true,
//       })

//       button.on('execute', () => this._openFileDialog(editor))
//       return button
//     })

//     // 4. Drag-and-Drop обработка
//     this._setupDragAndDrop(editor, editingView)
//   }

//   // Иконка видео
//   _getVideoIcon() {
//     const svgString = `
//           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
//               <path fill="currentColor" d="M10 16.5l6-4.5-6-4.5v9zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
//           </svg>
//       `
//     return new DOMParser().parseFromString(svgString, 'image/svg+xml').documentElement
//   }

//   // Открытие диалога выбора файла
//   _openFileDialog(editor) {
//     const input = createElement(document, 'input', {
//       type: 'file',
//       accept: 'video/*',
//     })

//     input.addEventListener('change', (event) => {
//       const file = event.target.files[0]
//       if (file) this._insertVideo(editor, file)
//       input.remove()
//     })

//     input.click()
//   }

//   // Вставка видео в редактор
//   _insertVideo(editor, file) {
//     if (!file.type.startsWith('video/')) {
//       console.warn('Выбранный файл не является видео')
//       return
//     }

//     const videoUrl = URL.createObjectURL(file)

//     editor.model.change((writer) => {
//       const videoElement = writer.createElement('video', {
//         src: videoUrl,
//         controls: 'controls',
//       })
//       editor.model.insertContent(videoElement)
//     })
//   }

//   // Настройка Drag-and-Drop
//   _setupDragAndDrop(editor, editingView) {
//     editingView.document.on('dragover', (evt, data) => {
//       if (this._isVideoFile(data.dataTransfer)) {
//         data.preventDefault()
//       }
//     })

//     editingView.document.on('drop', (evt, data) => {
//       if (this._isVideoFile(data.dataTransfer)) {
//         data.preventDefault()
//         const file = data.dataTransfer.files[0]
//         this._insertVideo(editor, file)
//       }
//     })
//   }

//   // Проверка, что перетаскивается видеофайл
//   _isVideoFile(dataTransfer) {
//     if (!dataTransfer.files.length) return false
//     const file = dataTransfer.files[0]
//     return file.type.startsWith('video/')
//   }
// }

// Работает со вставкой видео но без отображения в value
// export default class LocalVideoUpload extends Plugin {
//   init() {
//     const editor = this.editor

//     // 1. Проверка существования редактора
//     if (!editor || !editor.model) {
//       console.error('Editor не инициализирован')
//       return
//     }

//     // 2. Регистрация элемента video
//     this._registerVideoElement(editor)

//     // 3. Настройка конвертеров
//     this._setupConverters(editor)

//     // 4. Добавление кнопки
//     this._addToolbarButton(editor)

//     // 5. Настройка Drag-and-Drop
//     this._setupDragAndDrop(editor)
//   }

//   _registerVideoElement(editor) {
//     try {
//       editor.model.schema.register('video', {
//         isObject: true,
//         allowWhere: '$block',
//         allowAttributes: ['src', 'controls'],
//       })
//     } catch (error) {
//       console.error('Ошибка регистрации элемента video:', error)
//     }
//   }

//   _setupConverters(editor) {
//     // Конвертер для модели → view
//     editor.conversion.for('downcast').elementToElement({
//       model: 'video',
//       view: (modelElement, { writer }) => {
//         if (!writer) return null

//         const src = this._ensureString(modelElement.getAttribute('src'))
//         return writer.createEmptyElement('video', {
//           src: src,
//           controls: 'controls',
//           style: 'max-width: 100%; height: auto;',
//         })
//       },
//     })

//     // Конвертер для view → модели
//     editor.conversion.for('upcast').elementToElement({
//       view: {
//         name: 'video',
//         attributes: ['src', 'controls'],
//       },
//       model: (viewElement, { writer }) => {
//         if (!writer) return null

//         const src = this._ensureString(viewElement.getAttribute('src'))
//         return writer.createElement('video', {
//           src: src,
//           controls: this._ensureString(viewElement.getAttribute('controls')) || 'controls',
//         })
//       },
//     })
//   }

//   _addToolbarButton(editor) {
//     try {
//       editor.ui.componentFactory.add('localVideoUpload', (locale) => {
//         const button = new ButtonView(locale)

//         button.set({
//           label: 'Вставить видео',
//           icon: this._getSafeIcon(),
//           tooltip: true,
//         })

//         button.on('execute', () => this._handleFileSelection(editor))
//         return button
//       })
//     } catch (error) {
//       console.error('Ошибка создания кнопки:', error)
//     }
//   }

//   _setupDragAndDrop(editor) {
//     if (!editor.editing?.view?.document) return

//     const editingView = editor.editing.view

//     editingView.document.on('dragover', (evt, data) => {
//       if (this._isVideoFile(data.dataTransfer)) {
//         data.preventDefault()
//       }
//     })

//     editingView.document.on('drop', (evt, data) => {
//       try {
//         if (this._isVideoFile(data.dataTransfer)) {
//           data.preventDefault()
//           const file = data.dataTransfer.files?.[0]
//           if (file) this._insertVideo(editor, file)
//         }
//       } catch (error) {
//         console.error('Ошибка обработки DnD:', error)
//       }
//     })
//   }

//   _ensureString(value) {
//     return typeof value === 'string' ? value.trim() : ''
//   }

//   _getSafeIcon() {
//     try {
//       return '<svg viewBox="0 0 24 24"><path d="M10 16.5l6-4.5-6-4.5v9zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>'
//     } catch (e) {
//       console.error('Ошибка создания иконки:', e)
//       return ''
//     }
//   }

//   _handleFileSelection(editor) {
//     try {
//       const input = createElement(document, 'input', {
//         type: 'file',
//         accept: 'video/*',
//       })

//       input.addEventListener('change', (event) => {
//         const file = event.target.files?.[0]
//         if (file) this._insertVideo(editor, file)
//         input.remove()
//       })

//       input.click()
//     } catch (error) {
//       console.error('Ошибка выбора файла:', error)
//     }
//   }

//   _isVideoFile(dataTransfer) {
//     return dataTransfer?.files?.length && dataTransfer.files[0]?.type?.startsWith('video/')
//   }

//   _insertVideo(editor, file) {
//     if (!editor.model || !file?.type?.startsWith('video/')) return

//     try {
//       const videoUrl = URL.createObjectURL(file)

//       editor.model.change((writer) => {
//         if (!writer) return

//         const selection = editor.model.document.selection
//         const insertPosition = selection.getFirstPosition()

//         if (!insertPosition) {
//           console.error('Не найдена позиция для вставки')
//           return
//         }

//         const videoElement = writer.createElement('video', {
//           src: this._ensureString(videoUrl),
//           controls: 'controls',
//         })

//         writer.insert(videoElement, insertPosition)
//       })
//     } catch (error) {
//       console.error('Ошибка вставки видео:', error)
//       URL.revokeObjectURL(videoUrl)
//     }
//   }
// }

export default class LocalVideoUpload extends Plugin {
  init() {
    const editor = this.editor

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

  _getVideoIcon() {
    return '<svg viewBox="0 0 24 24"><path d="M10 16.5l6-4.5-6-4.5v9zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>'
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

  _setupDragAndDrop(editor) {
    const editingView = editor.editing.view

    // Защищенная проверка типа файла
    const isVideoFile = (dataTransfer) => {
      try {
        return dataTransfer?.files?.length > 0 && dataTransfer.files[0]?.type?.startsWith('video/')
      } catch {
        return false
      }
    }

    // Обработка dragover
    editingView.document.on('dragover', (evt, data) => {
      if (isVideoFile(data.dataTransfer)) {
        data.preventDefault()
        editingView.domConverter.domDocument.body.style.cursor = 'copy'
      }
    })

    // Обработка drop
    editingView.document.on('drop', async (evt, data) => {
      editingView.domConverter.domDocument.body.style.cursor = ''

      if (!isVideoFile(data.dataTransfer)) {
        return
      }

      data.preventDefault()
      data.stopPropagation()

      try {
        const file = data.dataTransfer.files[0]
        const videoUrl = URL.createObjectURL(file)
        this._insertVideo(editor, videoUrl)
      } catch (error) {
        console.error('Ошибка обработки DnD:', error)
      }
    })

    // Обработка dragleave
    editingView.document.on('dragleave', () => {
      editingView.domConverter.domDocument.body.style.cursor = ''
    })
  }

  _insertVideo(editor, src) {
    editor.model.change((writer) => {
      const videoElement = writer.createElement('video', {
        src: src,
        controls: 'controls',
      })

      const insertPosition = editor.model.document.selection.getFirstPosition()
      writer.insert(videoElement, insertPosition)
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
}

// export default class LocalVideoUpload extends Plugin {
//     init() {
//         const editor = this.editor;

//         // Регистрация элемента video
//         editor.model.schema.register('video', {
//             isObject: true,
//             allowWhere: '$block',
//             allowAttributes: ['src', 'controls', 'width', 'height']
//         });

//         // Конвертеры для модели ↔ представления
//         this._setupConverters(editor);

//         // Добавление кнопки в тулбар
//         editor.ui.componentFactory.add('localVideoUpload', locale => {
//             const button = new ButtonView(locale);

//             button.set({
//                 label: 'Вставить видео',
//                 icon: this._getVideoIcon(),
//                 tooltip: true
//             });

//             button.on('execute', () => this._openFileDialog(editor));
//             return button;
//         });

//         // Настройка Drag-and-Drop
//         this._setupDragAndDrop(editor);
//     }

//     _setupConverters(editor) {
//         // Модель → View (для отображения в редакторе)
//         editor.conversion.for('downcast').elementToElement({
//             model: 'video',
//             view: (modelElement, { writer }) => {
//                 const src = modelElement.getAttribute('src') || '';
//                 return writer.createContainerElement('figure', { class: 'video' }, [
//                     writer.createEmptyElement('video', {
//                         src: src,
//                         controls: 'controls',
//                         style: 'max-width: 100%; height: auto;'
//                     }),
//                     writer.createContainerElement('figcaption', {}, [
//                         writer.createText(src) // Вставляем src в подпись
//                     ])
//                 ]);
//             }
//         });

//         // View → Модель (для обработки существующего контента)
//         editor.conversion.for('upcast').elementToElement({
//             view: {
//                 name: 'video',
//                 attributes: ['src', 'controls']
//             },
//             model: (viewElement, { writer }) => {
//                 return writer.createElement('video', {
//                     src: viewElement.getAttribute('src'),
//                     controls: viewElement.getAttribute('controls') || 'controls'
//                 });
//             }
//         });
//     }

//     _getVideoIcon() {
//         return '<svg viewBox="0 0 24 24"><path d="M10 16.5l6-4.5-6-4.5v9zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>';
//     }

//     _openFileDialog(editor) {
//         const input = createElement(document, 'input', {
//             type: 'file',
//             accept: 'video/*'
//         });

//         input.addEventListener('change', event => {
//             const file = event.target.files[0];
//             if (!file) return;

//             const videoUrl = URL.createObjectURL(file);
//             this._insertVideoWithSrc(editor, videoUrl);
//             input.remove();
//         });

//         input.click();
//     }

//     _insertVideoWithSrc(editor, src) {
//         editor.model.change(writer => {
//             // Создаем элемент видео
//             const videoElement = writer.createElement('video', {
//                 src: src,
//                 controls: 'controls'
//             });

//             // Вставляем в контент
//             editor.model.insertContent(videoElement);

//             // Дополнительно: вставляем src как текст
//             const textNode = writer.createText(` [Video Source: ${src}] `);
//             editor.model.insertContent(textNode, writer.createPositionAfter(videoElement));
//         });
//     }

//     _setupDragAndDrop(editor) {
//         const editingView = editor.editing.view;

//         editingView.document.on('dragover', (evt, data) => {
//             if (this._isVideoFile(data.dataTransfer)) {
//                 data.preventDefault();
//             }
//         });

//         editingView.document.on('drop', (evt, data) => {
//             if (!this._isVideoFile(data.dataTransfer)) return;
//             data.preventDefault();

//             const file = data.dataTransfer.files[0];
//             const videoUrl = URL.createObjectURL(file);
//             this._insertVideoWithSrc(editor, videoUrl);
//         });
//     }

//     _isVideoFile(dataTransfer) {
//         return dataTransfer.files.length &&
//                dataTransfer.files[0].type.startsWith('video/');
//     }
// }
