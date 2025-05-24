<template>
  <div class="main-container">
    <div
      class="editor-container editor-container_classic-editor editor-container_include-word-count editor-container_include-fullscreen"
      ref="editorContainerElement"
    >
      <div class="editor-container__editor">
        <div ref="editorElement">
          <ckeditor
            v-if="editor && config"
            v-model="config.initialData"
            :editor="editor"
            :config="config"
            @ready="onReady"
            @input="onEditorInput"
          />
        </div>
      </div>
      <div class="editor_container__word-count" ref="editorWordCountElement"></div>
    </div>
  </div>
</template>

<script setup>
/**
 * This configuration was generated using the CKEditor 5 Builder. You can modify it anytime using this link:
 * https://ckeditor.com/ckeditor-5/builder/#installation/NoJgNARCB0Bs0AYKQIwhA2sQHYCcALHiCggvgMyx4Csx2OOBFAHEQSHsRUYQchACmAO2QIwwFGCnipMgLqQSFEADMAhqojygA===
 */

import { computed, ref, onMounted, useTemplateRef, watch } from 'vue'
import { Ckeditor } from '@ckeditor/ckeditor5-vue'
// import VideoUpload from '@visao/ckeditor5-video/src/videoupload'

// import VideoUpload from '@/ckeditor/ckeditor5-video/src/videoupload'
// import Video from '@/ckeditor/ckeditor5-video/src/video'
// import VideoResize from '@/ckeditor/ckeditor5-video/src/videoresize'
// import VideoToolbar from '@/ckeditor/ckeditor5-video/src/videotoolbar'
// import VideoStyle from '@/ckeditor/ckeditor5-video/src/videostyle'
// import VideoInsert from '@/ckeditor/ckeditor5-video/src/videoinsert'

// import Video from '@visao/ckeditor5-video/src/video'
// import VideoResize from '@visao/ckeditor5-video/src/videoresize'
// import VideoToolbar from '@visao/ckeditor5-video/src/videotoolbar'
// import VideoStyle from '@visao/ckeditor5-video/src/videostyle'
// import VideoInsert from '@visao/ckeditor5-video/src/videoinsert'
import LocalVideoUpload, {
  VideoUpload,
  VideoUploadEditing,
} from '@/plugins/ckeditor/localVideoUpload.js'
import {
  ClassicEditor,
  Alignment,
  Autoformat,
  AutoImage,
  AutoLink,
  Autosave,
  Base64UploadAdapter,
  BalloonToolbar,
  BlockQuote,
  Bold,
  Bookmark,
  CloudServices,
  Code,
  Emoji,
  Essentials,
  FindAndReplace,
  FontBackgroundColor,
  FontColor,
  FontFamily,
  FontSize,
  FullPage,
  Fullscreen,
  GeneralHtmlSupport,
  Heading,
  Highlight,
  HorizontalLine,
  HtmlComment,
  HtmlEmbed,
  HtmlEmbedEditing,
  ImageBlock,
  ImageCaption,
  ImageEditing,
  ImageInline,
  ImageInsert,
  ImageInsertViaUrl,
  ImageStyle,
  ImageToolbar,
  ImageUpload,
  ImageUtils,
  Indent,
  IndentBlock,
  Italic,
  Link,
  LinkImage,
  List,
  ListProperties,
  Markdown,
  MediaEmbed,
  Mention,
  PageBreak,
  Paragraph,
  PasteFromMarkdownExperimental,
  PasteFromOffice,
  PlainTableOutput,
  RemoveFormat,
  ShowBlocks,
  SimpleUploadAdapter,
  SourceEditing,
  SpecialCharacters,
  SpecialCharactersArrows,
  SpecialCharactersCurrency,
  SpecialCharactersEssentials,
  SpecialCharactersLatin,
  SpecialCharactersMathematical,
  SpecialCharactersText,
  Strikethrough,
  Subscript,
  Superscript,
  Table,
  TableCaption,
  TableCellProperties,
  TableColumnResize,
  TableLayout,
  TableProperties,
  TableToolbar,
  TextPartLanguage,
  TextTransformation,
  Title,
  TodoList,
  // Video,
  // VideoUpload,
  Underline,
  WordCount,
} from 'ckeditor5'

import 'ckeditor5/ckeditor5.css'

/**
 * Create a free account with a trial: https://portal.ckeditor.com/checkout?plan=free
 */
const LICENSE_KEY = 'GPL' // or <YOUR_LICENSE_KEY>.

const editorMenuBar = useTemplateRef('editorMenuBarElement')
const editorWordCount = useTemplateRef('editorWordCountElement')

const isLayoutReady = ref(false)

const editor = ClassicEditor

const editorData = ref(``)

const config = computed(() => {
  if (!isLayoutReady.value) {
    return null
  }

  return {
    toolbar: {
      items: [
        'undo',
        'redo',
        '|',
        'mediaEmbed',
        'videoUpload',
        'localVideoUpload',
        'sourceEditing',
        'showBlocks',
        '|',
        'heading',
        '|',
        'fontSize',
        'fontFamily',
        'fontColor',
        'fontBackgroundColor',
        '|',
        'bold',
        'italic',
        'underline',
        '|',
        'link',
        'insertTable',
        'insertTableLayout',
        'highlight',
        'blockQuote',
        '|',
        'alignment',
        '|',
        'bulletedList',
        'numberedList',
        'todoList',
        'outdent',
        'indent',
      ],
      shouldNotGroupWhenFull: false,
    },
    mediaEmbed: {},
    builtinPlugins: [dropEvent],
    extraPlugins: [VideoUploadAdapterPlugin],
    plugins: [
      LocalVideoUpload,
      VideoUpload,
      VideoUploadEditing,
      Alignment,
      Autoformat,
      AutoImage,
      AutoLink,
      Autosave,
      BalloonToolbar,
      Base64UploadAdapter,
      BlockQuote,
      Bold,
      Bookmark,
      CloudServices,
      Code,
      Emoji,
      Essentials,
      FindAndReplace,
      FontBackgroundColor,
      FontColor,
      FontFamily,
      FontSize,
      FullPage,
      Fullscreen,
      GeneralHtmlSupport,
      Heading,
      Highlight,
      HorizontalLine,
      HtmlComment,
      HtmlEmbed,
      HtmlEmbedEditing,
      ImageBlock,
      ImageCaption,
      ImageEditing,
      ImageInline,
      ImageInsert,
      ImageInsertViaUrl,
      ImageStyle,
      ImageToolbar,
      ImageUpload,
      ImageUtils,
      Indent,
      IndentBlock,
      Italic,
      Link,
      LinkImage,
      List,
      ListProperties,
      Markdown,
      MediaEmbed,
      Mention,
      MyCustomUploadAdapterPlugin,
      PageBreak,
      Paragraph,
      PasteFromMarkdownExperimental,
      PasteFromOffice,
      PlainTableOutput,
      RemoveFormat,
      SimpleUploadAdapter,
      ShowBlocks,
      SourceEditing,
      SpecialCharacters,
      SpecialCharactersArrows,
      SpecialCharactersCurrency,
      SpecialCharactersEssentials,
      SpecialCharactersLatin,
      SpecialCharactersMathematical,
      SpecialCharactersText,
      Strikethrough,
      Subscript,
      Superscript,
      Table,
      TableCaption,
      TableCellProperties,
      TableColumnResize,
      TableLayout,
      TableProperties,
      TableToolbar,
      TextPartLanguage,
      TextTransformation,
      Title,
      TodoList,
      // VideoToolbar,
      // Video,
      // VideoUpload,
      // VideoResize,
      // VideoStyle,
      // VideoInsert,
      // VideoUploadAdapterPlugin,
      ulpoadAdapterDropPlugin,
      Underline,
      WordCount,
    ],
    video: {
      upload: {
        types: ['mp4'],
        allowMultipleFiles: true,
      },
      styles: ['alignLeft', 'alignCenter', 'alignRight'],

      // Configure the available video resize options.
      resizeOptions: [
        {
          name: 'videoResize:original',
          label: 'Original',
          icon: 'original',
        },
        {
          name: 'videoResize:50',
          label: '50',
          icon: 'medium',
        },
        {
          name: 'videoResize:75',
          label: '75',
          icon: 'large',
        },
      ],
      htmlSupport: {
        // Если используете `@ckeditor/ckeditor5-html-support`
        allow: [
          {
            name: 'video',
            attributes: ['src', 'controls'],
          },
        ],
      },

      // You need to configure the video toolbar, too, so it shows the new style
      // buttons as well as the resize buttons.
      toolbar: [
        'videoUpload',
        'videoStyle:alignLeft',
        'videoStyle:alignCenter',
        'videoStyle:alignRight',
        '|',
        'videoResize:50',
        'videoResize:75',
        'videoResize:original',
      ],
    },
    videoUpload: {
      uploadUrl: {
        url: null, // Ваш эндпоинт загрузки,
        heders: {}
      } ,
      toolbar: true, // Показывать кнопку в тулбаре
    },
    localVideoUpload: {
      maxSize: 10
    },
    balloonToolbar: ['bold', 'italic', '|', 'link', '|', 'bulletedList', 'numberedList'],
    fontFamily: {
      supportAllValues: true,
    },
    fontSize: {
      options: [10, 12, 14, 'default', 18, 20, 22],
      supportAllValues: true,
    },
    fullscreen: {
      onEnterCallback: (container) =>
        container.classList.add(
          'editor-container',
          'editor-container_classic-editor',
          'editor-container_include-word-count',
          'editor-container_include-fullscreen',
          'main-container',
        ),
    },
    heading: {
      options: [
        {
          model: 'paragraph',
          title: 'Paragraph',
          class: 'ck-heading_paragraph',
        },
        {
          model: 'heading1',
          view: 'h1',
          title: 'Heading 1',
          class: 'ck-heading_heading1',
        },
        {
          model: 'heading2',
          view: 'h2',
          title: 'Heading 2',
          class: 'ck-heading_heading2',
        },
        {
          model: 'heading3',
          view: 'h3',
          title: 'Heading 3',
          class: 'ck-heading_heading3',
        },
        {
          model: 'heading4',
          view: 'h4',
          title: 'Heading 4',
          class: 'ck-heading_heading4',
        },
        {
          model: 'heading5',
          view: 'h5',
          title: 'Heading 5',
          class: 'ck-heading_heading5',
        },
        {
          model: 'heading6',
          view: 'h6',
          title: 'Heading 6',
          class: 'ck-heading_heading6',
        },
      ],
    },
    htmlSupport: {
      allow: [
        {
          name: /^.*$/,
          styles: true,
          attributes: true,
          classes: true,
        },
      ],
    },
    image: {
      toolbar: [
        'toggleImageCaption',
        '|',
        'imageStyle:inline',
        'imageStyle:wrapText',
        'imageStyle:breakText',
      ],
    },
    initialData:
      '<h2>Congratulations on setting up CKEditor 5! 🎉</h2>\n<p>\n\tYou\'ve successfully created a CKEditor 5 project. This powerful text editor\n\twill enhance your application, enabling rich text editing capabilities that\n\tare customizable and easy to use.\n</p>\n<h3>What\'s next?</h3>\n<ol>\n\t<li>\n\t\t<strong>Integrate into your app</strong>: time to bring the editing into\n\t\tyour application. Take the code you created and add to your application.\n\t</li>\n\t<li>\n\t\t<strong>Explore features:</strong> Experiment with different plugins and\n\t\ttoolbar options to discover what works best for your needs.\n\t</li>\n\t<li>\n\t\t<strong>Customize your editor:</strong> Tailor the editor\'s\n\t\tconfiguration to match your application\'s style and requirements. Or\n\t\teven write your plugin!\n\t</li>\n</ol>\n<p>\n\tKeep experimenting, and don\'t hesitate to push the boundaries of what you\n\tcan achieve with CKEditor 5. Your feedback is invaluable to us as we strive\n\tto improve and evolve. Happy editing!\n</p>\n<h3>Helpful resources</h3>\n<ul>\n\t<li>📝 <a href="https://portal.ckeditor.com/checkout?plan=free">Trial sign up</a>,</li>\n\t<li>📕 <a href="https://ckeditor.com/docs/ckeditor5/latest/installation/index.html">Documentation</a>,</li>\n\t<li>⭐️ <a href="https://github.com/ckeditor/ckeditor5">GitHub</a> (star us if you can!),</li>\n\t<li>🏠 <a href="https://ckeditor.com">CKEditor Homepage</a>,</li>\n\t<li>🧑‍💻 <a href="https://ckeditor.com/ckeditor-5/demo/">CKEditor 5 Demos</a>,</li>\n</ul>\n<h3>Need help?</h3>\n<p>\n\tSee this text, but the editor is not starting up? Check the browser\'s\n\tconsole for clues and guidance. It may be related to an incorrect license\n\tkey if you use premium features or another feature-related requirement. If\n\tyou cannot make it work, file a GitHub issue, and we will help as soon as\n\tpossible!\n</p>\n',
    licenseKey: LICENSE_KEY,
    link: {
      addTargetToExternalLinks: true,
      defaultProtocol: 'https://',
      decorators: {
        toggleDownloadable: {
          mode: 'manual',
          label: 'Downloadable',
          attributes: {
            download: 'file',
          },
        },
      },
    },
    list: {
      properties: {
        styles: true,
        startIndex: true,
        reversed: true,
      },
    },
    mention: {
      feeds: [
        {
          marker: '@',
          feed: [
            /* See: https://ckeditor.com/docs/ckeditor5/latest/features/mentions.html */
          ],
        },
      ],
    },
    menuBar: {
      isVisible: true,
    },
    placeholder: 'Type or paste your content here!',
    table: {
      contentToolbar: [
        'tableColumn',
        'tableRow',
        'mergeTableCells',
        'tableProperties',
        'tableCellProperties',
      ],
    },
  }
})

onMounted(() => {
  isLayoutReady.value = true
})

function onReady(editor) {
  ;[...editorWordCount.value.children].forEach((child) => child.remove())
  // ;[...editorMenuBar.value.children].forEach((child) => child.remove())

  const wordCount = editor.plugins.get('WordCount')
  // const localVideoUpload = editor.plugins.get('LocalVideoUpload')
  editorWordCount.value.appendChild(wordCount.wordCountContainer)

  // editorMenuBar.value.appendChild(editor.ui.view.menuBarView.element)
  console.log('onReady(editor) editor', editor)
  // console.log('localVideoUpload', localVideoUpload)
  // localVideoUpload.on('videoInserted', (data) => {
  //   console.log('Видео было вставлено через плагин:', data)
  // })
}

// ClassicEditor.create(document.querySelector('#editor'), {
//   plugins: [Video, VideoUpload],
//   extraPlugins: [VideoUploadAdapterPlugin],
//   toolbar: ['videoUpload'],
//   video: {
//     upload: {
//       types: ['mp4', 'mpeg'],
//       allowMultipleFiles: false,
//     },
//   },
// })

class MyUploadAdapter {
  constructor(loader) {
    // The file loader instance to use during the upload.
    this.loader = loader
  }

  // Starts the upload process.
  upload() {
    return this.loader.file.then(
      (file) =>
        new Promise((resolve, reject) => {
          console.log('file', file)
          this._initRequest()
          this._initListeners(resolve, reject, file)
          this._sendRequest(file)
        }),
    )
  }

  // Aborts the upload process.
  abort() {
    if (this.xhr) {
      this.xhr.abort()
    }
  }

  // Initializes the XMLHttpRequest object using the URL passed to the constructor.
  _initRequest() {
    const xhr = (this.xhr = new XMLHttpRequest())

    // Note that your request may look different. It is up to you and your editor
    // integration to choose the right communication channel. This example uses
    // a POST request with JSON as a data structure but your configuration
    // could be different.
    xhr.open('POST', 'http://example.com/image/upload/path', true)
    xhr.responseType = 'json'
  }

  // Initializes XMLHttpRequest listeners.
  _initListeners(resolve, reject, file) {
    const xhr = this.xhr
    const loader = this.loader
    const genericErrorText = `Couldn't upload file: ${file.name}.`

    xhr.addEventListener('error', () => reject(genericErrorText))
    xhr.addEventListener('abort', () => reject())
    xhr.addEventListener('load', () => {
      const response = xhr.response

      // This example assumes the XHR server's "response" object will come with
      // an "error" which has its own "message" that can be passed to reject()
      // in the upload promise.
      //
      // Your integration may handle upload errors in a different way so make sure
      // it is done properly. The reject() function must be called when the upload fails.
      if (!response || response.error) {
        return reject(response && response.error ? response.error.message : genericErrorText)
      }

      // If the upload is successful, resolve the upload promise with an object containing
      // at least the "default" URL, pointing to the image on the server.
      // This URL will be used to display the image in the content. Learn more in the
      // UploadAdapter#upload documentation.
      resolve({
        default: response.url,
      })
    })

    // Upload progress when it is supported. The file loader has the #uploadTotal and #uploaded
    // properties which are used e.g. to display the upload progress bar in the editor
    // user interface.
    if (xhr.upload) {
      xhr.upload.addEventListener('progress', (evt) => {
        if (evt.lengthComputable) {
          loader.uploadTotal = evt.total
          loader.uploaded = evt.loaded
        }
      })
    }
  }

  // Prepares the data and sends the request.
  _sendRequest(file) {
    // Prepare the form data.
    const data = new FormData()

    data.append('upload', file)
    console.log('file', file)

    // Important note: This is the right place to implement security mechanisms
    // like authentication and CSRF protection. For instance, you can use
    // XMLHttpRequest.setRequestHeader() to set the request headers containing
    // the CSRF token generated earlier by your application.

    // Send the request.
    this.xhr.send(data)
  }
}

class UploadDrop {
  constructor(loader) {
    // The file loader instance to use during the upload.
    this.loader = loader
  }

  // Starts the upload process.
  upload() {
    console.log('aaaa', this.loader)
  }
}
function dropEvent(editor) {
  editor.editing.view.document.on(
    'drop',
    async (evt, data) => {
      // Stop execute next callbacks.
      evt.stop()
      console.log('dropppppp', data)
      /**@TODO API*/

      const content = `<a href=""/>link file</a>`
      const viewFragment = editor.data.processor.toView(content)
      const modelFragment = editor.data.toModel(viewFragment)

      editor.model.insertContent(modelFragment, editor.model.document.selection)

      // Stop the default event action.
      data.preventDefault()
    },
    { priority: 'high' },
  )

  editor.editing.view.document.on(
    'dragover',
    (evt, data) => {
      evt.stop()
      data.preventDefault()
    },
    { priority: 'high' },
  )
}

function MyCustomUploadAdapterPlugin(editor) {
  editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
    // Configure the URL to the upload script in your back-end here!
    return new MyUploadAdapter(loader)
  }
}

function ulpoadAdapterDropPlugin(editor) {
  editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
    return new UploadDrop(loader)
  }
}

// В адаптере загрузки
// class VideoUploadAdapter {
//   constructor(loader) {
//     this.loader = loader
//     this.loader.file.then((file) => {
//       console.log('VideoUploadAdapter file', file)
//       if (!file.type.startsWith('video/')) {
//         throw new Error('Only video files are allowed')
//       }
//       if (file.size > 10 * 1024 * 1024) {
//         // 10MB
//         throw new Error('File size exceeds 10MB limit')
//       }
//     })
//   }
//   // ... остальной код
// }

class VideoUploadAdapter {
  constructor(loader) {
    this.loader = loader
  }

  upload() {
    const uploadVideo = async (file) => {
      this.loader.uploaded = false
      return new Promise((resolve) => {
        setTimeout(() => {
          this.loader.uploaded = true
          resolve({
            default:
              'https://file-examples-com.github.io/uploads/2017/04/file_example_MP4_480_1_5MG.mp4',
          })
        }, 2000)
      })
    }

    return this.loader.file.then((file) => uploadVideo(file))
  }

  abort() {
    return Promise.reject()
  }
}

function VideoUploadAdapterPlugin(editor) {
  editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
    return new VideoUploadAdapter(loader)
  }
}

// editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
//   ret

// ClassicEditor.create(document.querySelector('#editor'), {
//   plugins: [LocalVideoUpload /* другие плагины */],
//   toolbar: ['localVideoUpload' /* другие кнопки */],
// })
//   .then((editor) => {
//     console.log('Editor готов!', editor)
//   })
//   .catch((error) => {
//     console.error('Ошибка инициализации:', error)
//   })

function onEditorInput(e) {
  console.log('e', e)
  console.log('config.value.initialData', config.value?.initialData)
}
watch(
  config,
  () => {
    console.log('config.value.initialData', config.value?.initialData)
  },
  { deep: true },
)
</script>
