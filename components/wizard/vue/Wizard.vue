<template lang="pug">
.wizard
  Tabs(:activeIndex="activeTabIndex" @change="onChangeActiveIndex")
  .wizard__content
    component(:is="activeWizardStep")
  .wizard__buttons
    CustomButton(class="wizard__button") Сохранить
    CustomButton(class="wizard__button" isSecondary) Очистить
</template>

<script>
import Tabs from '@/components/common/tabs/vue/Tabs.vue';
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
    onChangeActiveIndex(newIndex) {
      this.activeTabIndex = newIndex;
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../styles/wizard.scss";
</style>
