import { effectScope, type EffectScope } from 'vue'

export function createSharedComposable<F extends any>(composable: F): ReturnType<F> {
  let subscribers = 0
  let state: ReturnType<Fn> | undefined
  let scope: EffectScope | undefined

  const dispose = () => {
    subscribers -= 1
    if (scope && subscribers <= 0) {
      scope.stop()
      state = undefined
      scope = undefined
    }
  }
  // return <Fn>((...args) => {
  //   subscribers += 1
  //   if (!scope) {
  //     scope = effectScope(true)
  //     state = scope.run(() => composable(...args))
  //   }
  //   tryOnScopeDispose(dispose)
  //   return state
  // })
}
