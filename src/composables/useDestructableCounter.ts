import { count } from 'console'
import { ref } from 'vue'
//vueuse makeDestructable
export function useCounter() {
  const counter = ref(0)
  function increment() {
    counter.value++
  }

  // return makeDestructable(
  //   [count, increment] as const,
  //   {count, increment} as count
  // )
}
