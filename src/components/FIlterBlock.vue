<template>
  <div class="tyre-filter">
    <div class="tyre-filter__header">
      <button :class="['tyre-filter__button', { 'tyre-filter__button_active': true }]">
        Подбор шин по типоразмеру
      </button>
      <button class="tyre-filter__button">По авто</button>
    </div>

    <div class="tyre-filter__body">
      <div class="tyre-filter__selectors">
        <AppSelect
          placeholder="Ширина"
          v-model="filtersData.width"
          :options="options?.width"
          :hasDefaultOption="true"
          optionKeyField="width"
          optionNameField="width"
        />
        <AppSelect
          placeholder="Высота"
          v-model="filtersData.profile"
          :options="options?.profile"
          optionKeyField="profile"
          optionNameField="profile"
        />
        <AppSelect
          placeholder="Диаметр"
          :options="options?.diametr"
          optionKeyField="diametr"
          optionNameField="diametr"
        />
        <AppSelect
          placeholder="Производитель"
          v-model="filtersData.manufactor"
          :options="options?.manufactor"
          optionKeyField="manufactor"
          optionNameField="manufactor"
        />
        <AppSelect
          placeholder="Сезон"
          v-model="filtersData.season"
          :options="options?.season"
          optionKeyField="season"
          optionNameField="season"
        />
        <AppSelect placeholder="Вн-ий диаметр" v-model="filtersData.outer" />
        <!-- <div class="tyre-filter__selector">Высота</div> -->
        <!-- <div class="tyre-filter__selector">Диаметр</div> -->
        <!-- <div class="tyre-filter__selector">Производитель</div> -->
        <!-- <div class="tyre-filter__selector">Сезон</div> -->
        <!-- <div class="tyre-filter__selector">Вн-ий диаметр</div> -->
      </div>
      <div class="tyre-filter__checkboxes">
        <!-- <label class="tyre-filter__checkbox">
          <input type="checkbox" value="sport" v-model="filtersData.options" />
          <span>Спорт-пакет</span>
        </label> -->
        <AppCheckbox label="Спорт-пакет" value="sport" v-model="filtersData.options" />
        <!-- <label class="tyre-filter__checkbox">
          <input type="checkbox" value="runflat" v-model="filtersData.options" />
          <span>Run Flat</span>
        </label> -->
        <AppCheckbox label="Run Flat" value="runflat" v-model="filtersData.options" />
        <AppCheckbox label="Усыпанность (с)" value="sortof" v-model="filtersData.options" />
        <!-- <label class="tyre-filter__checkbox">
          <input type="checkbox" v-model="filtersData.options" />
          <span>Усыпанность (с)</span>
        </label> -->
      </div>
      <AppButton label="Подобрать" @click="findTires"></AppButton>
    </div>
  </div>
</template>
<script setup lang="ts">
import { defineProps, defineEmits, toRef, ref, watch, onMounted } from 'vue'
import AppSelect from '@/components/ui/AppSelect.vue'
import AppCheckbox from '@/components/ui/AppCheckbox.vue'
import AppButton from '@/components/ui/AppButton.vue'
const emit = defineEmits<{
  buttonClick: [value: void]
  'update:modelValue': [value: object | undefined]
  submit: [value: object | undefined]
}>()

const props = defineProps<{
  modelValue?: object | string
  label?: string
  placeholder?: string
  options?: object
  optionNameField?: object[keyof object]
  optionKeyField?: object[keyof object]
}>()

// const filtersData = toRef<object | undefined>(props?.modelValue)

const filtersData = ref({
  width: '',
  profile: '',
  diametr: '',
  manufactor: '',
  season: '',
  outerDiametr: '',
  options: [],
})

const filtersDataOptions = ref({})

function findTires() {
  emit('submit', filtersData.value)
}

watch(
  filtersData.value,
  () => {
    console.log('filtersData.value', filtersData.value)
    emit('update:modelValue', filtersData.value)
  },
  { deep: true },
)

onMounted(() => {
  // filtersData.value = props.modelValue
  console.log('FilterBlocks props', props)
})
</script>
<style scoped lang="scss">
.tyre-filter {
  max-width: 580px;
  background-color: var(--background-color-block);
  border-radius: var(--border-radius-block);
  box-shadow: 0px 4px 1px 1px #000000aa;
  border: var(--border-block);
  border-color: var(--border-color-block);
  // overflow: hidden;
  &__header {
    display: grid;
    grid-template: auto/ 60% auto;
    height: 58px;
    border-bottom: var(--border-block);
    border-color: var(--border-color-block);
  }
  &__button {
    color: var(--color-text-button);
    background-color: var(--background-color-block);
    &:hover {
      box-shadow: var(--box-shadow-button);
    }
    &_active {
      background-color: var(--item-main-color);
      color: var(--color-text-main);
    }
  }
  &__body {
    display: grid;
    grid-template: repeat(2, auto) / auto;
    padding: 20px 20px 32px 20px;
  }
  &__selectors {
    display: grid;
    grid-template: auto auto / repeat(3, auto);
    gap: 10px;
    margin-bottom: 18px;

    @include tablet {
      grid-template: auto / auto;
    }
  }
  &__selector {
    width: 172px;
    height: 48px;
    background-color: var(--background-color-item);
    border: var(--border-button);
    border-color: var(--border-color-block);
    border-radius: var(--border-radius-button);
    color: var(--color-text-button);

    @include tablet {
      width: 100%;
    }
  }
  &__checkboxes {
    display: grid;
    grid-template: auto / repeat(3, 1fr);
    margin-bottom: 40px;
    gap: 10px;

    @include tablet {
      grid-template: auto / auto;
    }
  }
  &__checkbox {
    color: var(--color-text-button);
    & span {
      margin-left: 10px;
    }
  }
  &__submit-button {
    width: 134px;
    height: 43px;
    padding: 0;
    border-radius: var(--border-radius-button);
    // background-color: var(--item-main-color);
    background-color: var(--background-color-button-translate);
    box-shadow: var(--box-shadow-button);
    // border: var(--border-button);
    // border-color: var(--border-color-button);
    &:active .tyre-filter__submit-button-text {
      transform: translate(0px, 0px);
    }
  }
  &__submit-button-text {
    display: block;
    // height: 100%;
    padding: 12px 12px;
    transform: translate(0px, -2px);
    transition: transform 100ms;
    background-color: var(--item-main-color);
    border-radius: var(--border-radius-button);
    border: var(--border-button);
    border-color: var(--border-color-button);
  }
}
</style>
