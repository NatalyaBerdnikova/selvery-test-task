<template lang="pug">
.input-values
  .title Вводимые значения
  CustomTable.input-values__table(:headCells="headcells" :rows="getVariables" rowType="input")
  CustomButton(@click.native="addVariable") Добавить переменную
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import CustomTable from '@/components/common/custom-table/vue/CustomTable.vue';
import CustomButton from '@/components/common/custom-button/vue/CustomButton.vue';
import { MODULE_NAME } from '~/store/input-values';

const HEADCELLS = [
  { id: 0, text: "Переменная" },
  { id: 1, text: "Тип" },
  { id: 2, text: "Начальное значение" },
  { id: 3, text: "" }
];

export default {
  name: "InputValues",
  components: { CustomTable, CustomButton },
  provide: {
    tableEditable: true,
  },
  computed: {
    headcells() {
      return HEADCELLS;
    },
    ...mapGetters(MODULE_NAME, ['getVariables'])
  },
  mounted() {
    this.$store.dispatch(`${MODULE_NAME}/setFromStorage`);
  },
  methods: {
    ...mapMutations(MODULE_NAME, ['addVariable', 'changeVariable'])
  }
}
</script>

<style lang="scss" scoped>
@import "../styles/input-values.scss";
</style>
