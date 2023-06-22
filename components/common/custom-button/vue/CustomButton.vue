<template lang="pug">
button.custom-button(:class="{ '_secondary': isSecondary }")
  slot
</template>

<script>
export default {
  name: 'CustomButton',
  props: {
    isSecondary: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped lang="scss">
@import "../styles/custom-button.scss";
</style>
