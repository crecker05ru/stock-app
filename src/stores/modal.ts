import { defineStore } from 'pinia'
import { ref, markRaw } from 'vue'

export type Modal = {
  isOpened: boolean
  component?: object | null
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

  function open({ component, data, events, props }: Modal) {
    modal.value = {
      ...modal.value,
      isOpened: true,
      component: markRaw(component),
      // component,
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
