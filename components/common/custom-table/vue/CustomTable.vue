<template lang="pug">
table.custom-table
  thead
    tr
      th.custom-table__cell._heading(
        :class="{ '_without-border': rows.length <= 0 }"
        v-for="cell in headCells"
        :key="cell.id"
      ) {{ cell.text }}
  tbody
    component(
      :is="rowComponent"
      v-for="row in rows"
      :key="row.id"
      v-bind="row"
    )
</template>

<script>
import InputValuesLine from '@/components/common/table-line/input-values-line/vue/InputValuesLine.vue';
import ComputedValuesLine from '@/components/common/table-line/computed-values-line/vue/ComputedValuesLine.vue';

export default {
  name: 'CustomTable',
  components: { InputValuesLine, ComputedValuesLine },
  props: {
    headCells: {
      type: Array,
      required: true
    },
    rows: {
      type: Array,
      required: true
    },
    rowType: {
      type: String,
      default: 'input'
    }
  },
  computed: {
    rowComponent() {
      switch(this.rowType) {
        case 'input':
          return InputValuesLine
        case 'computed':
          return ComputedValuesLine
        default:
          return InputValuesLine
      }
    }
  }
}
</script>

<style lang="scss">
@import "../styles/custom-table.scss";
</style>
