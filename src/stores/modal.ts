import { defineStore } from 'pinia'
import { ref, markRaw } from 'vue'

export type Modal = {
  isOpened: boolean
  component?: object | null
  componentName?: string | null
  data?: object | null
  events?: ModalEvents[]
  props: object
}

export type ModalEvents = {
  label: string
  callback: (props?: object) => void
}

export const useModalStore = defineStore('modal', () => {
  const modal = ref<Modal>({
    isOpened: false,
    component: null,
    data: {},
    events: [],
    props: {},
  })

  function open({ component = null, componentName, data, events, props }: Modal) {
    modal.value = {
      ...modal.value,
      isOpened: true,
      component: component ? markRaw(component) : component,
      componentName,
      data,
      events,
      props,
    }
  }

  function close() {
    modal.value = {
      ...modal.value,
      isOpened: false,
      component: null,
      componentName: null,
      data: {},
      events: [],
      props: {},
    }
  }

  return {
    modal,
    open,
    close,
  }
})
