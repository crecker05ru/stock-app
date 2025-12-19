function reduce<F, S>(
  cb: (accumulator: S, currentValue: F, index?: number, array?: [F]) => [S],
  initial: [S],
) {
  initial.forEach((element) => {
    accumulator = cb(accumulator, element)
  })
}

// function reduce(callback, initialVal) {
//   var accumulator = ( initialVal === undefined) ? this[0] : initialVal;
//   var start = (initialVal === undefined) ? 1 : 0
//   for (var i = start; i < this.length; i++) {
//       accumulator = callback(accumulator, this[i])
//   }
//   return accumulator;
// };

function customReduce(array, callbackFn, initialValue) {
  let accumulator = initialValue
  let startIndex = 0

  if (initialValue === undefined) {
    if (array.length === 0) {
      throw new TypeError('Reduce of empty array with no initial value')
    }
    accumulator = array[0]
    startIndex = 1
  }

  for (let i = startIndex; i < array.length; i++) {
    accumulator = callbackFn(accumulator, array[i], i, array)
  }

  return accumulator
}

function typedCustomReduce<F, S>(
  array: F[],
  callbackFn: (accumulator: S, item: F, index: number, arr: [F]) => S,
  initialValue?: S,
): S {
  let accumulator = initialValue
  let startIndex = 0

  if (initialValue === undefined) {
    if (array.length === 0) {
      throw new TypeError('Reduce of empty array with no initial value')
    }
    accumulator = array[0]
    startIndex = 1
  }

  for (let i = startIndex; i < array.length; i++) {
    accumulator = callbackFn(accumulator, array[i], i, array)
  } 

  return accumulator
}

// function reducer(array, callback, initializer) {
//   let accumulator = (initializer === undefined) ? 0 : initializer;

//   for (let i = 0; i < array.length; i++) {
//     accumulator = callback(accumulator, array[i]);
//   }

//   return accumulator;
// }

// Generic reducer function
function safeReduce<T, R>(
  array: T[],
  reducer: (accumulator: R, item: T, index: number) => R,
  initialValue: R,
): R {
  return array.reduce(reducer, initialValue)
}

export { reduce }
