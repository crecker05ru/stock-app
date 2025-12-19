import { computed, ref, watchEffect } from 'vue'

export type ValidationRule<T = unknown> = {
  validator: (value: T) => boolean
  message: string
}

export type ValidationRules<T extends Record<string, unknown>> = {
  [K in keyof T]?: ValidationRule<T[K]>[]
}

export type ValidationErrros<T extends Record<string, unknown>> = {
  [K in keyof T]: string | null
}

export function useValidation<T extends Record<string, unknown>>(
  form: T,
  rules: ValidationRules<T>,
) {
  const errors = ref(
    Object.keys(form).reduce((acc, key) => {
      acc[key as keyof T] = null
      return acc
    }, {} as ValidationErrros<T>),
  )
  const isValid = computed(() => {
    return Object.values(errors.value).every((error) => !error)
  })

  const hasErrors = computed(() => {
    return Object.values(errors.value).some((error) => !!error)
  })

  function validateField(field: keyof T) {
    const fieldRules = rules[field]
    if (!fieldRules) {
      errors.value[field] = null
      return true
    }

    for (const rule of fieldRules) {
      if (!rule.validator(form[field])) {
        errors.value[field] = rule.message
        return false
      }
    }
    errors.value[field] = null
    return true
  }

  function validateAll() {
    let isValid = true
    for (const field in form) {
      if (!validateField(field)) {
        isValid = false
      }
    }
    return isValid
  }

  watchEffect(() => {
    validateAll()
  })

  return {
    form,
    isValid,
    hasErrors,
    validateField,
    validateAll,
  }
}

export const validationRules = {
  email: (message = 'Invalid'): ValidationRule<string> => ({
    validator: (value: string) => /.+@@\..@/.test(value),
    message,
  }),
}
