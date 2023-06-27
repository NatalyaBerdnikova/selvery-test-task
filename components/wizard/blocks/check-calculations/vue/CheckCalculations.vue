<template lang="pug">
.check-calculations
  .title Проверка расчетов
  .check-calculations__container
    .check-calculations__inputs
      p.check-calculations__subtitle Вводимые значения
      .check-calculations__input-wrapper(v-for="input in getInputVariables")
        p.check-calculations__input-title {{ input.name }}
        component(
          :is="getInputComponent(input.type).component"
          @input.native="(event) => onChangeInputVariable({ id: input.id, value: event.target.value })"
          v-bind="getInputComponent(input.type).options"
          :value="getInputVariableValue(input.id)"
        )
    .check-calculations__computed
      p.check-calculations__subtitle Результат вычисляемых значений
      table.check-calculations__table
        tr(v-for="variable in results")
          td.check-calculations__table-cell {{ variable.name }}
          td.check-calculations__table-cell {{ variable.value }}
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

import CustomInput from '~/components/controls/custom-input/vue/CustomInput.vue';
import CustomSelect from '~/components/controls/custom-select/vue/CustomSelect.vue';
import CustomTable from '~/components/common/custom-table/vue/CustomTable.vue';

import { MODULE_NAME as inputModule } from '~/store/input-values';
import { MODULE_NAME as computedModule } from '~/store/computed-values';
import { BOOLEAN_SELECT_DATA } from '~/constants';

export default {
  name: "CheckCalculations",
  components: { CustomInput, CustomSelect, CustomTable },
  data() {
    return {
      results: []
    }
  },
  computed: {
    names() {
      const inputNames = this.getInputVariables.map(({ name }) => name);
      const computedNames = this.getComputedVariables.map(({ name }) => name);
      return [...inputNames, ...computedNames];
    },
    ...mapGetters(inputModule, { getInputVariables: 'getVariables' }),
    ...mapGetters(computedModule, { getComputedVariables: 'getVariables' })
  },
  activated() {
    this.calculateResults();
  },
  methods: {
    getInputComponent(type) {
      switch (type) {
        case 'boolean':
          return { component: CustomSelect, options: BOOLEAN_SELECT_DATA };
        case 'number':
          return { component: CustomInput, options: { type: 'number' } };
        default:
          return { component: CustomInput, options: { type: 'number' } };
      }
    },
    calculateResults() {
      this.results = [];
      this.calculateWithFormula(this.names.join(' + '))
    },
    onChangeInputVariable(props) {
      this.changeInputVariable(props);
      this.calculateResults();
    },
    getInputVariableValue(id) {
      const variable = this.getInputVariables.find((item) => item.id === id);
      if (variable === null) {
        return null;
      }

      if (typeof variable.value !== 'undefined') {
        return variable.value;
      }

      return variable.initialValue;
    },
    normalizeVariable(value, type) {
      switch(type) {
        case 'boolean':
          return value === 'true'
        case 'number':
          return Number(value)
        default:
          return value
      }
    },
    calculateWithFormula(formula, results = [], resultName = null) {
      const resultItem = results.find((el) => el.name === resultName);
      if (typeof resultItem !== 'undefined') {
        return resultItem.value
      }

      // eslint-disable-next-line
      const fun = new Function(...this.names, 'return ' + formula);
      const formulaParts = formula.split(' ');
      const variables = this.names.map((name) => {
        const inputVar = this.getInputVariables.find((item) => item.name === name);
        if (typeof inputVar !== 'undefined') {
          if (typeof inputVar.value === 'undefined') {
            return this.normalizeVariable(inputVar.initialValue, inputVar.type);
          }

          return this.normalizeVariable(inputVar.value, inputVar.type);
        }

        const compVar = this.getComputedVariables.find((item) => item.name === name);
        if (typeof compVar !== 'undefined' && (resultName === null || formulaParts.includes(name))) {
          const value = this.calculateWithFormula(compVar.formula, this.results, compVar.name);
          const thisResultItem = this.results.find((el) => el.name === compVar.name);
          if (typeof thisResultItem !== 'undefined') {
            thisResultItem.value = value;
          } else {
            this.results.push({ name, value });
          }

          return value;
        }

        return undefined;
      });

      let result;
      try {
        result = fun(...variables);
      } catch (error) {
        result = 'Ошибка подсчетов';
        console.error(error);
      }

      return result;
    },
    ...mapMutations(inputModule, { changeInputVariable: 'changeVariable' })
  },
}
</script>

<style lang="scss" scoped>
@import "../styles/check-calculations.scss";
</style>
