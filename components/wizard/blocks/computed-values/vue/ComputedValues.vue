<template lang="pug">
.computed-values
  .title Вычисляемые значения
  CustomTable.computed-values__table(:headCells="headcells" :rows="getVariables" rowType="computed")
  CustomButton(@click.native="addVariable") Добавить переменную
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import CustomTable from '@/components/common/custom-table/vue/CustomTable.vue';
import CustomButton from '@/components/common/custom-button/vue/CustomButton.vue';

const HEADCELLS = [
  { id: 0, text: "Переменная" },
  { id: 1, text: "Тип" },
  { id: 2, text: "Формула" },
  { id: 3, text: "" }
];

export default {
  name: "ComputedValues",
  components: { CustomTable, CustomButton },
  provide: {
    tableEditable: true,
  },
  computed: {
    headcells() {
      return HEADCELLS;
    },
    ...mapGetters('computed-values', ['getVariables']),
  },
  mounted() {
    this.$store.dispatch('computed-values/setFromStorage');
  },
  methods: {
    ...mapMutations('computed-values', ['addVariable', 'changeVariable'])
  }
}
</script>

<style lang="scss" scoped>
@import "../styles/computed-values.scss";
</style>
