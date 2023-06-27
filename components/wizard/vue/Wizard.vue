<template lang="pug">
.wizard
  Tabs(:activeIndex="activeTabIndex" @change="changeActiveIndex")
  .wizard__content
    component(:is="activeWizardStep")
  .wizard__buttons
    CustomButton(class="wizard__button" @click.native="save") Сохранить
    CustomButton(class="wizard__button" isSecondary @click.native="reset") Очистить
</template>

<script>
import Tabs from '@/components/controls/tabs/vue/Tabs.vue';
import CustomButton from '@/components/common/custom-button/vue/CustomButton.vue';
import InputValues from '@/components/wizard/blocks/input-values/vue/InputValues.vue';
import ComputedValues from '@/components/wizard/blocks/computed-values/vue/ComputedValues.vue';
import CheckCalculations from '@/components/wizard/blocks/check-calculations/vue/CheckCalculations.vue';

const STEPS = [InputValues, ComputedValues, CheckCalculations];

export default {
  name: "Wizard",
  components: { Tabs, CustomButton, InputValues },
  data() {
    return {
      activeTabIndex: 0
    }
  },

  computed: {
    activeWizardStep() {
      return STEPS[this.activeTabIndex];
    }
  },

  methods: {
    changeActiveIndex(newIndex) {
      this.activeTabIndex = newIndex;
    },
    save() {
      this.$store.dispatch('input-values/saveToStorage');
      this.$store.dispatch('computed-values/saveToStorage');
    },
    reset() {
      this.$store.dispatch('input-values/resetSavedData');
      this.$store.dispatch('computed-values/resetSavedData');
    },
  },
}
</script>

<style lang="scss" scoped>
@import "../styles/wizard.scss";
</style>
