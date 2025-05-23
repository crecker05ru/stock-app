import { Plugin } from 'ckeditor5'
import { WidgetToolbarRepository } from 'ckeditor5'
import { getSelectedVideoWidget } from './video/utils'

export default class VideoToolbar extends Plugin {
  static get requires() {
    return [WidgetToolbarRepository]
  }

  static get pluginName() {
    return 'VideoToolbar'
  }

  afterInit() {
    const editor = this.editor
    const t = editor.t
    const widgetToolbarRepository = editor.plugins.get(WidgetToolbarRepository)

    widgetToolbarRepository.register('video', {
      ariaLabel: t('Video toolbar'),
      items: editor.config.get('video.toolbar') || [],
      getRelatedElement: getSelectedVideoWidget,
    })
  }
}
