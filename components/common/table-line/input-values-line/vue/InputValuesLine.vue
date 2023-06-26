<template lang="pug">
tr.custom-table__row
  td.custom-table__cell
    CustomInput(v-model="localName" @input="onChangeName")
  td.custom-table__cell
    CustomSelect(v-model="localType" v-bind="defaultSelectData" @input="onChangeType")
  td.custom-table__cell
    component(
      :is="initialValueComponent.component"
      v-bind="initialValueComponent.data"
      v-model="localInitialValue"
      @input="onChangeInitialValue"
    )
  td.custom-table__cell(v-if="tableEditable")
    button.custom-table__delete-button(@click="remove")
      DeleteIcon
</template>

<script>
import { mapMutations } from 'vuex';
import CustomInput from '@/components/controls/custom-input/vue/CustomInput.vue';
import CustomSelect from '@/components/controls/custom-select/vue/CustomSelect.vue';
import DeleteIcon from '@/components/common/icons/Delete.vue';

const BOOLEAN_SELECT_DATA = {
  options: [
    { value: true, text: 'Да' },
    { value: false, text: 'Нет' },
  ]
};

const DEFAULT_SELECT_DATA = {
  options: [
    { value: "number", text: "Число" },
    { value: "boolean", text: "Логическое значение" },
  ]
};

export default {
  name: "InputValuesLine",
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
    initialValue: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      localName: '',
      localType: null,
      localInitialValue: null
    }
  },
  computed: {
    defaultSelectData() {
      return DEFAULT_SELECT_DATA;
    },
    initialValueComponent() {
      if (this.localType === 'boolean') {
        return { component: 'CustomSelect', data: BOOLEAN_SELECT_DATA }
      }
      return { component: 'CustomInput', data: { type: this.localType } }
    },
  },
  mounted() {
    this.localName = this.name;
    this.localType = this.type;
    this.localInitialValue = this.initialValue;
  },
  methods: {
    remove() {
      this.removeVariable(this.id);
    },
    onChangeName() {
      this.changeVariable({ id: this.id, name: this.localName });
    },
    onChangeType() {
      this.localInitialValue = null;
      this.changeVariable({ id: this.id, type: this.localType, initialValue: this.localInitialValue });
    },
    onChangeInitialValue() {
      this.changeVariable({ id: this.id, initialValue: this.localInitialValue })
    },
    ...mapMutations('input-values', ['removeVariable', 'changeVariable'])
  }
}
</script>
