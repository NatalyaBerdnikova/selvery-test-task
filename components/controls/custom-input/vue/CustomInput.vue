<template lang="pug">
input.custom-input(:value="value" @input="$emit('input', $event.target.value)")
</template>

<script>
export default {
  name: "CustomInput",
  props: {
    value: {
      type: [String, Number],
      default: "",
    }
  },
  emits: ["input"],
}
</script>

<style lang="scss">
@import "../styles/custom-input.scss";
</style>
