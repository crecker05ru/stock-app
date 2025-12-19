<template>
  <div
    :class="[
      'date-select__wrapper',
      !!error_message || !!inputErrorMessage ? 'date-select__wrapper_error' : '',
    ]"
  >
    <div class="date-select__buttons-select" v-if="!isTextInput">
      <div
        :class="{
          'date-select': true,
          'datepicker-disabled': disabled,
        }"
        v-on-click-outside="closeMenu"
      >
        <div v-if="label" class="date-select__label">
          {{ label }}
          <span class="date-select__required" v-show="$props?.required">*</span>
        </div>
        <div
          ref="_date_select"
          :class="{
            'date-select__button': true,
            'date-select__button_opened': isOpened,
            'date-select__button_large': large,
          }"
          @click="switchSelect()"
        >
          <div
            :class="{
              'date-select__inner-text': true,
              'date-select__inner-text_gray': hideArrow,
            }"
          >
            <template v-if="yearPicker">
              {{ modelValue }}
            </template>
            <template v-else-if="monthPicker">
              {{
                getMonthString(modelValue?.month) === 'Not a month number'
                  ? ''
                  : getMonthString(modelValue?.month + 1)
              }}
            </template>
            <template v-else-if="!isTime">
              {{
                dateValue && (Array.isArray(dateValue) ? dateValue.length > 0 : true) && hideArrow
                  ? formatPlaceholderDate(dateValue)
                  : placeholder
              }}
            </template>
            <template v-else-if="isTime && dateValue?.hours">
              {{ dateValue && hideArrow ? `${dateValue.hours}:${dateValue.minutes}` : placeholder }}
            </template>
            <template v-else>
              {{ dateValue && hideArrow ? modelValue : placeholder }}
            </template>
          </div>
          <div
            v-if="additionalLabel"
            class="date-select__additonal-label"
            @click.stop="$emit('additionalLabelClick')"
          >
            {{ additionalLabel }}
          </div>
          <icon-arrow-down
            v-if="!hideArrow"
            :class="{
              'date-select__arrow-icon': true,
              'date-select__arrow-icon_opened': isOpened,
            }"
          />
        </div>
        <transition name="fade" mode="out-in">
          <div v-if="isOpened" class="date-select__list" :style="_DATE_SELECT_STYLES">
            <datepicker
              ref="_date_picker"
              v-if="!isTime"
              inline
              :range="isRange"
              :min-date="limitPast"
              :max-date="limitFuture"
              :year-picker="yearPicker"
              :month-picker="monthPicker"
              locale="ru"
              select-text="Применить"
              cancel-text="Сбросить"
              :enable-time-picker="false"
              :preview-format="formatPreview"
              @update:model-value="setNewValue"
              calendar-cell-class-name="dp-custom-cell"
              menu-class-name="dp-custom-menu"
              calendar-class-name="dp-custom-calendar"
              v-model="dateValue"
            >
              <template #action-preview="{ value }">
                <div v-if="value?.[0]" class="date-select__picked-date-wrapper">
                  <div class="date-select__picked-date-title">Указанный период:</div>
                  <div class="date-select__picked-date">
                    {{ formatDateNoTimeText(value?.[0]) }} -
                    {{ formatDateNoTimeText(value?.[1]) }}
                  </div>
                </div>
              </template>
              <template #action-buttons>
                <div class="dp__action_button dp__action_cancel" @click="cancelDate">Сбросить</div>
                <div class="dp__action_button dp__action_select" @click="selectDate">Применить</div>
              </template>
            </datepicker>
            <datepicker
              v-else
              inline
              time-picker
              locale="ru"
              :min-time="limitPastTime"
              select-text="Применить"
              cancel-text="Сбросить"
              calendar-cell-class-name="dp-custom-cell"
              menu-class-name="dp-custom-menu"
              calendar-class-name="dp-custom-calendar"
              v-model="dateValue"
              @update:model-value="setNewTimeValue"
            >
              <template #action-preview="{ value }" />
            </datepicker>
          </div>
        </transition>
      </div>
    </div>
    <div v-else :class="{ 'date-select__text-input': true, 'datepicker-disabled': disabled }">
      <datepicker
        v-if="!isTime"
        ref="_date_picker"
        v-model="dateValue"
        locale="ru"
        select-text="Применить"
        cancel-text="Сбросить"
        calendar-cell-class-name="dp-custom-cell"
        menu-class-name="dp-custom-menu"
        calendar-class-name="dp-custom-calendar"
        :enable-time-picker="true"
        :text-input="textInputDateOptions"
        :esc-close="true"
        :range="isRange"
        :min-date="limitPast"
        :max-date="limitFuture"
        :year-picker="yearPicker"
        :month-picker="monthPicker"
        :preview-format="formatPreview"
        display-format="dd.mm.yyyy"
        @update:model-value="setNewValue"
      >
        <template
          #dp-input="{
            value,
            onInput,
            onEnter,
            onTab,
            onClear,
            onBlur,
            onKeypress,
            onPaste,
            toggleMenu,
            openMenu,
            closeMenu,
            isMenuOpen,
          }"
        >
          <div class="date-select__calendar">
            <input
              ref="inputDateElement"
              class="date-select__calendar-input"
              type="text"
              :value="formatDate(value)"
              :placeholder="placeholder"
              inputmode="numeric"
              @blur="(e) => enterNewValue(e, e?.target?.value)"
              @keypress.enter="(e) => enterNewValue(e, e?.target?.value)"
              @keydown="onKeydownDate"
              @input="(e) => debounce(() => enterNewValue(e, e?.target?.value))"
            />
            <div class="dp__input_icons">
              <icon-calendar @click="toggleMenu" class="date-select__calendar-icon" />
            </div>
          </div>
        </template>
        <template #clear-icon="{ clear }"> </template>
        <template #action-preview="{ value }">
          <div v-if="value?.[0]" class="date-select__picked-date-wrapper">
            <div class="date-select__picked-date-title">Указанный период:</div>
            <div class="date-select__picked-date">
              {{ formatDateNoTimeText(value?.[0]) }} -
              {{ formatDateNoTimeText(value?.[1]) }}
            </div>
          </div>
        </template>
        <template #action-buttons>
          <div class="dp__action_button dp__action_cancel" @click="cancelDate">Сбросить</div>
          <div class="dp__action_button dp__action_select" @click="selectDate">Применить</div>
        </template>
      </datepicker>
      <datepicker
        v-else
        time-picker
        locale="ru-RU"
        :min-time="limitPastTime"
        v-model="dateValue"
        :enable-time-picker="true"
        :is-24="true"
        :text-input="textInputClocksOptions"
        :esc-close="true"
        :format="format"
        select-text="Применить"
        cancel-text="Сбросить"
        calendar-cell-class-name="dp-custom-cell"
        menu-class-name="dp-custom-menu"
        calendar-class-name="dp-custom-calendar"
        @update:model-value="setNewTimeValue"
      >
        <template
          #dp-input="{
            value,
            onInput,
            onEnter,
            onTab,
            onClear,
            onBlur,
            onKeypress,
            onPaste,
            toggleMenu,
            isMenuOpen,
          }"
        >
          <div class="date-select__clocks">
            <input
              ref="inputTimeElement"
              class="date-select__clocks-input"
              type="text"
              :value="dateValue"
              :placeholder="placeholder"
              inputmode="numeric"
              @blur="(e) => enterNewTimeValue(e, e?.target?.value)"
              @keypress.enter="(e) => enterNewTimeValue(e, e?.target?.value)"
              @keydown="onKeydownTime"
              @input="(e) => debounce(() => enterNewTimeValue(e, e?.target?.value))"
            />
            <div class="dp__input_icons">
              <icon-clocks @click="toggleMenu" class="date-select__clocks-icon" />
            </div>
          </div>
        </template>
        <template #clear-icon="{ clear }"> </template>
        <template #action-preview="{ value }" />
      </datepicker>
    </div>
    <div v-if="inputErrorMessage" class="date-select__error">
      {{ inputErrorMessage }}
    </div>
    <div v-if="error_message" class="date-select__error">
      {{ error_message }}
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { vOnClickOutside } from '@vueuse/components'
import IconArrowDown from '@/components/ui/icons/IconArrowDown.vue'
import IconCalendar from '@/components/ui/icons/IconCalendar.vue'
import IconClocks from '@/components/ui/icons/IconClocks.vue'
import { useDateFormatter } from '@/js/composables/dateFormatter.js'
import { useDebounce } from '@/js/composables/debounce'
const props = defineProps({
  fields: {
    type: Array,
    default: () => [],
  },
  placeholder: {
    type: String,
    default: 'Период',
  },
  modelValue: {
    type: [Array, Date, String],
    default: () => [],
  },
  label: {
    type: String,
    default: null,
  },
  error_message: {
    type: String,
    default: null,
  },
  hideArrow: {
    type: Boolean,
    default: false,
  },
  large: {
    type: Boolean,
    default: false,
  },
  isRange: {
    type: Boolean,
    default: true,
  },
  isTime: {
    type: Boolean,
    default: false,
  },
  required: {
    type: Boolean,
    default: false,
  },
  limitPast: {
    type: [Date, String],
    default: '',
  },
  limitFuture: {
    type: [Date, String],
    default: '',
  },
  limitPastTime: {
    type: [Object, String],
    default: () => {},
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  yearPicker: {
    type: Boolean,
    default: false,
  },
  monthPicker: {
    type: Boolean,
    default: false,
  },
  additionalLabel: {
    type: String,
    default: null,
  },
  isTextInput: {
    type: Boolean,
    default: true,
  },
})
const emit = defineEmits([
  'input',
  'update:modelValue',
  'validate',
  'dateSelect',
  'additionalLabelClick',
  'inputError',
])

const _date_picker = ref(null)
const _date_select = ref(null)
const _DATE_SELECT_STYLES = ref({})
const inputDateElement = ref()
const inputTimeElement = ref()
const { formatDateNoTimeText, getMonthString } = useDateFormatter()
const { debounce } = useDebounce()
const isOpened = ref(false)
const inputArray = ref([])

const dateValue = ref(null)
const dateTime = ref(null)
const selectFilter = ref('')
const regExp = /[^0-9.:/]/i
// const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[0-2])\.\d{4}$/;
const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[0-2])\.(19[0-9]{2}|20\d{2}|2100)$/
const timeRegex = /^(?:[01]\d|2[0-3]):[0-5]\d$/
const inputErrorMessage = ref('')

const formatDate = (date) => {
  if (!date) return ''
  const d = new Date(date)
  const day = String(d.getDate()).padStart(2, '0')
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const year = d.getFullYear()
  return `${day}.${month}.${year}`
}

const inputFormatDate = (text) => {
  const cleaned = text.replace(/\D/g, '')
  let masked = ''

  if (cleaned.length > 0) {
    masked = cleaned.substring(0, 2)

    if (cleaned.length > 2) {
      masked += '.' + cleaned.substring(2, 4)
    }

    if (cleaned.length > 4) {
      masked += '.' + cleaned.substring(4, 8)
    }
  }
  console.log('format: (text)', text)

  return masked
}

const inputFormatTime = (text) => {
  if (!time) return ''

  const date = new Date(time)
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')

  return `${hours}:${minutes}`
}

const formatTime = (time) => {
  const cleaned = text.replace(/\D/g, '')
  let masked = ''

  if (cleaned.length > 0) {
    masked = cleaned.substring(0, 2)

    if (cleaned.length > 2) {
      masked += ':' + cleaned.substring(2, 4)
    }
  }

  const parts = masked.split(':')
  if (parts[0] && parseInt(parts[0]) > 23) {
    parts[0] = '23'
  }
  if (parts[1] && parseInt(parts[1]) > 59) {
    parts[1] = '59'
  }
  console.log('format: (text)', text)

  return parts.join(':')
}

const textInputDateOptions = ref({
  enterSubmit: true,
  openMenu: false,
  escClose: true,
  format: (text) => {
    const cleaned = text.replace(/\D/g, '')
    let masked = ''

    if (cleaned.length > 0) {
      masked = cleaned.substring(0, 2)

      if (cleaned.length > 2) {
        masked += '.' + cleaned.substring(2, 4)
      }

      if (cleaned.length > 4) {
        masked += '.' + cleaned.substring(4, 8)
      }
    }
    console.log('format: (text)', text)

    return masked
  },
  inputMode: 'numeric',
})

const textInputClocksOptions = ref({
  enterSubmit: true,
  openMenu: false,
  escClose: true,

  format: (text) => {
    const cleaned = text.replace(/\D/g, '')
    let masked = ''

    if (cleaned.length > 0) {
      masked = cleaned.substring(0, 2)

      if (cleaned.length > 2) {
        masked += ':' + cleaned.substring(2, 4)
      }
    }

    const parts = masked.split(':')
    if (parts[0] && parseInt(parts[0]) > 23) {
      parts[0] = '23'
    }
    if (parts[1] && parseInt(parts[1]) > 59) {
      parts[1] = '59'
    }
    console.log('format: (text)', text)

    return parts.join(':')
  },
  inputMode: 'numeric',
})

const dateFormat = (date) => {
  const day = date.getDate()
  const month = date.getMonth() + 1
  const year = date.getFullYear()

  return `${day}/${month}/${year}`
}

const handleDateChange = (newDate) => {
  dateTime.value = newDate
  emit('update:modelValue', newDate)
}

function cancelDate() {
  _date_picker.value.clearValue()
  emit('validate')
}

function selectDate() {
  _date_picker.value.selectDate()
  emit('validate')
}

function switchSelect() {
  isOpened.value = !isOpened.value

  if (isOpened.value === true) {
    const top_distance = _date_select.value?.getBoundingClientRect().top
    const bottom_distance = window.innerHeight - top_distance

    if (bottom_distance < 525) {
      if (top_distance < 450) {
        _DATE_SELECT_STYLES.value = {
          top: 'unset',
          bottom: props.label ? 'calc(100% - 124px)' : '100%',
        }
      } else {
        _DATE_SELECT_STYLES.value = {
          top: 'unset',
          bottom: props.label ? 'calc(100% - 24px)' : '100%',
        }
      }
    }
  }
}

function setNewValue(value) {
  let tempValue = value

  if (Array.isArray(value)) {
    tempValue = value.map((item, index) => {
      if (item !== null) {
        return index === 0
          ? new Date(new Date(item).setHours(0, 0, 1))
          : new Date(new Date(item).setHours(23, 59, 59))
      }
      return new Date(new Date(value[0]).setHours(23, 59, 59))
    })
  }

  emit('update:modelValue', tempValue)
  emit('dateSelect', tempValue)
  emit('input')
  emit('validate')
  switchSelect()
}

function createDateFromDdMmYyyy(dateString) {
  const parts = dateString.split('.')
  const day = parseInt(parts[0], 10)
  const month = parseInt(parts[1], 10) - 1
  const year = parseInt(parts[2], 10)

  return new Date(year, month, day)
}

function enterNewValue(event, value) {
  console.log('event?.inputType', event?.inputType)

  inputErrorMessage.value = ''
  let tempValue = typeof value === 'string' ? createDateFromDdMmYyyy(value) : value
  let dateString = typeof value === 'string' ? value : null
  console.log('dateString', dateString)
  console.log('tempValue', tempValue.getDate())
  let splittedString
  console.log('!dateRegex.test(dateString)', !dateRegex.test(value))
  if (dateString) {
    splittedString = dateString.split('.')
    if (Number(splittedString[0]) > 31) {
      splittedString[0] = '31'
    }
    if (Number(splittedString[1]) > 12) {
      splittedString[1] = '12'
    }
    if (splittedString[2]?.length === 4 && Number(splittedString[2]) > 2100) {
      splittedString[2] = '2100'
    }
    if (splittedString[2]?.length === 4 && Number(splittedString[2]) < 2020) {
      splittedString[2] = '2020'
    }
    console.log('splittedString[2]', splittedString[2])
    // dateString = splittedString[2]?.length > 3 ? `${splittedString[0]}.${splittedString[1]}.${splittedString[2]}` : `${splittedString[0]}.${splittedString[1]}.${dateString.substring(6)}`
    dateString = `${splittedString[0]}.${splittedString[1]}.${splittedString[2]}`
    tempValue = splittedString[2]?.length > 3 ? createDateFromDdMmYyyy(dateString) : tempValue
    console.log('dateString', dateString)
    console.log('tempValue', tempValue)
  }
  if (isNaN(tempValue)) {
    console.log('!dateRegex.test(value)', !dateRegex.test(value))
    emit('inputError')
    emit('validate')
    // inputErrorMessage.value = "Введено некорректное значение";
    return
  }
  if (
    dateString?.length < 8 ||
    (Number(splittedString?.[0]?.[0]) < 4 && !splittedString?.[0]?.[1]) ||
    (splittedString?.[1]?.[0] < 2 && !splittedString?.[1]?.[1]) ||
    splittedString?.[2]?.length < 4
  ) {
    return
  }

  // if (isNaN(tempValue) || splittedString?.[0]?.length < 1 || splittedString?.[1]?.length < 1 || splittedString?.[2]?.length < 4) {
  //   console.log('!dateRegex.test(value)',!dateRegex.test(value))
  //   emit("inputError");
  //   emit("validate");
  //   // inputErrorMessage.value = "Введено некорректное значение";
  //   return;
  // }

  if (Array.isArray(value)) {
    tempValue = value.map((item, index) => {
      if (item !== null) {
        return index === 0
          ? new Date(new Date(item).setHours(0, 0, 1))
          : new Date(new Date(item).setHours(23, 59, 59))
      }
      return new Date(new Date(value[0]).setHours(23, 59, 59))
    })
  }

  emit('update:modelValue', tempValue)
  emit('dateSelect', tempValue)
  emit('input')
  emit('validate')
  switchSelect()
}

let isDateAutoInputComplete = false
function onKeydownDate(event) {
  const value = event.target?.value
  const cursorPos = event.target?.selectionStart
  console.log('cursorPos', cursorPos)
  console.log('event?.key', event?.key)
  if (
    regExp.test(event?.key) &&
    event?.key !== 'Enter' &&
    event?.key !== 'Backspace' &&
    event?.key !== 'ArrowLeft' &&
    event?.key !== 'ArrowRight'
  ) {
    event.preventDefault()
  }
  if (
    (event.target?.value?.length > 9 &&
      event?.key !== 'Backspace' &&
      event?.key !== 'ArrowLeft' &&
      event?.key !== 'ArrowRight') ||
    event?.key === ':'
  ) {
    event.preventDefault()
  }
  // if (event?.key !== "Backspace") {
  //   // Auto-insert slashes
  //   let date
  //   if (value.length === 2 || value.length === 5) {
  //     if (value.length === 2 && cursorPos === 2) {
  //       date = value.substring(0, 2);
  //       if (Number(date) > 31) {
  //         date = "31";
  //       }
  //       let newVal = date;
  //       event.target.value = newVal + ".";
  //     } else if (value.length === 5 && cursorPos === 5) {
  //       let month = value.substring(3, 5);

  //       if (Number(month) > 12) {
  //         month = "12";
  //       }
  //       // if (Number(month) === 2 && Number(date) > 29) {
  //       //   date = "29";
  //       // }
  //       let newVal = value.substring(0, 3) + month;
  //       event.target.value = newVal + ".";
  //     }
  //   }
  //   console.log('value',value)
  //   console.log('event.target.value',event.target.value)
  //   console.log('value.substring(6)',value.substring(6))
  //   if (value.length > 6) {
  //     let year = value.substring(6);
  //     if (Number(year) > 2100) {
  //       year = "2100";
  //     }
  //     let newVal = value.substring(0, 6) + year;
  //     event.target.value = newVal;
  //   }
  //   // date = value.substring(0, 2);
  //   // console.log('value.substring(3)',value.substring(3))
  //   // if(Number(date) > 31){
  //   //   date = "31"
  //   //   event.target.value = date + value.substring(3);
  //   // }
  // }

  // if (
  //   event?.key !== "." &&
  //   event?.key !== "Shift" &&
  //   event?.key !== "Backspace"
  // ) {
  //   let cleaned = value.replace(/\D/g, "");
  //   // console.log("cleaned", cleaned);
  //   if(value?.length === 0)isDateAutoInputComplete = false;
  //   let masked = "";
  //   let date;
  //   let month;
  //   console.log("value", value);
  //   if (value.length > 0) {
  //     date = value.substring(0, 2);
  //     // date = Number(value.substring(0, 2)).toString().length > 1 ? value.substring(0, 2) : value.substring(0, 1) ;
  //     console.log("date", date);
  //     if (Number(date) > 31) {
  //       date = "31";
  //     }
  //     masked = date;

  //     if (value.length >= 2) {
  //       month = value.substring(3, 5);
  //       // month = Number(value.substring(3, 5)).toString().length > 1 ? value.substring(3, 5) : value.substring(3, 4) ;
  //       if (Number(month) > 12) {
  //         month = "12";
  //       }
  //       if (Number(month) === 2 && Number(date) > 29) {
  //         date = "29";
  //       }
  //       console.log("date", date);
  //       console.log("month", month);
  //       masked = date + "." + month;
  //     }

  //     if (value.length > 4) {
  //       let year = value.substring(6);
  //       // let year =  Number(value.substring(6)).toString().length > 3 ? value.substring(6) : value.substring(5) ;
  //       if (Number(year) > 2100) {
  //         year = "2100";
  //       }
  //       console.log("date", date);
  //       console.log("month", month);
  //       console.log("year", year);
  //       console.log("value?.length", value?.length);
  //       // masked = date + "." + month + "." + year
  //       console.log("isDateAutoInputComplete", isDateAutoInputComplete)
  //       masked = isDateAutoInputComplete ? value : date + "." + month + "." + year
  //       if(value?.length === 10)isDateAutoInputComplete = true;
  //       // masked = date + "." + month + "." + year
  //       // masked = cursorPos > 4 ? date + "." + month + "." + year : value;
  //     }
  //   }
  //   event.target.value = masked;
  //   // inputDateElement.value.setSelectionRange(cursorPos,cursorPos)
  //   console.log("masked", masked);
  //   console.log("value", value);
  // }

  if (event?.key !== '.' && event?.key !== 'Shift' && event?.key !== 'Backspace') {
    const cleaned = value.replace(/\D/g, '')
    console.log('cleaned', cleaned)
    if (cleaned?.length === 0) isDateAutoInputComplete = false
    let masked = event.target.value
    let date
    let month
    let year
    console.log('value', value)
    if (value.length > 0) {
      if (cleaned.length === 2) {
        date = cleaned.substring(0, 2)
        month = cleaned.substring(2, 4)
        year = cleaned.substring(4)
        // date = Number(value.substring(0, 2)).toString().length > 1 ? value.substring(0, 2) : value.substring(0, 1) ;
        console.log('date', date)
        if (Number(date) > 31) {
          date = '31'
        }
        // masked = date;
        masked = `${date ? date : ''}.`
      }

      if (cleaned.length === 4) {
        month = cleaned.substring(2, 4)
        // month = Number(value.substring(3, 5)).toString().length > 1 ? value.substring(3, 5) : value.substring(3, 4) ;
        if (Number(month) > 12) {
          month = '12'
        }
        if (Number(month) === 2 && Number(date) > 29) {
          date = '29'
        }
        console.log('date', date)
        console.log('month', month)
        // masked = date + "." + month;
        masked = `${cleaned.substring(0, 2)}.${month ? month : ''}.`
      }

      if (cleaned.length === 8) {
        let year = cleaned.substring(4)
        // let year =  Number(value.substring(6)).toString().length > 3 ? value.substring(6) : value.substring(5) ;
        if (Number(year) > 2100) {
          year = '2100'
        }
        console.log('date', date)
        console.log('month', month)
        console.log('year', year)
        console.log('value?.length', value?.length)
        // masked = date + "." + month + "." + year
        masked = `${cleaned.substring(0, 2)}.${cleaned.substring(2, 4)}.${year ? year : ''}`
        console.log('isDateAutoInputComplete', isDateAutoInputComplete)
        // masked = isDateAutoInputComplete ? value : date + "." + month + "." + year
        if (value?.length === 10) isDateAutoInputComplete = true
        // masked = date + "." + month + "." + year
        // masked = cursorPos > 4 ? date + "." + month + "." + year : value;
      }
      event.target.value = masked
    }
    // event.target.value = masked;
    // inputDateElement.value.setSelectionRange(cursorPos,cursorPos)
    console.log('masked', masked)
    console.log('value', value)
  }
}

function setNewTimeValue(value) {
  emit('update:modelValue', `${checkDateItem(value.hours)}:${checkDateItem(value.minutes)}`)
  emit('input')
  emit('validate')
  switchSelect()
}

function enterNewTimeValue(event, value) {
  inputErrorMessage.value = ''
  // if (event?.key && (regExp.test(event.key) && event.key !== 'Backspace')) {
  //   console.log('value',value)
  //   event.preventDefault()
  //   return
  // }

  // if (
  //   (value && (value.slice(0, 2) > 23 || value.slice(3, 5) > 59)) ||
  //   !timeRegex.test(value)
  // ) {
  //   emit("inputError");
  //   console.log("value", value);
  //   emit("validate");
  //   inputErrorMessage.value = "Введено некорректное значение";
  //   return;
  // }
  console.log('enterNewTimeValue(event, value)', value)
  let splitedTime
  if (value) {
    splitedTime = value.split(':')
    console.log('splitedTime', splitedTime)
    console.log('Number(splitedTime[0])', Number(splitedTime[0]))
    if (Number(splitedTime[0]) > 23) {
      console.log('Number(splitedTime[0]) > 23', Number(splitedTime[0]) > 23)
      splitedTime[0] = '23'
    }
    if (Number(splitedTime[1]) > 59) {
      splitedTime[1] = '59'
    }
    value = `${splitedTime[0] ? splitedTime[0] : ''}:${splitedTime[1] ? splitedTime[1] : ''}`
    console.log('value', value)
  }
  if (value?.length < 4 || splitedTime?.[1]?.length < 2) {
    emit('validate')
    return
  }

  console.log('event', event)
  event.target.value = value
  emit('update:modelValue', `${value}`)
  emit('input')
  emit('validate')
  switchSelect()
}

let isTimeAutoInputComplete = false
function onKeydownTime(event) {
  const value = event.target?.value
  const cursorPos = event.target?.selectionStart
  if (
    (regExp.test(event?.key) &&
      event?.key !== 'Enter' &&
      event?.key !== 'Backspace' &&
      event?.key !== 'ArrowLeft' &&
      event?.key !== 'ArrowRight') ||
    event?.key === '.'
  ) {
    event.preventDefault()
  }
  if (
    event.target?.value?.length > 4 &&
    event?.key !== 'Backspace' &&
    event?.key !== 'ArrowLeft' &&
    event?.key !== 'ArrowRight'
  ) {
    event.preventDefault()
  }

  if (event?.key !== 'Backspace' && event?.key !== ':' && event?.key !== 'Shift') {
    const cleaned = value.replace(/\D/g, '')
    let masked = ''

    if (cleaned.length >= 0) {
      masked = cleaned.substring(0, 2)

      if (cleaned.length >= 2) {
        masked += ':' + cleaned.substring(2, 4)
      }
    }

    const parts = masked.split(':')
    if (parts[0] && Number(parts[0]) > 23) {
      parts[0] = '23'
    }
    if (parts[1] && Number(parts[1]) > 59) {
      parts[1] = '59'
    }

    masked = parts.join(':')
    // event.target.value = cursorPos > 2 ? masked : value;
    // event.target.value = masked;
    event.target.value = isTimeAutoInputComplete ? value : masked
    if (value?.length === 5) isTimeAutoInputComplete = true
    if (value?.length === 0) isTimeAutoInputComplete = false
    console.log('masked', masked)
  }
}

const formatPreview = (date) => {
  const tempResult = []

  if (Array.isArray(date)) {
    date.map((item) => {
      if (item) {
        const tempDate = new Date(item)
        const day = tempDate.getDate()
        const month = tempDate.getMonth() + 1
        const year = tempDate.getFullYear()

        tempResult.push(`${checkDateItem(day)}.${checkDateItem(month)}.${checkDateItem(year)}`)
      }
    })
  } else {
    Array(date).map((item) => {
      if (item) {
        const tempDate = new Date(item)
        const day = tempDate.getDate()
        const month = tempDate.getMonth() + 1
        const year = tempDate.getFullYear()

        tempResult.push(`${checkDateItem(day)}.${checkDateItem(month)}.${checkDateItem(year)}`)
      }
    })
  }
  return tempResult
}

function formatPlaceholderDate(date) {
  let tempDate = ''

  if (Array.isArray(date)) {
    date.map((item, index) => {
      if (item) {
        const tempItem = new Date(item)
        tempDate += `${checkDateItem(tempItem.getDate())}.${checkDateItem(
          tempItem.getMonth() + 1,
        )}.${checkDateItem(tempItem.getFullYear())}${index === date.length - 1 ? '' : ' - '}`
      }
    })
  } else {
    Array(date).map((item, index) => {
      if (item) {
        const tempItem = new Date(item)
        tempDate += `${checkDateItem(tempItem.getDate())}.${checkDateItem(
          tempItem.getMonth() + 1,
        )}.${checkDateItem(tempItem.getFullYear())}${
          index === date.length - 1 ? '' : Array(date).length > 1 ? ' - ' : ''
        }`
      }
    })
  }

  return tempDate
}

function checkDateItem(item) {
  if (item < 10) {
    return `0${+item}`
  }
  return item
}

function closeMenu() {
  if (isOpened.value) {
    isOpened.value = false
    emit('validate')
  }
}

onMounted(() => {
  dateValue.value = props.modelValue
})

watch(props, () => {
  dateValue.value = props.modelValue
})
</script>

<style lang="scss" scoped>
.date-select {
  position: relative;
  width: 100%;

  &__wrapper {
    width: 100%;

    &_error {
      .date-select__button {
        border-color: var(--error-color);

        &:hover {
          border-color: var(--error-color);
        }
      }
      .date-select__calendar-input {
        border-color: var(--error-color);
      }
      .date-select__clocks-input {
        border-color: var(--error-color);
      }
    }
  }

  &__label {
    font-size: 12px;
    line-height: 20px;
    margin: 0 0 4px 0;
  }

  &__required {
    margin: 0 0 0 4px;
    color: var(--error-color);
  }

  &__button {
    white-space: nowrap;
    padding: 10px 16px;
    background-color: #fff;
    border: 1px solid var(--border-color);
    border-radius: 8px;
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    transition:
      background-color 0.2s,
      color 0.2s,
      border-color 0.2s,
      box-shadow 0.2s;
    user-select: none;

    span {
      transition: color 0.2s;
    }

    &_opened {
      background-color: var(--background-color);
      border-color: var(--hover-color);
      box-shadow: 0 0 0 4px #e4e8f4;

      span {
        color: var(--hover-color);
      }
    }

    &_large {
      height: 48px;
    }

    &:hover {
      border-color: var(--hover-color);
    }
  }

  &__error {
    font-size: 12px;
    line-height: 20px;
    color: var(--error-color);
  }

  &__inner-text {
    font-size: 14px;
    line-height: 20px;

    &_gray {
      color: var(--font-color-two);
    }
  }

  &__additonal-label {
    margin-left: auto;
    width: fit-content;
    font-size: 14px;
    font-weight: 500;
    line-height: 24px;
    text-align: right;
    color: var(--primary-color);
  }

  &__arrow-icon {
    stroke: #000;
    transform-origin: center;
    transition:
      transform 0.2s,
      stroke 0.2s;

    &_opened {
      transform: rotate(-180deg);
      stroke: var(--hover-color);
    }
  }

  &__list {
    position: absolute;
    left: 0;
    top: 100%;
    padding: 24px;
    background-color: #fff;
    border: 1px solid var(--border-color);
    border-radius: 8px;
    box-shadow: 0 25px 65px -15px rgba(8, 17, 49, 0.3);
    z-index: 250;
    max-width: 316px;
  }

  &__item {
    &:not(:last-child) {
      margin: 0 0 16px 0;
    }
  }

  &__input {
    border-color: var(--border-color);
    margin: 0 0 20px 0;

    &:hover {
      border-color: var(--hover-color);
    }

    &:focus {
      border-color: var(--hover-color);
    }
  }

  &__picked-date-wrapper {
    width: 100%;
    padding: 12px 16px;
    border-radius: 8px;
    background-color: #009edb1a;
    font-size: 12px;
    line-height: 20px;
    font-weight: 500;
    color: #009edb;
  }

  &__picked-date-title {
    font-size: 14px;
    line-height: 24px;
    font-weight: 500;
    color: #009edb;
  }

  &__picked-date {
    max-width: 250px;
    font-size: 12px;
    line-height: 20px;
    font-weight: 500;
    color: #009edb;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    white-space: pre-wrap;
  }

  &__calendar {
    display: flex;
    align-items: center;
    position: relative;
  }
  &__calendar-icon {
    flex-shrink: 0;
    cursor: pointer;
  }
  &__calendar-input {
    height: 48px;
    width: 100%;
    white-space: nowrap;
    padding: 10px 16px;
    background-color: #fff;
    border: 1px solid var(--border-color);
    border-radius: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    transition:
      background-color 0.2s,
      color 0.2s,
      border-color 0.2s,
      box-shadow 0.2s;
    user-select: none;
    color: var(--font-color);

    &:focus-visible {
      outline: none;
    }
  }
  &__clocks {
    display: flex;
    align-items: center;
    position: relative;
  }
  &__clocks-icon {
    flex-shrink: 0;
    cursor: pointer;
  }
  &__clocks-input {
    height: 48px;
    width: 100%;
    white-space: nowrap;
    padding: 10px 16px;
    background-color: #fff;
    border: 1px solid var(--border-color);
    border-radius: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    transition:
      background-color 0.2s,
      color 0.2s,
      border-color 0.2s,
      box-shadow 0.2s;
    user-select: none;
    color: var(--font-color);

    &:focus-visible {
      outline: none;
    }
  }
  &__text-input {
    :deep(.dp__menu) {
      padding: 24px;
      border: 1px solid var(--border-color);
      border-radius: 8px;
      box-shadow: 0 25px 65px -15px rgba(8, 17, 49, 0.3);
      max-width: 316px;
    }

    :deep(.dp__button) {
      display: none;
    }
    :deep(.dp__arrow_bottom) {
      display: none;
    }
    :deep(.dp__arrow_top) {
      display: none;
    }
  }
}

.dp__input_icons {
  flex: 0 0 auto;
  padding: 6px 6px;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.datepicker-disabled {
  user-select: none;
  pointer-events: none;

  .date-select__button {
    background-color: var(--background-color);
  }
  .date-select__calendar-input {
    background-color: var(--background-color);
  }
  .date-select__clocks-input {
    background-color: var(--background-color);
  }
}

:deep(.dp__month_year_row) {
  .dp--arrow-btn-nav {
    height: 32px;
    width: 32px;

    .dp__inner_nav {
      border-radius: 8px;
      height: 32px;
      width: 32px;
    }
  }
}

:deep(.dp__calendar_header) {
  padding: 24px 0 0 0;
}

:deep(.dp__calendar_header_item) {
  color: var(--font-color-two);
  font-size: 12px;
  line-height: 20px;
  font-weight: 400;
}

:deep(.dp__calendar_header_separator) {
  display: none;
}

:deep(.dp-custom-menu) {
  border: unset;
}

:deep(.dp__menu) {
  border: none;
}

:deep(.dp__menu_inner) {
  padding: 0;
}

:deep(.dp__cell_inner) {
  font-size: 12px;
  line-height: 20px;
}

:deep(.dp__date_hover) {
  &:hover {
    background-color: var(--background-color);
  }
}

:deep(.dp__today) {
  border-color: var(--font-color);
  border-radius: 8px;
}

:deep(.dp__active_date) {
  background-color: var(--font-color);
}

:deep(.dp__calendar_row) {
  margin: 2px 0;
}

:deep(.dp__action_buttons) {
  margin: 0;
  width: 100%;
}

:deep(.dp__action_select),
:deep(.dp__action_cancel) {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  line-height: 24px;
  border-radius: 8px;
  height: 40px;
  width: calc(50% - 4px);
}

:deep(.dp__action_select) {
  margin: 0 0 0 8px;
  background-color: var(--primary-color);
}

:deep(.dp__action_cancel) {
  border-color: var(--border-color);

  &:hover {
    border-color: var(--hover-color);
  }
}

:deep(.dp__range_start) {
  background-color: var(--font-color);
  border-radius: 8px;
  border: none;
}

:deep(.dp__range_end) {
  background-color: var(--font-color);
  border-radius: 8px;
  border: none;
}

:deep(.dp__range_between) {
  background-color: var(--background-color);
  border: none;
}

:deep(.dp__calendar_item) {
  flex-grow: unset;

  &:has(.dp__range_start) {
    background-color: var(--background-color);
  }

  &:has(.dp__range_end) {
    background-color: var(--background-color);
  }

  &:first-child {
    border-radius: 8px 0 0 8px;
    overflow: hidden;
  }

  &:last-child {
    border-radius: 0 8px 8px 0;
    overflow: hidden;
  }
}

:deep(.dp__action_row) {
  flex-direction: column;
  align-items: flex-start;
  width: 100% !important;
  padding: 0;
}

:deep(.dp__selection_preview) {
  width: 100%;
  margin: 16px 0;
}
</style>
