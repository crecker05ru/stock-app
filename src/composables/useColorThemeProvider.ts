import {
  computed,
  inject,
  provide,
  toValue,
  type InjectionKey,
  type MaybeRef,
  type MaybeRefOrGetter,
} from 'vue'

const colorThemeKey: InjectionKey<MaybeRefOrGetter<string>> = Symbol('colorTheme')
export function useColorThemeProvider(theme: MaybeRefOrGetter<string>) {
  provide(colorThemeKey, theme)
}

export function useColorTheme() {
  const colorThemeRaw = inject(colorThemeKey)
  if (!colorThemeKey) {
    throw new Error('Color theme is not provided')
  }
  const colorTheme = computed(() => toValue(colorThemeRaw))
  return colorTheme
}
