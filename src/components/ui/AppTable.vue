<template>
  <div class="app-table" ref="tableElement">
    <div class="app-table__head">
      <div
        v-for="(head, headIndex) in tableHeadScheme ? tableHeadScheme : tableItems?.[0]"
        :key="headIndex"
        :class="[`app-table__head-item ${headIndex}`]"
      >
        <slot :name="`head(${tableHeadScheme ? head : headIndex})`">{{
          tableHeadScheme ? head : headIndex
        }}</slot>
      </div>
    </div>
    <div class="app-table__body" ref="tableBodyElement">
      <div class="app-table__row">
        <div class="app-table__row-item" v-for="(row, rowIndex) in tableItems" :key="rowIndex">
          <template
            v-for="(cell, cellIndex) in tableHeadScheme ? tableHeadScheme : tableItems?.[0]"
            :key="cellIndex"
          >
            <div
              :class="[`app-table__cell-item ${cellIndex}`]"
              v-if="
                tableHeadScheme?.includes(cell) || Object.keys(tableItems?.[0])?.includes(cellIndex)
              "
            >
              <slot :name="`cell(${cellIndex})`" :cell="{ cell: row?.[cell], cellIndex }">{{
                tableHeadScheme ? row?.[cell] : row?.[cellIndex]
              }}</slot>
            </div>
          </template>
          <slot :name="`cell(buttons)`" :row="{ row, rowIndex }" ref="buttonsElement"></slot>
        </div>
      </div>
    </div>
    <div class="app-table__footer">
      <slot :name="'footer'">
        <AppPaginator
          @change="onPaginatorChange"
          :totalItems="props.totalItems"
          :perPage="props.perPage"
      /></slot>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onUpdated, nextTick, ref } from 'vue'
import IconMinus from '../icons/IconMinus.vue'
import IconPlus from '../icons/IconPlus.vue'
import AppPaginator from './AppPaginator.vue'
// import { ref } from 'vue';
// import { $ref } from 'vue/macros'

const emit = defineEmits<{
  'update:modelValue': [value: object]
  change: [value: object]
}>()

const props = defineProps({
  modelValue: { type: Number, required: false },
  tableItems: { type: Object, required: true },
  tableScheme: { type: Object, required: false },
  tableHeadScheme: { type: Object, required: false },
  totalItems: { type: Number, required: true },
  perPage: { type: Number, required: true },
})

const tableElement = ref()
const tableBodyElement = ref()
const buttonsElement = ref()
function onTableResize() {
  tableElement.value?.style?.setProperty(
    '--main-table-width',
    `${tableElement.value?.offsetWidth || 0}px`,
  )
  tableElement.value?.style?.setProperty(
    '--table-width',
    `${tableBodyElement.value?.offsetWidth || 0}px`,
  )
  tableElement.value?.style?.setProperty(
    '--controls-width',
    `${buttonsElement.value?.offsetWidth || 0}px`,
  )
  // tableElement.value?.style?.setProperty(
  //   '--controls_cell_width',
  //   `${_controls_cell_width.value?.offsetWidth || 0}px`,
  // )
  tableElement.value?.style?.setProperty(
    '--table-outer-inner-width',
    `${tableBodyElement.value?.offsetWidth - tableBodyElement.value?.clientWidth}px`,
  )
  // tableElement.value?.style?.setProperty(
  //   '--main-rows-width',
  //   `${tableBodyElement.value?.offsetWidth - (_controls_cell_width.value?.offsetWidth || 0) - (tableBodyElement.value?.offsetWidth - tableBodyElement.value?.clientWidth)}px`,
  // )
  // tableElement.value?.style?.setProperty(
  //   '--main-header-width',
  //   `${tableBodyElement.value?.offsetWidth - (_controls_cell_width.value?.offsetWidth || 0) - 0.1}px`,
  // )
  tableElement.value?.style?.setProperty(
    '--scrollbar-width',
    `${window.innerWidth - document.body.clientWidth}px`,
  )
}

function onPaginatorChange(paginationData) {
  emit('change', paginationData)
  console.log('onPaginatorChange(paginationData)', paginationData)
}
onUpdated(() => {
  nextTick(() => onTableResize())
})
</script>
<style lang="scss" scoped>
.app-table {
  border: var(--border-block);
  border-radius: var(--border-radius);
  border-color: var(--border-color-block);
  &__head {
    display: flex;
    align-items: center;
    // padding-top: 14px;
    padding-left: 24px;
    height: 52px;
    background-color: var(--background-color-item-hover);
    border-top-left-radius: var(--border-radius);
    border-top-right-radius: var(--border-radius);
  }
  &__head-item {
    // min-width: 160px;
    // width: 100%;
    width: 190px;
    font-weight: 500;
    font-size: 18px;
  }
  &__row-item {
    padding-left: 24px;
    padding-right: 20px;
    display: flex;
    align-items: center;
    height: 54px;
    border-bottom: var(--border-block);
    border-color: var(--border-color-block);
  }
  &__cell-item {
    // padding-left: 24px;
    // min-width: 160px;
    // width: 100%;
    // max-width: 190px;
    width: 190px;
  }
  &__body {
    background-color: var(--background-color-block);
    border-bottom-left-radius: var(--border-radius);
    border-bottom-right-radius: var(--border-radius);
  }
  &__footer {
    padding: 8px;
  }
}
</style>
