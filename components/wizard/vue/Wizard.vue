<template lang="pug">
.wizard
  Tabs(:activeIndex="activeTabIndex" @change="onChangeActiveIndex")
  component(:is="activeWizardStep")
  .wizard__buttons
    CustomButton(class="wizard__button") Сохранить
    CustomButton(class="wizard__button" isSecondary) Очистить
</template>

<script>
import Tabs from '@/components/tabs/vue/Tabs.vue';
import CustomButton from '@/components/custom-button/vue/CustomButton.vue';

const STEPS = [];

export default {
  name: "Wizard",
  components: { Tabs, CustomButton },
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
      console.info('onChangeActiveIndex', newIndex);
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../styles/wizard.scss";
</style>
