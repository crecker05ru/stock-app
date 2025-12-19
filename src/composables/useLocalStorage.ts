import { toValue, watch, type Ref } from 'vue'

export function useLocalStorage<T extends Ref>(
  key: string,
  value: T,
): {
  value: T
  setValue: (val: Ref) => void
} {
  function setValue(val: Ref): void {
    try {
      localStorage.setItem(key, toValue(val))
    } catch {
      console.error('setValue')
    }
  }

  watch(value, (newVal) => {
    localStorage.setItem(key, toValue(newVal))
  })

  return {
    value,
    setValue,
  }
}
