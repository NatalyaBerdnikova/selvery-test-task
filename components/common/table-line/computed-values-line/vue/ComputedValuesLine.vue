<template lang="pug">
tr.custom-table__row
  td.custom-table__cell
    CustomInput(v-model="localName" @input="onChangeName")
  td.custom-table__cell
    CustomSelect(v-model="localType" v-bind="defaultSelectData" @input="onChangeType")
  td.custom-table__cell
    CustomInput(v-model="localFormula" @input="onChangeFormula")
  td.custom-table__cell(v-if="tableEditable")
    button.custom-table__delete-button(@click="remove")
      DeleteIcon
</template>

<script>
import { mapMutations } from 'vuex';
import CustomInput from '@/components/controls/custom-input/vue/CustomInput.vue';
import CustomSelect from '@/components/controls/custom-select/vue/CustomSelect.vue';
import DeleteIcon from '@/components/common/icons/Delete.vue';
import { MODULE_NAME } from '~/store/computed-values';

const DEFAULT_SELECT_DATA = {
  options: [
    { value: "number", text: "Число" },
    { value: "boolean", text: "Логическое значение" },
  ]
};

export default {
  name: "ComputedValuesLine",
  components: { CustomInput, CustomSelect, DeleteIcon },
  inject: ['tableEditable'],
  props: {
    id: {
      type: Number,
      required: true
    },
    name: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: null,
    },
    formula: {
      type: String,
      default: "",
    }
  },
  data() {
    return {
      localName: '',
      localType: null,
      localFormula: null
    }
  },
  computed: {
    defaultSelectData() {
      return DEFAULT_SELECT_DATA;
    },
  },
  mounted() {
    this.localName = this.name;
    this.localType = this.type;
    this.localFormula = this.formula;
  },
  methods: {
    remove() {
      this.removeVariable(this.id);
    },
    onChangeName() {
      this.changeVariable({ id: this.id, name: this.localName });
    },
    onChangeType() {
      this.changeVariable({ id: this.id, type: this.localType });
    },
    onChangeFormula() {
      this.changeVariable({ id: this.id, formula: this.localFormula });
    },
    ...mapMutations(MODULE_NAME, ['removeVariable', 'changeVariable'])
  }
}
</script>
