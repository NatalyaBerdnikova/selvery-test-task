<template lang="pug">
.wizard
  Tabs(:activeIndex="activeTabIndex" @change="onChangeActiveIndex")
</template>

<script>
import Tabs from '@/components/tabs/vue/Tabs.vue';

export default {
  name: "Wizard",
  components: { Tabs },
  data() {
    return {
      activeTabIndex: 0
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
