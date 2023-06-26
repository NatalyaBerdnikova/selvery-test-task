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
    CustomTableLine(
      v-for="row in rows"
      :key="row.id"
      v-bind="row"
    )
</template>

<script>
import CustomTableLine from '@/components/common/custom-table-line/vue/CustomTableLine.vue';

export default {
  name: 'CustomTable',
  components: { CustomTableLine },
  props: {
    headCells: {
      type: Array,
      required: true
    },
    rows: {
      type: Array,
      required: true
    },
  },
}
</script>

<style lang="scss">
@import "../styles/custom-table.scss";
</style>
